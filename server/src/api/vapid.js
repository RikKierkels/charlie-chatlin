const { vapid } = require('../config');
const { Router } = require('express');
const route = Router();

module.exports = app => {
  app.use('/vapid', route);

  route.get('/key', (req, res) => {
    return res.json({ key: vapid.keys.public });
  });
};
