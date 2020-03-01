const dependencyInjectionLoader = require('./dependency-injector');
const expressLoader = require('./express');
const socketLoader = require('./socket');

module.exports = (app, io) => {
  dependencyInjectionLoader();
  expressLoader(app);
  socketLoader(io);
};
