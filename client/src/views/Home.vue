<template>
  <div>
    <p>sup this is doggydizzydog</p>
    <button @click="handleClick">hello</button>
    <button @click="handleRegister">register</button>
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
      Chat.register();
    }
  },
  computed: {
    ...mapGetters(['connectionStatus'])
  }
};
</script>
