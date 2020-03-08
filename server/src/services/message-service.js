const { generateId, getCurrentDate } = require('../utils');
let chatHistory = [];

function createMessage(text, type, user) {
  return {
    id: generateId(),
    text,
    type,
    sentOn: getCurrentDate(),
    sender: user
  };
}

function addMessage(message) {
  chatHistory = [...chatHistory, message];
}

function getChatHistory() {
  return [...chatHistory];
}

module.exports = {
  createMessage,
  addMessage,
  getChatHistory
};
