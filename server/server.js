import chalk from 'chalk';
import io from 'socket.io';
import * as http from 'http';

const log = console.log;
const server = http.createServer();
const socket = io(server);

socket.onconnection(client => {
    log(`client connected... ${chalk.red(client.id)}`);

    client.on('register', () => {});

    client.on('disconnect', () => {
        log(`client disconnected... ${chalk.red(client.id)}`);
    });

    client.on('error', error => {
        log(`client threw error: ${chalk.red(client.id)}`);
        log(error);
    });
});

server.listen(3000, error => {
    if (error) throw error;
    log(chalk.blue('listening on port: 3000'))
});
