import io from 'socket.io-client';
import store from '@/store';

import Connection from '@/constants/connection';
import ConnectionStates from '@/constants/connection-states';

let socket = io.connect('http://localhost:3000');

socket.on('connect', () => {
  store.dispatch(Connection.Actions.STATE_CHANGED, ConnectionStates.CONNECTED);
});

socket.on('disconnect', () => {
  store.dispatch(
    Connection.Actions.STATE_CHANGED,
    ConnectionStates.DISCONNECTED
  );
});

socket.on('message', message => {
  console.log(message);
});

socket.on('error', error => {
  console.error('! Error on socket: ', error);
});

function register(username, avatarId) {
  socket.emit('register', { username, avatarId }, (error, success) => {
    console.log('error', error);
    console.log('success', success);
  });
}

function sayHello() {
  socket.emit('message', `hi this is dog! ${Date.now()}`, (error, success) => {
    console.log('error', error);
    console.log('success', success);
  });
}

export default {
  register,
  sayHello
};
