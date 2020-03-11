const MESSAGE_TYPE = require('../../utils/message-type');

module.exports = function makeHandleUserRegister(
  { io, sessionManager, messageService, validator, templates },
  client
) {
  return function handleUserRegister(user) {
    const { error } = validator.validateUser(user);
    if (error) {
      return client.emit('register-failed', validator.toErrorMessage(error));
    }

    const existingUser = sessionManager.getUserBySessionId(client.sessionId);
    if (!existingUser && !sessionManager.isUsernameAvailable(user)) {
      return client.emit('register-failed', 'Username is not available.');
    }

    if (existingUser) {
      const message = messageService.createMessage(
        templates.toUserLeftMessage(user),
        MESSAGE_TYPE.USER_LEFT,
        user
      );

      messageService.addMessage(message);
      io.to('chat room').emit('message', message);
      io.emit('user-left', existingUser);
    }

    sessionManager.registerUser(client.sessionId, user);
    const message = messageService.createMessage(
      templates.toUserJoinedMessage(user),
      MESSAGE_TYPE.USER_JOINED,
      user
    );

    messageService.addMessage(message);
    io.to('chat room').emit('message', message);
    io.emit('user-joined', user);

    client.join('chat room');
    client.emit('register-success', {
      user,
      chatHistory: messageService.getChatHistory()
    });
  };
};
