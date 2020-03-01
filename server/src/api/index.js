const { Router } = require('express');
const vapid = require('./vapid');

module.exports = () => {
  const app = Router();
  vapid(app);

  return app;
};
