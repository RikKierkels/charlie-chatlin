import io from 'socket.io-client';
import store from '@/store';
import Actions from '@/constants/actions';
import ConnectionStates from '@/constants/connection-states';

const storage = window.localStorage;

let socket = io.connect(process.env.VUE_APP_API_URL, {
  query: { sessionId: storage.getItem('SESSION_ID') }
});

socket.on('connect', () => {
  store.dispatch(Actions.CONNECTION_STATE_CHANGED, ConnectionStates.CONNECTED);
});

socket.on('handshake', sessionId => {
  console.log('handhskaing', sessionId);
  storage.setItem('SESSION_ID', sessionId);
});

socket.on('reconnect_attempt', () => {
  socket.io.opts.query = {
    sessionId: storage.getItem('SESSION_ID')
  };
});

socket.on('disconnect', () => {
  store.dispatch(
    Actions.CONNECTION_STATE_CHANGED,
    ConnectionStates.DISCONNECTED
  );
});

socket.on('registered', response => {
  console.log('regi');
  store.dispatch(Actions.REGISTER_SUCCESS, response.user);
  store.dispatch(Actions.CHATHISTORY_RECEIVED, response.chatHistory);
});

socket.on('message', message => {
  store.dispatch(Actions.MESSAGE_RECEIVED, message);
});

socket.on('user-joined', user => {
  store.dispatch(Actions.USER_JOINED, user);
});

// eslint-disable-next-line no-unused-vars
socket.on('user-left', user => {
  // TODO: Action
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
