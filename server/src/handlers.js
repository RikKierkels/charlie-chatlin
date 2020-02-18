'use strict';

module.exports = function makeHandlers(
  client,
  clientService,
  messageService,
  pushService
) {
  function handleConnect() {
    clientService.register(client);
  }

  function handleUserRegister(user, callback) {
    if (!clientService.isUserAvailable(user)) {
      callback('User is not available.');
    }

    const response = {
      user: clientService.setUserForClient(user, client.id),
      chatHistory: messageService.getChatHistory()
    };

    clientService.broadcastUserJoined(response.user);
    callback(null, response);
  }

  async function handleMessage(message, callback) {
    const user = clientService.getUserByClientId(client.id);

    if (!user) callback('No user registered for this client.');

    message = messageService.saveMessage(message, user);
    clientService.broadcastMessage(message);
    await pushService.sendNotifications(
      `${message.sender.username} - ${message.text}`
    );

    callback(null);
  }

  function handlePushSubscription(subscription) {
    pushService.saveSubscription(client.id, subscription);
  }

  function handleGetRegisteredUsers(_, callback) {
    callback(null, clientService.getUsers());
  }

  function handleDisconnect() {
    const user = clientService.getUserByClientId(client.id);

    if (user) {
      clientService.broadcastUserLeft(user);
    }

    clientService.unregister(client.id);
    pushService.removeSubscription(client.id);
  }

  return {
    handleConnect,
    handleUserRegister,
    handleMessage,
    handlePushSubscription,
    handleGetRegisteredUsers,
    handleDisconnect
  };
};
