'use strict';
const { getCurrentDate } = require('./utils');
const sessions = new Map();

function register(sessionId, client) {
  const session = sessions.get(sessionId);
  sessions.set(sessionId, { ...session, client });
}

function unregister(sessionId) {
  sessions.delete(sessionId);
}

function isUserAvailable(user) {
  const users = getUsers();

  return (
    users.every(u => u.username !== user.username) &&
    users.every(u => u.avatarId !== user.avatarId)
  );
}

function getUsers() {
  return [...sessions.values()].filter(c => c.user).map(c => c.user);
}

function setUserForSession(user, sessionId) {
  const session = sessions.get(sessionId);
  sessions.set(sessionId, { ...session, user });
  return user;
}

function getUserBySessionId(id) {
  const session = sessions.get(id);
  return (session || {}).user;
}

function broadcastMessage(message) {
  [...sessions.values()]
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
  return [...sessions.values()].map(c => c.client);
}

module.exports = {
  register,
  unregister,
  isUserAvailable,
  getUsers,
  setUserForSession,
  getUserBySessionId,
  broadcastMessage,
  broadcastUserJoined,
  broadcastUserLeft
};
