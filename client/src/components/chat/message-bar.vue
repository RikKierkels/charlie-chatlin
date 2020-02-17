<template>
  <div class="message-bar">
    <input type="text" placeholder="Start typing .." v-model="message" />

    <button @click="handleSendMessage">
      <font-awesome-icon :icon="['fas', 'envelope']" />
    </button>
  </div>
</template>

<script>
import Chat from '@/utils/chat';

export default {
  name: 'MessageBar',
  data() {
    return {
      message: null
    };
  },
  methods: {
    handleSendMessage() {
      Chat.sendMessage(this.message);
      this.message = null;
    }
  }
};
</script>

<style lang="scss" scoped>
.message-bar {
  display: flex;

  input {
    width: 100%;
  }

  button {
    width: fit-content;
    padding: 15px 22px;
  }
}
</style>
