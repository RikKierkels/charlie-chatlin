<template>
  <div>
    <container class="chat-container">
      <div class="chat">
        <div class="side-bar">
          <my-user />
          <user-overview />
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
import Room from '@/components/chat/room';
import MessageBar from '@/components/chat/message-bar';
import UserOverview from '@/components/chat/user-overview';
import MyUser from '@/components/chat/my-user';
import Container from '@/components/container';

export default {
  name: 'Chat',
  computed: {},
  components: {
    Room,
    MessageBar,
    UserOverview,
    MyUser,
    Container
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.chat-container {
  background-color: $selago;
  background-color: $oxford;
  background: linear-gradient(
    90deg,
    darken($oxford, 3%) 59%,
    darken($selago, 3%) 59%
  );
}

.chat {
  position: relative;
  height: 100vh;
  display: flex;
  background-color: $oxford;

  .side-bar {
    width: 400px;
    padding: 35px;
  }

  .chat-window {
    width: 100%;
    position: relative;
    padding: 30px;
    background-color: $back;
  }
}
</style>
