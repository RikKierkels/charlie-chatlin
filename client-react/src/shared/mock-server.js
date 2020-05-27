import { Server, SocketIO } from 'mock-socket';
import { SOCKET_EVENT } from './socket-constants';

let server = null;
let mockHandlers = {};
const defaultHandlers = {
  onRegister: jest.fn(),
  onConnect: jest.fn(),
  onMessage: jest.fn(),
  onGetUsers: jest.fn(),
  onUserJoined: jest.fn(),
};

function start(handlers = defaultHandlers) {
  const url = 'http://localhost:5000';
  server = new Server(url);
  mockHandlers = handlers;

  server.on(SOCKET_EVENT.CONNECT, (socket) => {
    socket.on(SOCKET_EVENT.CONNECT, (data) => handlers.onConnect({ data, socket }));
    socket.on(SOCKET_EVENT.REGISTER, (data) => handlers.onRegister({ data, socket }));
    socket.on(SOCKET_EVENT.MESSAGE, (data) => handlers.onMessage({ data, socket }));
    socket.on(SOCKET_EVENT.ACTIVE_USERS, (data, callback) => handlers.onGetUsers({ data, socket, callback }));
    socket.on(SOCKET_EVENT.USER_JOINED, (data, callback) => handlers.onUserJoined({ data, socket, callback }));
  });

  const io = SocketIO;
  window.io = io;
  return new io(url);
}

function emitUserJoinedEvent(user) {
  for (const client of server.clients()) {
    client.emit(SOCKET_EVENT.USER_JOINED, user);
  }
}

function reset() {
  for (const mockFn of Object.values(mockHandlers)) {
    mockFn.mockClear();
  }
}

function stop() {
  if (!server) return;
  server.stop();
}

export const SOCKET_OPEN = 1;
export default {
  start,
  stop,
  reset,
  emitUserJoinedEvent,
};
