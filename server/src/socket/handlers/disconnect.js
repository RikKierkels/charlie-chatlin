const MESSAGE_TYPE = require('../../utils/message-type');

module.exports = function makeHandleDisconnect(
  { io, sessionManager, messageService, templates },
  { sessionId }
) {
  return function handleDisconnect() {
    sessionManager.markSessionAsInactive(sessionId);

    const user = sessionManager.getUserBySessionId(sessionId);
    if (!user) return;

    const message = messageService.createMessage(
      templates.toUserLeftMessage(user),
      MESSAGE_TYPE.USER_LEFT,
      user
    );
    messageService.addMessage(message);
    io.to('chat room').emit('message', message);
    io.emit('user-left', user);
  };
};
