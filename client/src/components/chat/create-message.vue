<template>
  <form :submit="sendMessage">
    <input
      type="text"
      v-model="message"
      placeholder="Start typing to create your message"
    />
    <button @click="sendMessage">Submit</button>
  </form>
</template>

<script>
import Chat from '@/utils/chat';

export default {
  name: 'CreateMessage',
  data() {
    return {
      message: null
    };
  },
  methods: {
    sendMessage(e) {
      e.preventDefault();

      Chat.sendMessage(this.message);
      this.message = null;
    }
  }
};
</script>

<style></style>
