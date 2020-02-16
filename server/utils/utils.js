export function generateId() {
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
}

export function getCurrentDate() {
  return new Date().toISOString();
}
