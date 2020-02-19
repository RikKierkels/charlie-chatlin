'use strict';
const log = console.log;
const chalk = require('chalk');
const webPush = require('web-push');

module.exports = function({ timeToLive } = { timeToLive: 5 }) {
  const subscriptions = new Map();
  const options = {
    TTL: timeToLive
  };

  webPush.setVapidDetails(
    process.env.URL,
    process.env.VAPID_KEY_PUBLIC,
    process.env.VAPID_KEY_PRIVATE
  );

  function saveSubscription(clientId, subscription) {
    subscriptions.set(clientId, subscription);
  }

  function removeSubscription(clientId) {
    subscriptions.delete(clientId);
  }

  async function sendNotifications(payload, ownClientId) {
    const notifications = Array.from(subscriptions)
      .filter(([clientId]) => clientId !== ownClientId)
      .map(([clientId, subscription]) => {
        return webPush
          .sendNotification(subscription, payload, options)
          .catch(error => {
            // prettier-ignore
            log(`error sending notification to client with id: ${chalk.red(clientId)}`);
            log(error);
          });
      });

    return Promise.all(notifications);
  }

  return {
    saveSubscription,
    removeSubscription,
    sendNotifications
  };
};
