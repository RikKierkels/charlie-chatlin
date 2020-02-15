import UserService from './user-service';

export function handleRegister(user, clientId, callback) {
  try {
    callback(null, UserService.register(user, clientId));
  } catch (e) {
    callback(e.message);
  }
}

export function handleDisconnect(clientId) {
  UserService.unregister(clientId);
}
