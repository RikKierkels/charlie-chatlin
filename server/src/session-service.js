'use strict';
const { generateId, getCurrentDate } = require('./utils');
const sessions = new Map();

function register(client) {
  let { sessionId } = client.handshake.query;

  if (!sessionId) {
    sessionId = generateId();
    client.emit('handshake', sessionId);
  }

  const session = sessions.get(sessionId);
  sessions.set(sessionId, { ...session, client });

  return sessionId;
}

function unregister(sessionId) {
  sessions.delete(sessionId);
}

function isUsernameAvailable(user) {
  return getUsers(s => s.user).every(u => u.username !== user.username);
}

function getConnectedUsers() {
  return getUsers(s => s.user && s.client.connected);
}

function getUsers(filterFn) {
  return [...sessions.values()].filter(filterFn).map(s => s.user);
}

function setUserForSession(user, sessionId) {
  const session = sessions.get(sessionId);
  sessions.set(sessionId, { ...session, user });
}

function getUserBySessionId(id) {
  const session = sessions.get(id);
  return (session || {}).user;
}

function broadcastMessage(message) {
  getClients(s => s.client && s.user).forEach(client => {
    client.emit('message', message);
  });
}

function broadcastUserJoined(user) {
  getClients(s => s.client).forEach(client => {
    client.emit('user-joined', { ...user, leftOn: getCurrentDate() });
  });
}

function broadcastUserLeft(user) {
  getClients(s => s.client).forEach(client => {
    client.emit('user-left', { ...user, leftOn: getCurrentDate() });
  });
}

function getClients(filterFn) {
  return [...sessions.values()].filter(filterFn).map(s => s.client);
}

function setDisconnectedTime(sessionId) {
  const session = sessions.get(sessionId);
  sessions.set(sessionId, { ...session, disconnectedAt: getCurrentDate() });
}

module.exports = {
  register,
  unregister,
  isUsernameAvailable,
  getConnectedUsers,
  setUserForSession,
  getUserBySessionId,
  broadcastMessage,
  broadcastUserJoined,
  broadcastUserLeft,
  setDisconnectedTime
};
