const users = new Map();

function register (user, clientId, callback) {
  if (userIsTaken(user)) callback('user is already taken');

  users.set(clientId, user);
  callback(null, { ...user, clientId });
}

function userIsTaken (user) {
  return true;
}

export default {
  register
};
