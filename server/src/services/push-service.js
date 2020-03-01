'use strict';
const log = console.log;
const chalk = require('chalk');
const webPush = require('web-push');

module.exports = function(options = { TTL: 5 }) {
  const subscriptions = new Map();

  webPush.setVapidDetails(
    process.env.URL,
    process.env.VAPID_KEY_PUBLIC,
    process.env.VAPID_KEY_PRIVATE
  );

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
