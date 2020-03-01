const { Container } = require('typedi');
const messageService = require('../services/message-service');
const sessionManager = require('../services/session-manager');
const pushService = require('../services/push-service');

module.exports = () => {
  Container.set('messageService', messageService);
  Container.set('sessionManager', sessionManager);
  Container.set('pushService', pushService());
};
