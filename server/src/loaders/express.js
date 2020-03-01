const cors = require('cors');
const routes = require('../api');
const { api } = require('../config');

module.exports = app => {
  app.enable('trust proxy');

  app.use(cors);

  app.use(api.prefix, routes());
};
