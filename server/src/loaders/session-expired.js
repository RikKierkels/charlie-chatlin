const { Container } = require('typedi');

module.exports = () => {
  const sessionManager = Container.get('sessionManager');
  const pushService = Container.get('pushService');

  sessionManager.onSessionExpired(sessionId => {
    sessionManager.terminateSession(sessionId);
    pushService.removeSubscription(sessionId);
  });
};
