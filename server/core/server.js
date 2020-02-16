'use strict';
import express from 'express';
import * as http from 'http';
import io from 'socket.io';
import webPush from 'web-push';
import chalk from 'chalk';
import { makeHandlers } from './handlers';

const log = console.log;
const app = express();
const server = http.createServer(app);
const socket = io(server);

webPush.setVapidDetails(
  'https://www.charlie-chatlin.com',
  process.env.VAPID_KEY_PUBLIC,
  process.env.VAPID_KEY_PRIVATE
);

app.get('/vapid', (req, res) => {
  res.json({ key: process.env.VAPID_KEY_PUBLIC });
});

socket.on('connection', client => {
  log(`client connected... ${chalk.red(client.id)}`);

  const { handleRegister, handleMessage, handleDisconnect } = makeHandlers(
    client
  );

  client.on('register', handleRegister);

  client.on('message', handleMessage);

  client.on('disconnect', () => {
    log(`client disconnected... ${chalk.red(client.id)}`);
    handleDisconnect();
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
