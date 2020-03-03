module.exports = function makeHandleUserRegister(
  { io, sessionManager, messageService, validator },
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
      io.emit('user-left', existingUser);
    }

    sessionManager.registerUser(client.sessionId, user);
    io.emit('user-joined', user);
    client.join('chat room');
    client.emit('register-success', {
      user,
      chatHistory: messageService.getChatHistory()
    });
  };
};
