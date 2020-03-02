const handlerFactory = require('../socket/handlers');
const sessionMiddleware = require('../socket/session-middleware');
const handleClient = require('../socket/client');

module.exports = function loadSocket(io) {
  const makeHandlers = handlerFactory(io);
  io.use(sessionMiddleware);
  io.on('connection', client => handleClient(client, makeHandlers(client)));
};
