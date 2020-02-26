const storage = window.localStorage;

function get(key) {
  return storage.getItem(key);
}

function set(key, item) {
  return storage.setItem(key, item);
}

export { get, set };
