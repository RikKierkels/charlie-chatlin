'use strict';

function generateId() {
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
}

function getCurrentDate() {
  return new Date().toISOString();
}

module.exports = {
  generateId,
  getCurrentDate
};
