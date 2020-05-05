export const SOCKET_EVENT = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  RECONNECT: 'reconnect_attempt',
  HANDSHAKE: 'handshake',
  REGISTER: 'register',
  REGISTER_SUCCESS: 'register-success',
  REGISTER_FAILED: 'register-failed',
  MESSAGE: 'message',
  ACTIVE_USERS: 'active-users',
  USER_JOINED: 'user-joined',
};

export const MESSAGE_TYPE = {
  TEXT: 'text',
  USER_JOINED: 'user-joined',
};
