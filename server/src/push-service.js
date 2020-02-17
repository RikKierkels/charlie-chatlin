'use strict';

module.exports = function(webPush) {
  webPush.setVapidDetails(
    'https://www.charlie-chatlin.com',
    process.env.VAPID_KEY_PUBLIC,
    process.env.VAPID_KEY_PRIVATE
  );
};
