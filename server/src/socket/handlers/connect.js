module.exports = function makeHandleConnect({ sessionManager }, client) {
  return function handleConnect() {
    sessionManager.startSession(client.sessionId);
    client.emit('handshake', client.sessionId);
  };
};
