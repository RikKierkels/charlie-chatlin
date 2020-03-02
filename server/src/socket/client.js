const log = console.log;
const chalk = require('chalk');

module.exports = function handleClient(client, handlers) {
  const {
    handleConnect,
    handleReconnect,
    handleUserRegister,
    handleMessage,
    handlePushSubscription,
    handleGetActiveUsers,
    handleDisconnect
  } = handlers;

  log(`client connected... ${chalk.red(client.id)}`);
  client.isReconnected ? handleReconnect() : handleConnect();

  client.on('register', handleUserRegister);

  client.on('message', handleMessage);

  client.on('push-subscription', handlePushSubscription);

  client.on('active-users', handleGetActiveUsers);

  client.on('disconnect', () => {
    log(`client disconnected... ${chalk.red(client.id)}`);
    handleDisconnect();
  });

  client.on('error', error => {
    log(`client threw error: ${chalk.red(client.id)}`);
    log(error);
  });
};
