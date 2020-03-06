module.exports = function makeHandlePushSubscription(
  { validator, pushService },
  { sessionId }
) {
  return function handlePushSubscription(subscription, callback) {
    const { error } = validator.validateSubscription(subscription);
    if (error) {
      return callback(validator.toErrorMessage(error));
    }

    pushService.addSubscription(sessionId, subscription);
    callback(null);
  };
};
