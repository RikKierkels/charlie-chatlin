const { Container } = require('typedi');
const makeHandleConnect = require('./connect');
const makeHandleReconnect = require('./reconnect');
const makeHandleUserRegister = require('./user-register');
const makeHandleMessage = require('./message');
const makeHandlePushSubscription = require('./push-subscription');
const makeHandleGetActiveUsers = require('./get-active-users.js');
const makeHandleDisconnect = require('./disconnect');

module.exports = function handlerFactory(io) {
  const opts = {
    io,
    templates: Container.get('MessageTemplates'),
    validator: Container.get('Validator'),
    sessionManager: Container.get('SessionManager'),
    pushService: Container.get('PushService'),
    messageService: Container.get('MessageService')
  };

  return function make(client) {
    const handleConnect = makeHandleConnect(opts, client);
    const handleReconnect = makeHandleReconnect(opts, client);
    const handleUserRegister = makeHandleUserRegister(opts, client);
    const handleMessage = makeHandleMessage(opts, client);
    const handlePushSubscription = makeHandlePushSubscription(opts, client);
    const handleGetActiveUsers = makeHandleGetActiveUsers(opts);
    const handleDisconnect = makeHandleDisconnect(opts, client);

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
