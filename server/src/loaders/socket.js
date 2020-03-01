const handlerFactory = require('../socket/handlers');
const sessionMiddleware = require('../socket/session-middleware');
const handleClient = require('../socket/client');

module.exports = io => {
  const makeHandlers = handlerFactory(io);
  io.use(sessionMiddleware);
  io.on('connection', client => handleClient(client, makeHandlers(client)));
};
