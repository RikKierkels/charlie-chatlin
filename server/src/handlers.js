'use strict';
const validator = require('./validator');

function handlerFactory(io, sessionManager, messageService, pushService) {
  return function make(client) {
    const { sessionId } = client;
    const toPushMessage = message =>
      `${message.sender.username} - ${message.text}`;

    function handleUserRegister(user, callback) {
      const { error } = validator.userSchema.validate(user);

      if (error) {
        return callback(validator.toErrorMessage(error));
      }

      if (!sessionManager.isUsernameAvailable(user)) {
        return callback('Username is not available.');
      }

      const existingUser = sessionManager.getUserBySessionId(sessionId);
      if (existingUser) {
        io.emit('user-left', existingUser);
      }

      sessionManager.registerUser(user, sessionId);
      client.join('chat room');
      io.emit('user-joined', user);

      callback(null, { user, chatHistory: messageService.getChatHistory() });
    }

    async function handleMessage(message, callback) {
      const { error } = validator.messageSchema.validate(message);

      if (error) {
        return callback(validator.toErrorMessage(error));
      }

      const user = sessionManager.getUserBySessionId(sessionId);
      if (!user) {
        return callback('No user registered for this session.');
      }

      message = messageService.saveMessage(message, user);
      io.to('chat room').emit('message', message);
      await pushService.sendNotifications(toPushMessage(message));

      callback(null);
    }

    function handlePushSubscription(subscription, callback) {
      const { error } = validator.subscriptionSchema.validate(subscription);

      if (error) {
        return callback(validator.toErrorMessage(error));
      }

      pushService.saveSubscription(sessionId, subscription);
      callback(null);
    }

    function handleGetActiveUsers(_, callback) {
      callback(null, sessionManager.getActiveUsers());
    }

    function handleDisconnect() {
      const user = sessionManager.getUserBySessionId(sessionId);

      if (user) {
        io.emit('user-left', user);
      }

      sessionManager.markSessionAsInactive(sessionId);
    }

    return {
      handleUserRegister,
      handleMessage,
      handlePushSubscription,
      handleGetActiveUsers,
      handleDisconnect
    };
  };
}

module.exports = handlerFactory;
