const log = console.log;
const chalk = require('chalk');
const { vapid } = require('../config');
const webPush = require('web-push');

module.exports = function(options = { TTL: 5 }) {
  const subscriptions = new Map();

  if (!vapid.url) {
    throw new Error('Vapid url is not set.');
  }
  if (!vapid.keys.public) {
    throw new Error('Vapid public key is not set.');
  }
  if (!vapid.keys.private) {
    throw new Error('Vapid private key is not set.');
  }

  webPush.setVapidDetails(vapid.url, vapid.keys.public, vapid.keys.private);

  function addSubscription(sessionId, subscription) {
    subscriptions.set(sessionId, subscription);
  }

  function removeSubscription(sessionId) {
    subscriptions.delete(sessionId);
  }

  async function sendNotifications(payload) {
    const notifications = Array.from(subscriptions).map(
      ([sessionId, subscription]) => {
        return webPush
          .sendNotification(subscription, payload, options)
          .catch(error => {
            // prettier-ignore
            log(`error sending notification to session: ${chalk.red(sessionId)}.`);
            log(error);
          });
      }
    );

    return Promise.all(notifications);
  }

  return {
    addSubscription,
    removeSubscription,
    sendNotifications
  };
};
