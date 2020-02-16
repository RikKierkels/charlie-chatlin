'use strict';
import ClientService from '../services/client-service';
import MessageService from '../services/message-service';

export function makeHandlers(client) {
  function handleRegister(user, callback) {
    try {
      const response = {
        user: ClientService.register(user, client),
        chatHistory: MessageService.getChatHistory()
      };
      ClientService.broadcastUser(client.id, response.user);
      callback(null, response);
    } catch (e) {
      callback(e.message);
    }
  }

  function handleMessage(message, callback) {
    try {
      const user = ClientService.getUserByClientId(client.id);
      message = MessageService.saveMessage(message, user);
      ClientService.broadcastMessage(message);
      callback(null);
    } catch (e) {
      callback(e.message);
    }
  }

  function handlePushSubscription(subscription, callback) {
    try {
      ClientService.saveSubscription(client.id, subscription);
      callback(null);
    } catch (e) {
      callback(e);
    }
  }

  function handleDisconnect() {
    ClientService.unregister(client.id);
  }

  return {
    handleRegister,
    handleMessage,
    handlePushSubscription,
    handleDisconnect
  };
}
