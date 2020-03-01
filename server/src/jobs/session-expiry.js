const { Container } = require('typedi');

module.exports = ({ interval, maxDisconnectTime }) => {
  const sessionManager = Container.get('sessionManager');
  const pushService = Container.get('pushService');
  const sessions = sessionManager.getSessions();

  setInterval(() => {
    Array.from(sessions)
      .filter(([_, session]) => !session.isActive && session.disconnectedAt)
      .filter(([_, session]) => hasSessionExpired(session.disconnectedAt))
      .forEach(([id, _]) => terminateSession(id));
  }, interval);

  function hasSessionExpired(disconnectedAt) {
    const timeSinceDisconnect = new Date() - new Date(disconnectedAt);
    return timeSinceDisconnect > maxDisconnectTime;
  }

  function terminateSession(id) {
    sessionManager.terminateSession(id);
    pushService.removeSubscription(id);
  }
};
