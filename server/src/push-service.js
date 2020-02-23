'use strict';
const log = console.log;
const webPush = require('web-push');

module.exports = function({ timeToLive } = { timeToLive: 5 }) {
  const options = {
    TTL: timeToLive
  };

  webPush.setVapidDetails(
    process.env.URL,
    process.env.VAPID_KEY_PUBLIC,
    process.env.VAPID_KEY_PRIVATE
  );

  async function sendNotifications(subscriptions, payload) {
    const notifications = subscriptions.map(subscription => {
      return webPush
        .sendNotification(subscription, payload, options)
        .catch(error => {
          // prettier-ignore
          log(`error sending notification...`);
          log(error);
        });
    });

    return Promise.all(notifications);
  }

  return {
    sendNotifications
  };
};
