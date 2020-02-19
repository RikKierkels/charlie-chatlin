<template>
  <div class="connection-status-bar" :class="connectionStatus">
    <p>{{ connectionStatus }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ConnectionStatusBar',
  computed: {
    ...mapGetters(['connectionStatus'])
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.connection-status-bar {
  display: block;
  position: fixed;
  bottom: 0px;
  width: 100%;
  width: fit-content;
  height: 50px;

  color: white;
  background-color: gray;

  font-weight: bold;
  font-size: 1.4em;
  text-align: center;

  p {
    position: relative;
    top: 50%;
    transform: translateY(-55%);
  }

  &.connecting {
    background-color: $yellow-sea;
  }

  &.connected {
    background-color: $lima;
  }

  &.disconnected {
    background-color: $rose;
  }
}
</style>
