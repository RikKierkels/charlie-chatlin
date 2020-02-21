'use strict';
const log = console.log;
const chalk = require('chalk');

const cors = require('cors');
const app = require('express')();
app.use(cors());

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const makeHandlers = require('./handlers');
const sessionService = require('./session-service');
const messageService = require('./message-service');
const pushService = require('./push-service')();

app.get('/vapid', (req, res) => {
  res.json({ key: process.env.VAPID_KEY_PUBLIC });
});

io.on('connection', client => {
  const {
    handleUserRegister,
    handleMessage,
    handlePushSubscription,
    handleGetRegisteredUsers,
    handleUnregister
  } = makeHandlers(client, sessionService, messageService, pushService);

  log(`client connected... ${chalk.red(client.id)}`);

  client.on('register', handleUserRegister);

  client.on('message', handleMessage);

  client.on('push-subscription', handlePushSubscription);

  client.on('registered-users', handleGetRegisteredUsers);

  client.on('un-register', () => {
    log(`client un-registered... ${chalk.red(client.id)}`);
    handleUnregister();
  });

  client.on('error', error => {
    log(`client threw error: ${chalk.red(client.id)}`);
    log(error);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, error => {
  if (error) throw error;
  log(chalk.blue(`listening on port: ${port}`));
});
