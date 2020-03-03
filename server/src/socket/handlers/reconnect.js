module.exports = function makeHandleReconnect(
  { io, sessionManager, messageService },
  client
) {
  return function handleReconnect() {
    sessionManager.startSession(client.sessionId);

    const user = sessionManager.getUserBySessionId(client.sessionId);
    if (!user) {
      return client.emit(
        'register-failed',
        'There is no user for this session.'
      );
    }

    io.emit('user-joined', user);
    client.join('chat room');
    client.emit('register-success', {
      user,
      chatHistory: messageService.getChatHistory()
    });
  };
};
