import Vue from 'vue';
import App from '@/App';
import './registerServiceWorker';
import router from '@/router';
import store from '@/store';
import Chat from '@/utils/chat';

navigator.serviceWorker.register('sw.js').then(console.log);

function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  var base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Register a Service Worker.

navigator.serviceWorker.ready
  .then(function(registration) {
    // Use the PushManager to get the user's subscription to the push service.
    return registration.pushManager
      .getSubscription()
      .then(async function(subscription) {
        // If a subscription was found, return it.
        if (subscription) {
          console.log(subscription);
          return subscription;
        }

        // Get the server's public key
        const response = await fetch('http://localhost:3000/vapid');
        const vapidPublicKey = await response
          .json()
          .then(res => urlBase64ToUint8Array(res.key));

        // Otherwise, subscribe the user (userVisibleOnly allows to specify that we don't plan to
        // send notifications that don't have a visible effect for the user).
        return registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: vapidPublicKey
        });
      });
  })
  .then(function(subscription) {
    console.log('Pushing subscription');
    Chat.pushSubscription(subscription);
  });

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* library.add(fab); */
library.add(fas);
/* library.add(far); */
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
