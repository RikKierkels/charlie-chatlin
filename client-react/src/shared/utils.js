export const random = (array) => array[Math.floor(Math.random() * array.length)];

export const formatMessageTime = (dateISO) => {
  const date = new Date(dateISO);
  return `${date.getHours()}:${date.getMinutes()}`;
};
