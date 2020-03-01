'use strict';
const { Container } = require('typedi');
const validator = require('../validator');

function handlerFactory(io) {
  const messageService = Container.get('messageService');
  const sessionManager = Container.get('sessionManager');
  const pushService = Container.get('pushService');

  return function make(client) {
    const { sessionId } = client.status;
    const toPushMessage = message =>
      `${message.sender.username} - ${message.text}`;

    function handleConnect() {
      sessionManager.startSession(sessionId);
      client.emit('handshake', sessionId);
    }

    function handleReconnect() {
      sessionManager.startSession(sessionId);

      const user = sessionManager.getUserBySessionId(sessionId);
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
    }

    function handleUserRegister(user) {
      const { error } = validator.userSchema.validate(user);

      if (error) {
        return client.emit('register-failed', validator.toErrorMessage(error));
      }

      const existingUser = sessionManager.getUserBySessionId(sessionId);
      const isUsernameAvailable = sessionManager.isUsernameAvailable(user);

      if (existingUser) {
        io.emit('user-left', existingUser);
      } else if (!isUsernameAvailable) {
        return client.emit('register-failed', 'Username is not available.');
      }

      sessionManager.registerUser(sessionId, user);
      client.join('chat room');
      io.emit('user-joined', user);

      client.emit('register-success', {
        user,
        chatHistory: messageService.getChatHistory()
      });
    }

    async function handleMessage(messageText, callback) {
      const { error } = validator.messageSchema.validate(messageText);

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
      await pushService.sendNotifications(toPushMessage(message));

      callback(null);
    }

    function handlePushSubscription(subscription, callback) {
      const { error } = validator.subscriptionSchema.validate(subscription);

      if (error) {
        return callback(validator.toErrorMessage(error));
      }

      pushService.addSubscription(sessionId, subscription);
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
      handleConnect,
      handleReconnect,
      handleUserRegister,
      handleMessage,
      handlePushSubscription,
      handleGetActiveUsers,
      handleDisconnect
    };
  };
}

module.exports = handlerFactory;
