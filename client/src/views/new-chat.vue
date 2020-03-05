<template>
  <div class="chat">
    <masonry :cols="cols" :gutter="gutter" style="width: 100%;">
      <my-user-tile class="tile" />

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
      </template>
    </masonry>

    <create-message />
  </div>
</template>

<script>
import CreateMessage from '@/components/chat/create-message';

import MessageTile from '@/components/tiles/message';
import UserJoinedTile from '@/components/tiles/user-joined';
import MyUserTile from '@/components/tiles/my-user';

export default {
  name: 'NewChat',
  components: {
    CreateMessage,
    MessageTile,
    UserJoinedTile,
    MyUserTile
  },
  data() {
    return {
      containerId: null,
      cols: {
        default: 8,
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
        content: this.$store.getters.otherUsers
      });

      this.$store.getters.messages.forEach(message => {
        if (message.id != null) {
          result.push({
            type: 'message',
            content: message
          });
        } else {
          result.push({
            type: 'user-joined',
            content: message
          });
        }
      });

      return result;
      /* this represents the entire tile collection.
         it is simply of an object:
         {
           type: 'theType',
           content: an object. for isntanec: Message
         }
      */
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables';

.chat {
  position: relative;
  background-color: darken($oxford, 15%);
  background-position: center;
  background-image: url('./../assets/images/back-1.svg');
  background-size: 350%;
  width: 100%;
  height: 100%;
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
