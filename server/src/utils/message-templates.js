function toPushMessage(message) {
  return `${message.sender.username} - ${message.text}`;
}

function toUserJoinedMessage(user) {
  return `${user.username} joined the chat!`;
}

function toUserLeftMessage(user) {
  return `${user.username} left the chat!`;
}

module.exports = {
  toPushMessage,
  toUserJoinedMessage,
  toUserLeftMessage
};
