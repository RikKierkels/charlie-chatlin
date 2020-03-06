const { session } = require('../config');
const sessionExpiryJob = require('../jobs/session-expiry');

module.exports = function loadJobs() {
  sessionExpiryJob({
    checkIntervalMs: 60 * 1000,
    maxDisconnectTimeMs: session.maxDisconnectTime
  }).start();
};
