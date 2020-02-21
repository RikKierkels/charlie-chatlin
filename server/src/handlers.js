'use strict';
const { generateId } = require('./utils');
const pushMessageTemplate = message =>
  `${message.sender.username} - ${message.text}`;
const timeTillLogoff = Number.parseInt(process.env.LOG_OFF_TIMER);

module.exports = function makeHandlers(
  client,
  sessionService,
  messageService,
  pushService
) {
  let logoffTimer = setTimeout(() => {
    handleUnregister();
  }, timeTillLogoff);

  let { sessionId } = client.handshake.query;

  if (!sessionId) {
    sessionId = generateId();
    client.emit('handshake', sessionId);
  }

  sessionService.register(sessionId, client);

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

    resetLogoffTimer();
    message = messageService.saveMessage(message, user);
    sessionService.broadcastMessage(message);

    await pushService.sendNotifications(
      pushMessageTemplate(message),
      sessionId
    );

    callback(null);
  }

  function resetLogoffTimer() {
    clearTimeout(logoffTimer);
    logoffTimer = setTimeout(() => handleUnregister(), timeTillLogoff);
  }

  function handlePushSubscription(subscription) {
    pushService.saveSubscription(sessionId, subscription);
  }

  function handleGetRegisteredUsers(_, callback) {
    callback(null, sessionService.getUsers());
  }

  function handleUnregister() {
    const user = sessionService.getUserBySessionId(sessionId);

    if (user) sessionService.broadcastUserLeft(user);

    sessionService.unregister(sessionId);
    pushService.removeSubscription(sessionId);
  }

  return {
    handleUserRegister,
    handleMessage,
    handlePushSubscription,
    handleGetRegisteredUsers,
    handleUnregister
  };
};
