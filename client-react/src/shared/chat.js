import { setUser } from '../store/userSlice';
import { SOCKET_EVENT } from './socket-constants';
import { addMessage, addUser, removeUser, setIsConnected, setMessages, setUsers } from '../store/chatSlice';

let _socket = null;
let _store = null;
const storage = window.localStorage;

function connect(socket, store) {
  _socket = socket;
  _store = store;

  socket.on(SOCKET_EVENT.CONNECT, () => store.dispatch(setIsConnected(true)));
  socket.on(SOCKET_EVENT.DISCONNECT, () => store.dispatch(setIsConnected(true)));
  socket.on(SOCKET_EVENT.HANDSHAKE, (sessionId) => storage.setItem(sessionKey, sessionId));
  socket.on(SOCKET_EVENT.RECONNECT, () => {
    store.dispatch(setIsConnected(false));
    socket.io.opts.query = { sessionId: storage.getItem(sessionKey) };
  });

  socket.on(SOCKET_EVENT.REGISTER_SUCCESS, ({ user, chatHistory }) => {
    store.dispatch(setUser({ username: user.username, avatarId: user.avatarId }));
    store.dispatch(setMessages(chatHistory));
  });
  socket.on(SOCKET_EVENT.REGISTER_FAILED, (error) => {
    console.log(error);
  });

  socket.on(SOCKET_EVENT.MESSAGE, (message) => store.dispatch(addMessage(message)));

  socket.on(SOCKET_EVENT.USER_JOINED, (user) => store.dispatch(addUser(user)));
  socket.on(SOCKET_EVENT.USER_LEFT, (user) => store.dispatch(removeUser(user)));
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
    _store.dispatch(setUsers(users));
  });
}

function sendMessage(message) {
  if (!_socket) throwNoSocketError();

  _socket.emit(SOCKET_EVENT.MESSAGE, message, (error, _) => {
    console.log(error);
  });
}

export const sessionKey = 'APP_SESSION_ID';
export default {
  connect,
  registerUser,
  getUsers,
  sendMessage,
};
