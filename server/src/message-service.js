'use strict';
const { generateId, getCurrentDate } = require('./utils');
let chatHistory = [];

function saveMessage(message, user) {
  const chatMessage = {
    id: generateId(),
    text: message,
    sentOn: getCurrentDate(),
    sender: user
  };

  chatHistory = [...chatHistory, chatMessage];
  return chatMessage;
}

function getChatHistory() {
  return [...chatHistory];
}

module.exports = {
  saveMessage,
  getChatHistory
};
