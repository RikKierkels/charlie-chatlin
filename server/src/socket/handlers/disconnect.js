const { Container } = require('typedi');

module.exports = function makeHandleDisconnect(io, { sessionId }) {
  const SessionManager = Container.get('SessionManager');

  return function handleDisconnect() {
    const user = SessionManager.getUserBySessionId(sessionId);

    if (user) {
      io.emit('user-left', user);
    }

    SessionManager.markSessionAsInactive(sessionId);
  };
};
