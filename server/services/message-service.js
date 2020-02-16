'use strict';
import { generateId, getCurrentDate } from '../utils/utils';

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

export default {
  saveMessage,
  getChatHistory
};
