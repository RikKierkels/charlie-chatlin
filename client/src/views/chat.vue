<template>
  <div>
    <container>
      <div class="chat">
        <div class="users">
          <p>test</p>
          <p>test</p>
        </div>
        <div class="chat-window">
          <room />
          <message-bar />
        </div>
      </div>
    </container>
  </div>
</template>

<script>
import Chat from '@/utils/chat';

import Container from '@/components/container';
import Room from '@/components/chat/room';
import MessageBar from '@/components/chat/message-bar';

export default {
  name: 'Chat',
  computed: {},
  components: {
    Container,
    Room,
    MessageBar
  },
  methods: {
    handleSendMessage() {
      Chat.sendMessage();
    },
    handleDisconnect() {
      Chat.disconnect();
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.chat {
  background-color: $selago;
  background-color: $oxford;
  height: 100vh;
  display: flex;

  .users {
    width: 250px;
    p {
      color: dodgerblue;
    }
  }

  .chat-window {
    width: 100%;
    background-color: $selago;
  }
}
</style>
