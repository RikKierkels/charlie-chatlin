function toPushMessage(message) {
  return `${message.sender.username} - ${message.text}`;
}

function toUserJoinedMessage(user) {
  return `${user.username} joined the chat!`;
}

module.exports = {
  toPushMessage,
  toUserJoinedMessage
};
