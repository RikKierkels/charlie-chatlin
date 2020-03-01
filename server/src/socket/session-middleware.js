const { Container } = require('typedi');
const { generateId } = require('../utils');

module.exports = (client, next) => {
  const sessionManager = Container.get('sessionManager');
  const { sessionId } = client.handshake.query;

  if (sessionManager.hasSession(sessionId)) {
    client['status'] = { sessionId, isReconnected: true };
  } else {
    client['status'] = { sessionId: generateId(), isReconnected: false };
  }

  next();
};
