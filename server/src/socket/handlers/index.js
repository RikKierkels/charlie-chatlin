const makeHandleConnect = require('./connect');
const makeHandleReconnect = require('./reconnect');
const makeHandleUserRegister = require('./user-register');
const makeHandleMessage = require('./message');
const makeHandlePushSubscription = require('./push-subscription');
const makeHandleGetActiveUsers = require('./get-active-users.js');
const makeHandleDisconnect = require('./disconnect');

module.exports = function handlerFactory(io) {
  return function make(client) {
    const handleConnect = makeHandleConnect(client);
    const handleReconnect = makeHandleReconnect(io, client);
    const handleUserRegister = makeHandleUserRegister(io, client);
    const handleMessage = makeHandleMessage(io, client);
    const handlePushSubscription = makeHandlePushSubscription(client);
    const handleGetActiveUsers = makeHandleGetActiveUsers();
    const handleDisconnect = makeHandleDisconnect(io, client);

    return {
      handleConnect,
      handleReconnect,
      handleUserRegister,
      handleMessage,
      handlePushSubscription,
      handleGetActiveUsers,
      handleDisconnect
    };
  };
};
