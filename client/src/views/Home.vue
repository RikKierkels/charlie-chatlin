<template>
  <div>
    <p>sup this is doggydizzydog</p>
    <button @click="handleClick">hello</button>
    <button @click="handleRegister">register</button>
    <button @click="logAva">ava</button>
    <connection-status-bar />
  </div>
</template>

<script>
import ConnectionStatusBar from '@/components/connection-status-bar';
import { mapGetters } from 'vuex';
import Chat from '@/utils/chat';

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
    logAva() {
      console.log('avatars', this.avatars);
    }
  },
  computed: {
    ...mapGetters(['connectionStatus', 'avatars']),
    isRegistered() {
      return false;
    }
  }
};
</script>
