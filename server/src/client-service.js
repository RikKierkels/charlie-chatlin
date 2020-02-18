'use strict';

const { getCurrentDate } = require('./utils');
const clients = new Map();

function register(client) {
  clients.set(client.id, { client });
}

function unregister(clientId) {
  clients.delete(clientId);
}

function isUserAvailable(user) {
  const users = getUsers();

  return (
    users.every(u => u.username !== user.username) &&
    users.every(u => u.avatarId !== user.avatarId)
  );
}

function getUsers() {
  return [...clients.values()].filter(c => c.user).map(c => c.user);
}

function setUserForClient(user, clientId) {
  const client = clients.get(clientId);
  clients.set(clientId, { ...client, user });
  return user;
}

function getUserByClientId(id) {
  const client = clients.get(id);
  return (client || {}).user;
}

function broadcastMessage(message) {
  [...clients.values()]
    .filter(c => c.user)
    .map(c => c.client)
    .forEach(client => client.emit('message', message));
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
  isUserAvailable,
  getUsers,
  setUserForClient,
  getUserByClientId,
  broadcastMessage,
  broadcastUserJoined,
  broadcastUserLeft
};
