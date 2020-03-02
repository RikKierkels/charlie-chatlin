const { Container } = require('typedi');
const validator = require('../../utils/validator');

module.exports = function makeHandlePushSubscription({ sessionId }) {
  const PushService = Container.get('PushService');

  return function handlePushSubscription(subscription, callback) {
    const { error } = validator.subscriptionSchema.validate(subscription);

    if (error) {
      return callback(validator.toErrorMessage(error));
    }

    PushService.addSubscription(sessionId, subscription);
    callback(null);
  };
};
