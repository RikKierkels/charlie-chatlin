<template>
  <div class="my-user">
    <div class="my-user-avatar">
      <div class="connection-status" :class="connectionStatus" />
      <avatar :avatarId="user.avatarId" medium />
    </div>
    <div>
      <h2>{{ user.username }}</h2>
      <p>
        back to avatar select
        <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
      </p>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/avatar';

export default {
  name: 'MyUser',
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

.my-user {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 50px;

  .my-user-avatar {
    position: relative;
    margin-right: 20px;
  }

  svg {
    transform: rotate(180deg);
    margin-left: 5px;
    top: 1px;
    position: relative;
  }

  h2 {
    font-weight: 700;
    font-size: 1.8em;
    color: white;
    line-height: 1.2em;
  }

  p {
    color: lighten($oxford, 30%);
    position: relative;
    margin-right: 10px;
  }
}

.connection-status {
  display: block;
  position: absolute;
  background-color: gray;

  left: -10px;
  top: -10px;
  width: 12px;
  height: 12px;

  z-index: 1;
  border-radius: 50%;
  border: 5px solid $oxford;

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
