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
      clientService.broadcastUserJoined(response.user);
      callback(null, response);
    } catch (e) {
      callback(e.message);
    }
  }

  async function handleMessage(message, callback) {
    try {
      const user = clientService.getUserByClientId(client.id);
      message = messageService.saveMessage(message, user);

      clientService.broadcastMessage(message);
      await pushService.sendNotifications(
        `${message.sender.username} - ${message.text}`
      );

      callback(null);
    } catch (e) {
      callback(e.message);
    }
  }

  function handlePushSubscription(subscription) {
    pushService.saveSubscription(client.id, subscription);
  }

  function handleGetRegisteredUsers(_, callback) {
    callback(null, clientService.getUsers());
  }

  function handleDisconnect() {
    clientService.unregister(client.id);
    pushService.removeSubscription(client.id);
  }

  return {
    handleRegister,
    handleMessage,
    handlePushSubscription,
    handleGetRegisteredUsers,
    handleDisconnect
  };
};
