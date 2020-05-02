import { Server, SocketIO } from 'mock-socket';

let server = null;
const defaultMocks = { onRegister: jest.fn() };

function start(handlerMocks = defaultMocks) {
  const url = 'http://localhost:5000';
  server = new Server(url);

  server.on('connection', (socket) => {
    socket.on('register', (data) => handlerMocks.onRegister(socket, data));
  });

  const io = SocketIO;
  window.io = io;
  return new io(url);
}

function stop() {
  if (!server) return;
  server.stop();
}

export default {
  start,
  stop,
};
