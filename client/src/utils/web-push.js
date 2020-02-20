import axios from 'axios';

async function register() {
  if (!isWorkerSupported()) return;
  return navigator.serviceWorker.register('service-worker.js');
}

function isWorkerSupported() {
  return 'serviceWorker' in navigator;
}

async function subscribe() {
  if (!isWorkerSupported()) return;

  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();

  if (subscription) return subscription;

  // TODO: move url to global env.
  const key = await axios.get(`${process.env.VUE_APP_API_URL}/vapid`).then(
    response => response.data.key,
    () => null
  );

  if (!key) return;

  return registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(key)
  });
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export { register, subscribe };
