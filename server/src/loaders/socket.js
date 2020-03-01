const handlerFactory = require('../socket/handlers');
const handleSession = require('../socket/session');
const handleClient = require('../socket/client');

module.exports = io => {
  const makeHandlers = handlerFactory(io);
  io.use(handleSession);
  io.on('connection', client => handleClient(client, makeHandlers(client)));
};
