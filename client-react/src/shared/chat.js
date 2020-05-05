import { setUser } from '../store/userSlice';
import { SOCKET_EVENT } from './socket-constants';
import { setIsConnected } from '../store/chatSlice';

const storage = window.localStorage;
let socket = null;

function connect(io, store) {
  socket = io;

  socket.on(SOCKET_EVENT.CONNECT, () => store.dispatch(setIsConnected({ isConnected: true })));
  socket.on(SOCKET_EVENT.DISCONNECT, () => store.dispatch(setIsConnected({ isConnected: false })));
  socket.on(SOCKET_EVENT.HANDSHAKE, (sessionId) => storage.setItem(sessionKey, sessionId));
  socket.on(SOCKET_EVENT.RECONNECT, () => {
    store.dispatch(setIsConnected({ isConnected: false }));
    socket.io.opts.query = { sessionId: storage.getItem(sessionKey) };
  });

  socket.on(SOCKET_EVENT.REGISTER_SUCCESS, ({ user, chatHistory }) => {
    store.dispatch(setUser({ username: user.username, avatarId: user.avatarId }));
  });

  socket.on(SOCKET_EVENT.REGISTER_FAILED, (error) => {
    console.log(error);
  });
}

function throwNoSocketError() {
  throw new Error('No socket connection. You likely forgot to connect or register.');
}

function registerUser(username, avatarId) {
  if (!socket) throwNoSocketError();

  socket.emit(SOCKET_EVENT.REGISTER, { username, avatarId });
}

export const sessionKey = 'APP_SESSION_ID';
export default {
  connect,
  registerUser,
};
