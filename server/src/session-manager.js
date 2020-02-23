'use strict';
const { getCurrentDate } = require('./utils');
const sessions = new Map();

setInterval(() => {
  [...sessions.values()]
    .filter(s => !s.isActive && s.disconnectedAt)
    .filter(s => hasSessionExpired(s))
    .forEach(s => removeSession(s));
}, 60 * 1000);

function hasSessionExpired(session) {
  const disconnectedAt = new Date(session.disconnectedAt);
  const now = new Date();
  return now - disconnectedAt > process.env.REMOVE_SESSION_TIMER;
}

function addSession(sessionId) {
  const session = sessions.get(sessionId);
  sessions.set(sessionId, { ...session, isActive: true });
}

function removeSession(sessionId) {
  sessions.delete(sessionId);
}

function isUsernameAvailable(user) {
  return getUsers(s => s.user).every(u => u.username !== user.username);
}

function getActiveUsers() {
  return getUsers(s => s.user && s.isActive);
}

function getUsers(filterFn) {
  return [...sessions.values()].filter(filterFn).map(s => s.user);
}

function registerUser(user, sessionId) {
  const session = sessions.get(sessionId);
  sessions.set(sessionId, { ...session, user });
}

function getUserBySessionId(id) {
  const session = sessions.get(id);
  return (session || {}).user;
}

function markSessionAsInactive(sessionId) {
  const session = sessions.get(sessionId);

  sessions.set(sessionId, {
    ...session,
    isActive: false,
    disconnectedAt: getCurrentDate()
  });
}

function getSubscriptions() {
  return [...sessions.values()]
    .filter(s => s.subscription)
    .map(s => s.subscription);
}

function saveSubscription(sessionId, subscription) {
  const session = sessions.get(sessionId);
  sessions.set(sessionId, { ...session, subscription });
}

module.exports = {
  addSession,
  isUsernameAvailable,
  getActiveUsers,
  registerUser,
  getUserBySessionId,
  markSessionAsInactive,
  getSubscriptions,
  saveSubscription
};
