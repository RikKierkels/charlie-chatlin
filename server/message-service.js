'use strict';

let messages = [];

function saveMessage(message, user) {
  message = { message, user, timestamp: Date.now() };
  messages = [message, ...messages];
  return message;
}

export default {
  saveMessage
};
