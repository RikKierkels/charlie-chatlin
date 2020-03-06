module.exports = function makeHandleMessage(
  { io, sessionManager, pushService, messageService, validator },
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

    const message = messageService.createMessage(messageText, user);
    messageService.addMessage(message);
    io.to('chat room').emit('message', message);

    const pushMessageTemplate = `${message.sender.username} - ${message.text}`;
    await pushService.sendNotifications(pushMessageTemplate);
    callback(null);
  };
};
