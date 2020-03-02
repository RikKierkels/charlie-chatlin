const { Container } = require('typedi');

module.exports = function makeHandleReconnect(io, client) {
  const SessionManager = Container.get('SessionManager');
  const MessageService = Container.get('MessageService');

  return function handleReconnect() {
    SessionManager.startSession(client.sessionId);

    const user = SessionManager.getUserBySessionId(client.sessionId);
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
      chatHistory: MessageService.getChatHistory()
    });
  };
};
