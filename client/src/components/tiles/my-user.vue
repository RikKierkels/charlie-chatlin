<template>
  <div class="my-user-tile" v-if="user">
    <div class="my-user-avatar">
      <div class="connection-status" :class="connectionStatus" />
      <avatar large :avatar-id="user.avatarId" />
    </div>
    <p class="username">{{ user.username }}</p>
    <p class="avatar-select-link">
      back to avatar select
      <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
    </p>
  </div>
</template>

<script>
import Avatar from '@/components/avatar';

export default {
  name: 'MyUserTile',
  components: {
    Avatar
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    connectionStatus() {
      return this.$store.getters.connectionStatus;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.my-user-tile {
  padding: 30px;
  text-align: center;

  .username {
    color: white;
    font-size: 1.4em;
    line-height: 1.2em;
    font-weight: 600;
  }

  .avatar-select-link {
    font-size: 0.8em;
    color: $blue;

    svg {
      margin-left: 7px;
      transform: rotate(180deg);
      position: relative;
      top: 2px;
    }
  }

  .my-user-avatar {
    position: relative;
    width: fit-content;
    margin: 0 auto;

    .avatar {
      margin: 0 auto;
      margin-bottom: 30px;
    }
  }
}

.connection-status {
  display: block;
  position: absolute;
  background-color: gray;
  margin: 0 auto;

  right: -10px;
  top: 0px;
  width: 30px;
  height: 30px;

  z-index: 1;
  border-radius: 50%;
  border: 7px solid darken($oxford, 15%);

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
