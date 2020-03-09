<template>
  <div id="app">
    <register v-if="!isRegistered" />
    <chat v-else />

    <img src="img/giphy-attri.gif" class="giphy" />
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
  display: block;
  margin: 0 auto;
}
</style>
