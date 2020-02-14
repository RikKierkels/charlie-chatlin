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
.connection-status-bar {
  display: block;
  width: 100%;
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
    background-color: rgb(255, 174, 0);
  }

  &.connected {
    background-color: rgb(137, 212, 23);
  }

  &.disconnected {
    background-color: rgb(255, 0, 98);
  }
}
</style>
