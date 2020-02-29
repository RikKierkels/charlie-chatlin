'use strict';
const { getCurrentDate } = require('./utils');
const CHECK_SESSION_EXPIRED_INTERVAL = 60 * 1000;
const sessions = new Map();

function hasSession(sessionId) {
  return sessions.has(sessionId);
}

function startSession(sessionId) {
  const session = sessions.get(sessionId);
  sessions.set(sessionId, { ...session, isActive: true });
}

function terminateSession(sessionId) {
  sessions.delete(sessionId);
}

function getUserBySessionId(id) {
  return (sessions.get(id) || {}).user;
}

function getActiveUsers() {
  return [...sessions.values()]
    .filter(s => s.user && s.isActive)
    .map(s => s.user);
}

function registerUser(sessionId, user) {
  const session = sessions.get(sessionId);
  sessions.set(sessionId, { ...session, user });
}

function isUsernameAvailable(user) {
  return [...sessions.values()]
    .filter(s => s.user)
    .map(s => s.user)
    .every(u => u.username !== user.username);
}

function markSessionAsInactive(sessionId) {
  const session = sessions.get(sessionId);

  sessions.set(sessionId, {
    ...session,
    isActive: false,
    disconnectedAt: getCurrentDate()
  });
}

function onSessionExpired(callback) {
  setInterval(() => {
    Array.from(sessions)
      .filter(([_, session]) => !session.isActive && session.disconnectedAt)
      .filter(([_, session]) => hasSessionExpired(session.disconnectedAt))
      .forEach(([id, _]) => callback(id));
  }, CHECK_SESSION_EXPIRED_INTERVAL);
}

function hasSessionExpired(disconnectedAt) {
  const timeSinceDisconnect = new Date() - new Date(disconnectedAt);
  const maxDisconnectTime = Number.parseInt(process.env.MAX_DISCONNECT_TIME);

  return timeSinceDisconnect > maxDisconnectTime;
}

module.exports = {
  hasSession,
  startSession,
  terminateSession,
  getUserBySessionId,
  getActiveUsers,
  registerUser,
  isUsernameAvailable,
  markSessionAsInactive,
  onSessionExpired
};
