const MESSAGE_TYPE = require('../../utils/message-type');

module.exports = function makeHandleReconnect(
  { io, sessionManager, messageService, templates },
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

    const message = messageService.createMessage(
      templates.toUserJoinedMessage(user),
      MESSAGE_TYPE.USER_JOINED,
      user
    );

    let userMessages = messageService
      .getChatHistory()
      .filter(
        m =>
          m.sender.username === user.username &&
          m.type !== MESSAGE_TYPE.USER_LEFT
      );

    if (
      userMessages.length > 0 &&
      userMessages[userMessages.length - 1].text !== message.text
    ) {
      messageService.addMessage(message);
      io.to('chat room').emit('message', message);
    }

    io.emit('user-joined', user);

    client.join('chat room');
    client.emit('register-success', {
      user,
      chatHistory: messageService.getChatHistory()
    });
  };
};
