<template>
  <container>
    <room />
    <message-bar />
  </container>
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
    }
  }
};
</script>

<style></style>
