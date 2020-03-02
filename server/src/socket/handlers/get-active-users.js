const { Container } = require('typedi');

module.exports = function makeHandleGetActiveUsers() {
  const SessionManager = Container.get('SessionManager');

  return function handleGetActiveUsers(_, callback) {
    callback(null, SessionManager.getActiveUsers());
  };
};
