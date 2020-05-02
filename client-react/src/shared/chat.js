import { setUser } from '../store/userSlice';
import { SOCKET_EVENTS } from './socket-constants';

const storage = window.localStorage;
let socket = null;

function connect(io, store) {
  socket = io;

  socket.on(SOCKET_EVENTS.HANDSHAKE, (sessionId) => storage.setItem(sessionKey, sessionId));

  socket.on(SOCKET_EVENTS.REGISTER_SUCCESS, ({ user, chatHistory }) => {
    store.dispatch(setUser({ username: user.username, avatar: user.avatarId }));
  });

  socket.on(SOCKET_EVENTS.REGISTER_FAILED, (error) => {
    console.log(error);
  });
}

function throwNoSocketError() {
  throw new Error('No socket connection. You likely forgot to connect or register.');
}

function registerUser(username, avatarId) {
  if (!socket) throwNoSocketError();

  socket.emit(SOCKET_EVENTS.REGISTER, { username, avatarId });
}

export const sessionKey = 'APP_SESSION_ID';
export default {
  connect,
  registerUser,
};
