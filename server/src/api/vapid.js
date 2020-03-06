const { vapid } = require('../config');
const { Router } = require('express');
const route = Router();

module.exports = function addVapidRoutes(app) {
  app.use('/vapid', route);

  route.get('/key', (req, res, next) => {
    if (!vapid.keys.public) {
      const err = new Error('Cannot find the key.');
      return next(err);
    }

    return res.json({ key: vapid.keys.public });
  });
};
