<template>
  <div id="app">
    <connection-status-bar />

    <register v-if="!isRegistered" />
    <chat v-else />
  </div>
</template>

<script>
import ConnectionStatusBar from '@/components/connection-status-bar';
import Register from '@/views/register';
import Chat from '@/views/chat';

export default {
  name: 'App',
  components: {
    ConnectionStatusBar,

    Register,
    Chat
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    isRegistered() {
      return this.user != null;
    }
  }
};
</script>
<style lang="scss">
@import '@/assets/styles/index';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}
</style>
