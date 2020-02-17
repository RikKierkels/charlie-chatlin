'use strict';
const log = console.log;
const chalk = require('chalk');
const webPush = require('web-push');

module.exports = function(notificationTimeToLive = 5) {
  const options = {
    TTL: notificationTimeToLive
  };

  webPush.setVapidDetails(
    'https://www.charlie-chatlin.com',
    process.env.VAPID_KEY_PUBLIC,
    process.env.VAPID_KEY_PRIVATE
  );

  async function sendNotifications(payload, subscriptions) {
    const notifications = subscriptions.map(subscription =>
      webPush.sendNotification(subscription, payload, options).catch(error => {
        log(
          chalk.red(`error sending notification to: ${subscription.endpoint}`)
        );
      })
    );

    return Promise.all(notifications);
  }

  return {
    sendNotifications
  };
};
