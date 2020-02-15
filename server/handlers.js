'use strict';
import UserService from './user-service';

export function makeHandlers(client) {
  function handleRegister(user, callback) {
    try {
      callback(null, UserService.register(user, client.id));
    } catch (e) {
      callback(e.message);
    }
  }

  function handleMessage(message, callback) {
    console.log(message);
  }

  function handleDisconnect() {
    UserService.unregister(client.id);
  }

  return {
    handleRegister,
    handleMessage,
    handleDisconnect
  };
}
