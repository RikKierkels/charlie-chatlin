const { Container } = require('typedi');
const validator = require('../../utils/validator');

module.exports = function makeHandleMessage(io, { sessionId }) {
  const SessionManager = Container.get('SessionManager');
  const PushService = Container.get('PushService');
  const MessageService = Container.get('MessageService');

  return async function handleMessage(messageText, callback) {
    const { error } = validator.messageSchema.validate(messageText);

    if (error) {
      return callback(validator.toErrorMessage(error));
    }

    const user = SessionManager.getUserBySessionId(sessionId);
    if (!user) {
      return callback('No user registered for this session.');
    }

    const message = MessageService.createMessage(messageText, user);
    MessageService.addMessage(message);
    io.to('chat room').emit('message', message);

    const pushMessageTemplate = `${message.sender.username} - ${message.text}`;
    await PushService.sendNotifications(pushMessageTemplate);

    callback(null);
  };
};
