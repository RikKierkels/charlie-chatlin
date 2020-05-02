import store from '../store/store';
import { setUser } from '../store/userSlice';

const storage = window.localStorage;
let socket = null;

function connect(io) {
  socket = io;

  socket.on('handshake', (sessionId) => storage.setItem(sessionKey, sessionId));

  socket.on('register-success', ({ user, chatHistory }) => {
    store.dispatch(setUser({ username: user.username, avatar: user.avatarId }));
  });

  socket.on('register-failed', (error) => {
    console.log(error);
  });
}

function throwNoSocketError() {
  throw new Error('No socket connection. You likely forgot to connect or register.');
}

function registerUser(username, avatarId) {
  if (!socket) throwNoSocketError();

  socket.emit('register', { username, avatarId });
}

export const sessionKey = 'APP_SESSION_ID';
export default {
  connect,
  registerUser,
};
