'use strict';
const { generateId } = require('./utils');
const pushMessageTemplate = message =>
  `${message.sender.username} - ${message.text}`;

module.exports = function makeHandlers(
  client,
  sessionService,
  messageService,
  pushService
) {
  let sessionId = null;

  if (client.handshake.query.sessionId) {
    sessionId = client.handshake.query.sessionId;
    handleReconnect();
  } else {
    sessionId = generateId();
    handleConnect();
  }

  function handleConnect() {
    sessionService.register(sessionId, client);
    client.emit('handshake', sessionId);
  }

  function handleReconnect() {
    sessionService.register(sessionId, client);
  }

  function handleUserRegister(user, callback) {
    if (!sessionService.isUserAvailable(user)) {
      callback('User is not available.');
    }

    const response = {
      user: sessionService.setUserForSession(user, sessionId),
      chatHistory: messageService.getChatHistory()
    };

    sessionService.broadcastUserJoined(response.user);
    callback(null, response);
  }

  async function handleMessage(message, callback) {
    const user = sessionService.getUserBySessionId(sessionId);

    if (!user) callback('No user registered for this session.');

    message = messageService.saveMessage(message, user);
    sessionService.broadcastMessage(message);

    await pushService.sendNotifications(
      pushMessageTemplate(message),
      sessionId
    );

    callback(null);
  }

  function handlePushSubscription(subscription) {
    pushService.saveSubscription(sessionId, subscription);
  }

  function handleGetRegisteredUsers(_, callback) {
    callback(null, sessionService.getUsers());
  }

  function handleDisconnect() {
    const user = sessionService.getUserBySessionId(sessionId);

    if (user) sessionService.broadcastUserLeft(user);

    sessionService.unregister(client.id);
    pushService.removeSubscription(client.id);
  }

  return {
    handleUserRegister,
    handleMessage,
    handlePushSubscription,
    handleGetRegisteredUsers,
    handleDisconnect
  };
};
