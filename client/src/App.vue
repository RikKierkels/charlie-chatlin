<template>
  <div id="app">
    <connection-status-bar />

    <register v-if="!isRegistered" />
  </div>
</template>

<script>
import ConnectionStatusBar from '@/components/connection-status-bar';
import Register from '@/views/register';

export default {
  name: 'App',
  components: {
    ConnectionStatusBar,

    Register
  },
  computed: {
    isRegistered() {
      return false;
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
