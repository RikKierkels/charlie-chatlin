'use strict';
const pushMessageTemplate = message =>
  `${message.sender.username} - ${message.text}`;
const timeTillLogoff = Number.parseInt(process.env.LOG_OFF_TIMER);

module.exports = function makeHandlers(
  client,
  sessionService,
  messageService,
  pushService
) {
  let logoffTimer = setTimeout(() => logoff(), timeTillLogoff);
  const sessionId = sessionService.register(client);

  function handleUserRegister(user, callback) {
    if (!sessionService.isUsernameAvailable(user)) {
      callback('User is not available.');
    }

    sessionService.setUserForSession(user, sessionId);
    sessionService.broadcastUserJoined(user);

    callback(null, { user, chatHistory: messageService.getChatHistory() });
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

  function handlePushSubscription(subscription) {
    pushService.saveSubscription(sessionId, subscription);
  }

  function handleGetRegisteredUsers(_, callback) {
    callback(null, sessionService.getConnectedUsers());
  }

  function handleDisconnect() {
    const user = sessionService.getUserBySessionId(sessionId);

    if (user) {
      sessionService.broadcastUserLeft(user);
    }

    sessionService.setDisconnectedTime(sessionId);
  }

  function logoff() {
    client.disconnect();
    handleDisconnect();
  }

  function resetLogoffTimer() {
    clearTimeout(logoffTimer);
    logoffTimer = setTimeout(() => logoff(), timeTillLogoff);
  }

  return {
    handleUserRegister,
    handleMessage,
    handlePushSubscription,
    handleGetRegisteredUsers,
    handleDisconnect
  };
};
