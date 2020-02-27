'use strict';
const { generateId } = require('./utils');
const log = console.log;
const chalk = require('chalk');

const cors = require('cors');
const app = require('express')();
app.use(cors());
const server = require('http').createServer(app);

const io = require('socket.io')(server);
const sessionManager = require('./session-manager');
const messageService = require('./message-service');
const pushService = require('./push-service')();
const makeHandlers = require('./handlers')(
  io,
  sessionManager,
  messageService,
  pushService
);

sessionManager.onSessionExpired(sessionId => {
  sessionManager.terminateSession(sessionId);
  pushService.removeSubscription(sessionId);
});

app.get('/vapid', (req, res) => {
  res.json({ key: process.env.VAPID_KEY_PUBLIC });
});

io.use((client, next) => {
  const { sessionId } = client.handshake.query;

  if (sessionManager.hasSession(sessionId)) {
    client['status'] = { sessionId, isReconnected: true };
  } else {
    client['status'] = { sessionId: generateId(), isReconnected: false };
  }

  next();
});

io.on('connection', client => {
  const {
    handleConnect,
    handleReconnect,
    handleUserRegister,
    handleMessage,
    handlePushSubscription,
    handleGetActiveUsers,
    handleDisconnect
  } = makeHandlers(client);

  log(`client connected... ${chalk.red(client.id)}`);
  client.status.isReconnected ? handleReconnect() : handleConnect();

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
});

const port = Number.parseInt(process.env.PORT) || 3000;
server.listen(port, error => {
  if (error) throw error;
  log(chalk.blue(`listening on port: ${port}`));
});
