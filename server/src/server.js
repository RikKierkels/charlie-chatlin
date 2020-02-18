'use strict';

const log = console.log;
const chalk = require('chalk');

const cors = require('cors');
const app = require('express')();
app.use(cors());

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const makeHandlers = require('./handlers');
const clientService = require('./client-service');
const messageService = require('./message-service');
const pushService = require('./push-service')();

app.get('/vapid', (req, res) => {
  res.json({ key: process.env.VAPID_KEY_PUBLIC });
});

io.on('connection', client => {
  const {
    handleConnect,
    handleUserRegister,
    handleMessage,
    handlePushSubscription,
    handleGetRegisteredUsers,
    handleDisconnect
  } = makeHandlers(client, clientService, messageService, pushService);

  handleConnect();
  log(`client connected... ${chalk.red(client.id)}`);

  client.on('register', handleUserRegister);

  client.on('message', handleMessage);

  client.on('push-subscription', handlePushSubscription);

  client.on('registered-users', handleGetRegisteredUsers);

  client.on('disconnect', () => {
    handleDisconnect();
    log(`client disconnected... ${chalk.red(client.id)}`);
  });

  client.on('error', error => {
    log(`client threw error: ${chalk.red(client.id)}`);
    log(error);
  });
});

server.listen(process.env.PORT, error => {
  if (error) throw error;
  log(chalk.blue(`listening on port: ${process.env.PORT}`));
});
