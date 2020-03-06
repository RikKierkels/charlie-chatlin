module.exports = function makeHandleGetActiveUsers({ sessionManager }) {
  return function handleGetActiveUsers(_, callback) {
    callback(null, sessionManager.getActiveUsers());
  };
};
