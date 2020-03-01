const dependencyInjectionLoader = require('./dependency-injector');
const expressLoader = require('./express');
const socketLoader = require('./socket');
const jobsLoader = require('./jobs');

module.exports = (app, io) => {
  dependencyInjectionLoader();
  expressLoader(app);
  socketLoader(io);
  jobsLoader();
};
