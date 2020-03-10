<template>
  <div class="chat">
    <masonry :cols="cols" :gutter="gutter">
      <my-user-tile class="tile" />
      <online-users-tile class="tile" />

      <template v-for="message in messages">
        <message-tile
          v-if="message.type === 'text'"
          :message="message"
          :key="message.id"
          class="tile"
        />

        <user-joined-tile
          v-if="message.type === 'user-joined'"
          :message="message"
          :key="message.id"
          class="tile"
        />

        <!-- <user-left-tile
          v-if="tile.type === 'user-left'"
          :message="tile.content"
          :key="`tile-${tile.content.id}`"
          class="tile"
        /> -->
      </template>

      <new-message class="tile" />
    </masonry>
  </div>
</template>

<script>
import MessageTile from '@/components/tiles/message';
import UserJoinedTile from '@/components/tiles/user-joined';
// import UserLeftTile from '@/components/tiles/user-left';
import MyUserTile from '@/components/tiles/my-user';
import OnlineUsersTile from '@/components/tiles/online-users';

import NewMessage from '@/components/tiles/new-message';

export default {
  name: 'NewChat',
  components: {
    MessageTile,
    UserJoinedTile,
    // UserLeftTile,
    MyUserTile,
    OnlineUsersTile,
    NewMessage
  },
  data() {
    return {
      cols: {
        default: 12,
        4000: 11,
        3600: 10,
        3200: 9,
        2800: 8,
        2400: 7,
        2000: 6,
        1700: 5,
        1400: 4,
        1100: 3,
        800: 2,
        500: 1
      },
      gutter: { default: '20px' }
    };
  },
  computed: {
    messages() {
      return this.$store.getters.messages;
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables';

.chat {
  position: relative;

  padding: 50px;
  box-sizing: border-box;
}

.tile {
  margin-bottom: 20px;
  box-sizing: border-box;
  border-radius: 10px;
  overflow: hidden;
}
</style>
