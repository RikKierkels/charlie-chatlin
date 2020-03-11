<template>
  <div id="app">
    <register v-if="!isRegistered" />
    <chat v-if="isRegistered" />

    <img src="img/giphy.png" class="giphy" />
  </div>
</template>

<script>
import Register from '@/views/register';
import Chat from '@/views/chat';

export default {
  name: 'App',
  components: {
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
  height: 100vh;
}

.giphy {
  position: absolute;
  bottom: 50px;
  right: 50px;
}
</style>
