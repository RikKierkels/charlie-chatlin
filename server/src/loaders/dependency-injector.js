const { Container } = require('typedi');
const MessageService = require('../services/message-service');
const SessionManager = require('../services/session-manager');
const PushService = require('../services/push-service');

module.exports = function loadDependencyInjection() {
  Container.set('MessageService', MessageService);
  Container.set('SessionManager', SessionManager);
  Container.set('PushService', PushService());
};
