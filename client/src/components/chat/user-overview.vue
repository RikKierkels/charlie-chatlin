<template>
  <div class="user-overview">
    <h2>
      <font-awesome-icon :icon="['fas', 'users']" />
      <span>online users</span>
      <span class="count">{{ users.length }}</span>
    </h2>

    <div v-for="(user, i) in users" :key="'user-' + i" class="user">
      <avatar small :avatarId="user.avatarId" />
      <p>{{ user.username }}</p>
    </div>
  </div>
</template>

<script>
import Chat from '@/utils/chat';
import Avatar from '@/components/avatar';

export default {
  name: 'UserOverview',
  components: {
    Avatar
  },
  computed: {
    users() {
      return this.$store.getters.otherUsers;
    }
  },
  mounted() {
    Chat.getRegisteredUsers();
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

h2 {
  color: $gray;
  margin-bottom: 10px;

  font-size: 1em;
  font-weight: 400;

  svg {
    margin-right: 15px;
  }

  .count {
    margin-left: 5px;

    border-radius: 2px;
    color: $gray;

    &::before {
      content: '(';
    }

    &::after {
      content: ')';
    }
  }
}

.user {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 8px 10px;
  border-radius: 5px;
  background-color: lighten($oxford, 4%);

  p {
    margin-left: 15px;
    color: $spindle;
    font-weight: 600;
  }
}
</style>
