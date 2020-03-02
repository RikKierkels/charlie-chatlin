const { Container } = require('typedi');
const validator = require('../../utils/validator');

module.exports = function makeHandleUserRegister(io, client) {
  const SessionManager = Container.get('SessionManager');
  const MessageService = Container.get('MessageService');

  return function handleUserRegister(user) {
    const { error } = validator.userSchema.validate(user);

    if (error) {
      return client.emit('register-failed', validator.toErrorMessage(error));
    }

    const existingUser = SessionManager.getUserBySessionId(client.sessionId);
    const isUsernameAvailable = SessionManager.isUsernameAvailable(user);

    if (existingUser) {
      io.emit('user-left', existingUser);
    } else if (!isUsernameAvailable) {
      return client.emit('register-failed', 'Username is not available.');
    }

    SessionManager.registerUser(client.sessionId, user);
    client.join('chat room');
    io.emit('user-joined', user);

    client.emit('register-success', {
      user,
      chatHistory: MessageService.getChatHistory()
    });
  };
};
