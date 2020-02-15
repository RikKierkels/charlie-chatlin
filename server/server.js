'use strict';

import chalk from 'chalk';
import io from 'socket.io';
import * as http from 'http';
import { handleRegister, handleDisconnect } from './handlers';

const log = console.log;
const server = http.createServer();
const socket = io(server);

socket.on('connection', client => {
  log(`client connected... ${chalk.red(client.id)}`);

  client.on('register', (user, callback) =>
    handleRegister(user, client.id, callback)
  );

  client.on('disconnect', () => {
    handleDisconnect(client.id);
    log(`client disconnected... ${chalk.red(client.id)}`);
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
