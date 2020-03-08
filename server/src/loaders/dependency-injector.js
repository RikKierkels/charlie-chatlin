const { Container } = require('typedi');
const MessageTemplates = require('../utils/message-templates');
const MessageService = require('../services/message-service');
const SessionManager = require('../services/session-manager');
const PushService = require('../services/push-service');
const Validator = require('../utils/validator');

module.exports = function loadDependencyInjection() {
  Container.set('MessageTemplates', MessageTemplates);
  Container.set('MessageService', MessageService);
  Container.set('SessionManager', SessionManager);
  Container.set('Validator', Validator);
  Container.set('PushService', PushService());
};
