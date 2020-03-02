const { Container } = require('typedi');
const { generateId } = require('../utils');

module.exports = function setSessionId(client, next) {
  const SessionManager = Container.get('SessionManager');
  const { sessionId } = client.handshake.query;

  const isReconnected = SessionManager.hasSession(sessionId);
  if (isReconnected) {
    client['sessionId'] = sessionId;
  } else {
    client['sessionId'] = generateId();
  }

  client['isReconnected'] = isReconnected;
  next();
};
