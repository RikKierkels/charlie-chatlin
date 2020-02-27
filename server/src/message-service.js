'use strict';
const { generateId, getCurrentDate } = require('./utils');
let chatHistory = [];

function createMessage(text, user) {
  return {
    id: generateId(),
    text,
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
