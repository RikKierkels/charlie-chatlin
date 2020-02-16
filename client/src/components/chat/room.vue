<template>
  <div class="room">
    <message v-for="(m, i) in messages" :key="`msg-${i}`" :message="m" />
  </div>
</template>

<script>
import Message from '@/components/chat/message';

export default {
  name: 'Room',
  components: {
    Message
  },
  computed: {
    messages() {
      return this.$store.getters.messages;
    }
  }
};
</script>

<style></style>
