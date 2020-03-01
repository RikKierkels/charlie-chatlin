const { session } = require('../config');
const sessionExpiryJob = require('../jobs/session-expiry');

module.exports = () => {
  sessionExpiryJob({
    interval: 60 * 1000,
    maxDisconnectTime: session.maxDisconnectTime
  });
};
