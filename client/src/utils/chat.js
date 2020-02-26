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

socket.on('registered', response => {
  store.dispatch(Actions.REGISTER_SUCCESS, response.user);
  store.dispatch(Actions.CHATHISTORY_RECEIVED, response.chatHistory);
});

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
  socket.emit('registered-users', null, (error, success) => {
    console.log(error);
    console.log(success);
  });
}

function register(avatar) {
  socket.emit(
    'register',
    { username: avatar.username, avatarId: avatar.id },
    (error, success) => {
      if (success != null) {
        store.dispatch(Actions.REGISTER_SUCCESS, success.user);
        store.dispatch(Actions.CHATHISTORY_RECEIVED, success.chatHistory);
      } else if (error != null) {
        // store.dispatch(Actions.REGISTER_FAILED, error);
        console.log('regsitertion failed error', error);
      }
    }
  );
}

function sendMessage(m) {
  socket.emit('message', m, (error, success) => {
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

function pushSubscription(subscription) {
  socket.emit('push-subscription', subscription, (error, success) => {
    console.log('error', error);
    console.log('success', success);
  });
}

export default {
  getRegisteredUsers,
  register,
  sayHello,
  pushSubscription,
  sendMessage
};
