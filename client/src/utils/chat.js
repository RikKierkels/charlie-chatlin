import io from 'socket.io-client';
import store from '@/store';
import Actions from '@/constants/actions';
import ConnectionStates from '@/constants/connection-states';
import * as Storage from '@/utils/storage';

const storageKey = 'APP_SESSION_ID';
let socket = io.connect(process.env.VUE_APP_API_URL, {
  query: { sessionId: Storage.get(storageKey) }
});

socket.on('connect', () => {
  store.dispatch(Actions.CONNECTION_STATE_CHANGED, ConnectionStates.CONNECTED);
  getRegisteredUsers();
});

socket.on('reconnect_attempt', () => {
  socket.io.opts.query = {
    sessionId: Storage.get(storageKey)
  };
});

socket.on('disconnect', () => {
  store.dispatch(
    Actions.CONNECTION_STATE_CHANGED,
    ConnectionStates.DISCONNECTED
  );
});

socket.on('handshake', sessionId => Storage.set(storageKey, sessionId));

socket.on('register-success', response => {
  store.dispatch(Actions.REGISTER_SUCCESS, response.user);
  store.dispatch(Actions.CHATHISTORY_RECEIVED, response.chatHistory);
});

socket.on('register-failed', error => console.log(error));

socket.on('message', message => {
  store.dispatch(Actions.MESSAGE_RECEIVED, message);
});

socket.on('user-joined', user => {
  store.dispatch(Actions.USER_JOINED, user);
});

socket.on('user-left', user => {
  store.dispatch(Actions.USER_LEFT, user);
});

socket.on('error', error => {
  console.error('! Error on socket: ', error);
});

function getRegisteredUsers() {
  console.log('getting registered users');
  socket.emit('active-users', null, (error, success) => {
    console.log('received');
    store.dispatch(Actions.USERS_RECEIVED, success);
  });
}

function register(username, avatar) {
  socket.emit('register', { username: username, avatarId: avatar.id });
}

function sendMessage(m) {
  socket.emit('message', m, (error, success) => {
    if (error) {
      console.log('error when sending message', error);
    }

    if (success) {
      console.log('success after sending message', success);
    }
  });
}

function pushSubscription(subscription) {
  socket.emit('push-subscription', subscription, (error, success) => {
    console.log('error', error);
    console.log('success', success);
  });
}

function disconnect() {
  Storage.set('APP_SESSION_ID', null);
  socket.emit('disconnect');
}

export default {
  getRegisteredUsers,
  register,
  pushSubscription,
  sendMessage,
  disconnect
};
