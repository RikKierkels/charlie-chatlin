'use strict';

const clients = new Map();

function register(user, client) {
  const users = [...clients.values()].map(c => c.user);

  if (users.some(u => u.username === user.username)) {
    throw new Error('Username is already taken.');
  }

  if (users.some(u => u.avatarId === user.avatarId)) {
    throw new Error('Avatar is already taken.');
  }

  clients.set(client.id, { client, user });
  return user;
}

function unregister(clientId) {
  clients.delete(clientId);
}

function getUserByClientId(id) {
  if (!clients.has(id)) throw new Error('Client does not exist.');

  return clients.get(id).user;
}

function broadcastMessage(message) {
  [...clients.values()]
    .map(c => c.client)
    .forEach(client => client.emit('message', message));
}

export default {
  register,
  unregister,
  getUserByClientId,
  broadcastMessage
};
