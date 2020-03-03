const { Container } = require('typedi');

module.exports = function checkSessionExpiry({
  checkIntervalMs,
  maxDisconnectTimeMs
}) {
  const SessionManager = Container.get('SessionManager');
  const PushService = Container.get('PushService');
  let interval;

  function start() {
    const sessions = SessionManager.getSessions();

    interval = setInterval(() => {
      Array.from(sessions)
        .filter(([_, session]) => !session.isActive && session.disconnectedAt)
        .filter(([_, session]) => hasSessionExpired(session.disconnectedAt))
        .forEach(([id, _]) => terminateSession(id));
    }, checkIntervalMs);
  }

  function hasSessionExpired(disconnectedAt) {
    const timeSinceDisconnect = new Date() - new Date(disconnectedAt);
    return timeSinceDisconnect > maxDisconnectTimeMs;
  }

  function terminateSession(id) {
    SessionManager.terminateSession(id);
    PushService.removeSubscription(id);
  }

  function stop() {
    clearInterval(interval);
  }

  return {
    start,
    stop
  };
};
