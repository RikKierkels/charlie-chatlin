'use strict';

const { getCurrentDate } = require('./utils');
const clients = new Map();

function register(user, client) {
  const users = getUsers();

  if (users.some(u => u.username === user.username)) {
    throw new Error('Username is already taken.');
  }

  if (users.some(u => u.avatarId === user.avatarId)) {
    throw new Error('Avatar is already taken.');
  }

  clients.set(client.id, { client, user });
  return user;
}

function getUsers() {
  return [...clients.values()].map(c => c.user);
}

function unregister(clientId) {
  clients.delete(clientId);
}

function getUserByClientId(id) {
  const client = clients.get(id);

  if (!client) throw new Error('Client does not exist.');

  return client.user;
}

function broadcastMessage(message) {
  getClients().forEach(client => client.emit('message', message));
}

function broadcastUserJoined(user) {
  getClients().forEach(client => {
    client.emit('user-joined', { ...user, joinedOn: getCurrentDate() });
  });
}

function broadcastUserLeft(user) {
  getClients().forEach(client => {
    client.emit('user-left', { ...user, leftOn: getCurrentDate() });
  });
}

function getClients() {
  return [...clients.values()].map(c => c.client);
}

module.exports = {
  register,
  unregister,
  getUsers,
  getUserByClientId,
  broadcastMessage,
  broadcastUserJoined,
  broadcastUserLeft
};
