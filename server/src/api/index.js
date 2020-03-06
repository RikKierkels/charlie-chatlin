const { Router } = require('express');
const addVapidRoutes = require('./vapid');

const app = Router();
addVapidRoutes(app);
module.exports = app;
