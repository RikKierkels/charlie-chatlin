'use strict';
const log = console.log;
const chalk = require('chalk');
const loaders = require('./loaders');
const { port } = require('./config');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

function startServer() {
  const app = express();
  const server = http.createServer(app);
  const io = socketIo(server);

  loaders(app, io);

  server.listen(port, error => {
    if (error) throw error;
    log(chalk.blue(`listening on port: ${port}`));
  });
}

startServer();
