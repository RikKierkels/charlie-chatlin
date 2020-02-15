'use strict';

let chatHistory = [];

function saveMessage(message, user) {
  message = { message, user, timestamp: Date.now() };
  chatHistory = [...chatHistory, message];
  return message;
}

function getChatHistory() {
  return [...chatHistory];
}

export default {
  saveMessage,
  getChatHistory
};
