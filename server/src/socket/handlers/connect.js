const { Container } = require('typedi');

module.exports = function makeHandleConnect(client) {
  const SessionManager = Container.get('sessionManager');

  return function handleConnect() {
    SessionManager.startSession(client.status.sessionId);
    client.emit('handshake', client.status.sessionId);
  };
};
