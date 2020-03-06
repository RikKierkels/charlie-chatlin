<template>
  <div class="chat">
    <masonry :cols="cols" :gutter="gutter" style="width: 100%;">
      <my-user-tile class="tile" />
      <online-users-tile class="tile" />

      <template v-for="tile in tiles">
        <message-tile
          v-if="tile.type === 'message'"
          :message="tile.content"
          :key="`tile-${tile.content.id}`"
          class="tile"
        />

        <user-joined-tile
          v-if="tile.type === 'user-joined'"
          :message="tile.content"
          :key="`tile-${tile.content.text}`"
          class="tile"
        />

        <user-left-tile
          v-if="tile.type === 'user-left'"
          :message="tile.content"
          :key="`tile-${tile.content.text}`"
          class="tile"
        />
      </template>

      <new-message class="tile" />
    </masonry>
  </div>
</template>

<script>
import MessageTile from '@/components/tiles/message';
import UserJoinedTile from '@/components/tiles/user-joined';
import UserLeftTile from '@/components/tiles/user-left';
import MyUserTile from '@/components/tiles/my-user';
import OnlineUsersTile from '@/components/tiles/online-users';

import NewMessage from '@/components/tiles/new-message';

export default {
  name: 'NewChat',
  components: {
    MessageTile,
    UserJoinedTile,
    UserLeftTile,
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
    tiles() {
      const result = [];

      result.push({
        type: 'online-users',
        content: this.$store.getters.onlineUsers
      });

      this.$store.getters.messages.forEach(message => {
        if (message.type != null) {
          result.push({
            type: message.type,
            content: message
          });
        } else {
          result.push({
            type: 'message',
            content: message
          });
        }
      });

      return result;
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
