'use strict';

let users = [];

function register(user, clientId) {
  if (users.some(u => u.username === user.username)) {
    throw new Error('Username is already taken.');
  }

  if (users.some(u => u.avatarId === user.avatarId)) {
    throw new Error('Avatar is already taken.');
  }

  user = { ...user, clientId };
  users.push(user);
  return user;
}

function unregister(clientId) {
  users = users.filter(user => user.clientId === clientId);
}

export default {
  register,
  unregister
};
