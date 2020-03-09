<template>
  <div class="online-users-tile">
    <div
      class="online-user"
      v-for="(user, i) in users"
      :key="`online-user-${i}`"
    >
      <p>{{ user.username }}</p>
      <avatar small :avatar-id="user.avatarId" />
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/avatar';

export default {
  name: 'OnlineUsersTile',
  components: {
    Avatar
  },
  computed: {
    users() {
      return this.$store.getters.onlineUsers;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.online-users-tile {
  background-color: $lima;
  background-color: lighten($dark, 3%);
  font-weight: 500;
  line-height: 1.2em;
  padding: 30px;
}

.online-user {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0px;

  p {
    margin-right: 20px;
    font-size: 0.8em;
    color: white;
  }

  &:first-child {
    margin-top: 0px;
  }
  &:last-child {
    margin-bottom: 0px;
  }
}
</style>
