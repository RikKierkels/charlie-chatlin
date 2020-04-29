import io from 'socket.io-client';

const storage = window.localStorage;
const sessionKey = 'APP_SESSION_ID';
let socket = null;

export const connect = () => {
  socket = io.connect(process.env.REACT_APP_API_URL, {
    query: { sessionId: storage.getItem(sessionKey) },
  });

  socket.on('handshake', (sessionId) => storage.setItem(sessionKey, sessionId));

  socket.on('register-success', ({ user, chatHistory }) => {});

  socket.on('register-failed', (error) => {});
};

export const register = (username, avatarId) => {
  if (!socket) throw new Error('No socket connection.');

  socket.emit('register', { username, avatarId });
};

export default {
  connect,
  register,
};
