import { SOCKET_EVENT } from './socket-constants';
import {
  connectivityChanged,
  activeUsersRetrieved,
  userJoined,
  userLeft,
  userRegistered,
  messageReceived,
} from '../store/chatSlice';

let _socket = null;
let _store = null;
const storage = window.localStorage;
const log = (message) => message && console.log(message);

function connect(socket, store) {
  _socket = socket;
  _store = store;

  socket.on(SOCKET_EVENT.CONNECT, () => store.dispatch(connectivityChanged(true)));
  socket.on(SOCKET_EVENT.DISCONNECT, () => store.dispatch(connectivityChanged(true)));
  socket.on(SOCKET_EVENT.HANDSHAKE, (sessionId) => storage.setItem(sessionKey, sessionId));
  socket.on(SOCKET_EVENT.RECONNECT, () => {
    store.dispatch(connectivityChanged(false));
    socket.io.opts.query = { sessionId: storage.getItem(sessionKey) };
  });
  socket.on(SOCKET_EVENT.REGISTER_SUCCESS, ({ user, chatHistory }) => {
    store.dispatch(userRegistered({ user, messages: chatHistory }));
  });
  socket.on(SOCKET_EVENT.REGISTER_FAILED, (error) => log(error));
  socket.on(SOCKET_EVENT.MESSAGE, (message) => store.dispatch(messageReceived(message)));
  socket.on(SOCKET_EVENT.USER_JOINED, (user) => store.dispatch(userJoined(user)));
  socket.on(SOCKET_EVENT.USER_LEFT, (user) => store.dispatch(userLeft(user)));
}

function throwNoSocketError() {
  throw new Error('No socket connection. You likely forgot to connect.');
}

function registerUser(username, avatarId) {
  if (!_socket) throwNoSocketError();

  _socket.emit(SOCKET_EVENT.REGISTER, { username, avatarId });
}

function getUsers() {
  if (!_socket) throwNoSocketError();

  _socket.emit(SOCKET_EVENT.ACTIVE_USERS, null, (error, users) => {
    error ? log(error) : _store.dispatch(activeUsersRetrieved(users));
  });
}

function sendMessage(message) {
  if (!_socket) throwNoSocketError();

  _socket.emit(SOCKET_EVENT.MESSAGE, message, (error, _) => log(error));
}

export const sessionKey = 'APP_SESSION_ID';
export default {
  connect,
  registerUser,
  getUsers,
  sendMessage,
};
