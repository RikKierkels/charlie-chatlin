module.exports = function makeHandleDisconnect(
  { io, sessionManager },
  { sessionId }
) {
  return function handleDisconnect() {
    sessionManager.markSessionAsInactive(sessionId);

    const user = sessionManager.getUserBySessionId(sessionId);
    if (!user) return;

    io.emit('user-left', user);
  };
};
