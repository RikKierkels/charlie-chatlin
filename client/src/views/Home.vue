<template>
  <div>
    <p>sup this is doggydizzydog</p>
    <button @click="handleClick">hello</button>
    <button @click="handleRegister">register</button>
    <button @click="registerForPush">push notification register</button>
    <connection-status-bar />
  </div>
</template>

<script>
import Chat from '@/utils/chat';
import ConnectionStatusBar from '@/components/connection-status-bar';
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {
    ConnectionStatusBar
  },
  mounted() {},
  methods: {
    handleClick() {
      Chat.sayHello();
    },
    handleRegister() {
      const username = `KlothieMcTothie-${Date.now()}`;
      const avatarId = `KlothieMcTothie-${Date.now()}`;
      Chat.register(username, avatarId);
    },
    registerForPush() {
      function urlBase64ToUint8Array(base64String) {
        var padding = '='.repeat((4 - (base64String.length % 4)) % 4);
        var base64 = (base64String + padding)
          .replace(/-/g, '+')
          .replace(/_/g, '/');

        var rawData = window.atob(base64);
        var outputArray = new Uint8Array(rawData.length);

        for (var i = 0; i < rawData.length; ++i) {
          outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
      }

      // Register a Service Worker.
      navigator.serviceWorker.register('../service-worker.js');

      navigator.serviceWorker.ready
        .then(function(registration) {
          // Use the PushManager to get the user's subscription to the push service.
          return registration.pushManager
            .getSubscription()
            .then(async function(subscription) {
              // If a subscription was found, return it.
              if (subscription) {
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
          Chat.pushSubscription(subscription);
        });
    }
  },
  computed: {
    ...mapGetters(['connectionStatus'])
  }
};
</script>
