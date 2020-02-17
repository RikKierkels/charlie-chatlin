'use strict';
module.exports = function makeHandlers(
  client,
  clientService,
  messageService,
  pushService
) {
  function handleRegister(user, callback) {
    try {
      const response = {
        user: clientService.register(user, client),
        chatHistory: messageService.getChatHistory()
      };
      clientService.broadcastUser(client.id, response.user);
      callback(null, response);
    } catch (e) {
      callback(e.message);
    }
  }

  function handleMessage(message, callback) {
    try {
      const user = clientService.getUserByClientId(client.id);
      message = messageService.saveMessage(message, user);
      clientService.broadcastMessage(message);
      callback(null);
    } catch (e) {
      callback(e.message);
    }
  }

  function handlePushSubscription(subscription, callback) {
    try {
      clientService.saveSubscription(client.id, subscription);
      callback(null);
    } catch (e) {
      callback(e);
    }
  }

  function handleDisconnect() {
    clientService.unregister(client.id);
  }

  return {
    handleRegister,
    handleMessage,
    handlePushSubscription,
    handleDisconnect
  };
};
