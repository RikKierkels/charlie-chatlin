const MESSAGE_TYPE = require('../../utils/message-type');

module.exports = function makeHandleMessage(
  { io, sessionManager, pushService, messageService, validator, templates },
  { sessionId }
) {
  return async function handleMessage(messageText, callback) {
    const { error } = validator.validateMessage(messageText);
    if (error) {
      return callback(validator.toErrorMessage(error));
    }

    const user = sessionManager.getUserBySessionId(sessionId);
    if (!user) {
      return callback('No user registered for this session.');
    }

    const message = messageService.createMessage(
      messageText,
      MESSAGE_TYPE.TEXT,
      user
    );

    messageService.addMessage(message);
    io.to('chat room').emit('message', message);

    await pushService.sendNotifications(templates.toPushMessage(message));
    callback(null);
  };
};
