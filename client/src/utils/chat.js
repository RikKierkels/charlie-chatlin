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

socket.on('error', error => {
  console.error('! Error on socket: ', error);
});

export default {
  sayHello() {
    socket.emit('hello', 'hi this is dog!');
  }
};
