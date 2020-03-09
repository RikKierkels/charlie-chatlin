<template>
  <div class="new-message">
    <form :submit="sendMessage">
      <textarea
        ref="textarea"
        v-model="message"
        rows="5"
        placeholder="Start typing to create your message"
        v-on:keyup.enter.exact="sendMessage"
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
  mounted() {
    this.$refs.textarea.focus();
  },
  methods: {
    sendMessage(e) {
      if (!this.message || !this.message.trim()) return;

      Chat.sendMessage(this.message);
      this.message = null;
      e.preventDefault();
    }
  },
  computed: {
    message: {
      set(v) {
        this.$store.dispatch('compose-message', v);
      },
      get() {
        return this.$store.getters.newMessage;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.new-message {
  background-color: darken($electric-violet, 5%);
  color: white;
  padding: 30px;

  textarea {
    width: 100%;
    background-color: darken($electric-violet, 5%);
    color: white;
    font-size: 1.3em;
    font-family: 'Fira Sans';
    outline: none;
    border: 0;
    overflow: auto;
    resize: none;

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
      color: cyan;
    }
  }

  button {
    float: right;
    border: 0;
    background-color: $electric-violet;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    color: white;
    font-size: 1.2em;
    cursor: pointer;

    svg {
      position: relative;
      left: -2px;

      color: $cyan;
    }
  }
}
</style>
