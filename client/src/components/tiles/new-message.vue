<template>
  <div class="new-message">
    <form :submit="sendMessage">
      <textarea
        v-model="message"
        rows="5"
        placeholder="Start typing to create your message"
      />

      <button @click="sendMessage">
        <font-awesome-icon :icon="['fas', 'paper-plane']" />
      </button>
    </form>
  </div>
</template>

<script>
import Chat from '@/utils/chat';

export default {
  name: 'NewMessage',
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

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.new-message {
  background-color: darken($lima, 3%);
  color: white;
  padding: 30px;

  textarea {
    width: 100%;
    background-color: darken($lima, 3%);
    color: white;
    font-size: 1.3em;
    font-family: 'Fira Sans';
    outline: none;
    border: 0;
    overflow: auto;
    resize: none;

    &::placeholder {
      color: lighten($lima, 20%);
    }
  }

  button {
    float: right;
    border: 0;
    background-color: $lima;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    color: white;
    font-size: 1.2em;
    cursor: pointer;

    svg {
      position: relative;
      left: -2px;
    }
  }
}
</style>
