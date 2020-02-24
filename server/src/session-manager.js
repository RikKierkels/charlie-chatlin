'use strict';
const { getCurrentDate } = require('./utils');
const SESSION_EXPIRED_CHECK_INTERVAL = 60 * 1000;
const sessions = new Map();

function addSession(sessionId) {
  const session = sessions.get(sessionId);
  sessions.set(sessionId, { ...session, isActive: true });
}

function removeSession(sessionId) {
  sessions.delete(sessionId);
}

function getUserBySessionId(id) {
  const session = sessions.get(id);
  return (session || {}).user;
}

function getActiveUsers() {
  return [...sessions.values()]
    .filter(s => s.user && s.isActive)
    .map(s => s.user);
}

function registerUser(user, sessionId) {
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
  }, SESSION_EXPIRED_CHECK_INTERVAL);
}

function hasSessionExpired(disconnectedAt) {
  const timeSinceDisconnect = new Date() - new Date(disconnectedAt);
  const maxDisconnectTime = Number.parseInt(process.env.MAX_DISCONNECT_TIME);

  return timeSinceDisconnect > maxDisconnectTime;
}

module.exports = {
  addSession,
  removeSession,
  getUserBySessionId,
  getActiveUsers,
  registerUser,
  isUsernameAvailable,
  markSessionAsInactive,
  onSessionExpired
};
