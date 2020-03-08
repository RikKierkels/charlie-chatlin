const cors = require('cors');
const routes = require('../api');
const { api } = require('../config');

module.exports = function loadExpress(app) {
  app.enable('trust proxy');
  app.use(cors());
  app.use(api.prefix, routes);

  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message
      }
    });
  });
};
