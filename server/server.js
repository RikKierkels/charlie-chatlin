'use strict';
import chalk from 'chalk';
import io from 'socket.io';
import * as http from 'http';
import { makeHandlers } from './handlers';

const log = console.log;
const server = http.createServer();
const socket = io(server);

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

server.listen(3000, error => {
  if (error) throw error;
  log(chalk.blue('listening on port: 3000'));
});
