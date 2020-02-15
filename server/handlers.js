'use strict';
import ClientService from './client-service';
import MessageService from './message-service';

export function makeHandlers(client) {
  function handleRegister(user, callback) {
    try {
      callback(null, ClientService.register(user, client));
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

  function handleDisconnect() {
    ClientService.unregister(client.id);
  }

  return {
    handleRegister,
    handleMessage,
    handleDisconnect
  };
}
