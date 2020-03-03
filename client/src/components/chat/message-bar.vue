<template>
  <div class="message-bar">
    <input type="text" placeholder="Start typing .." v-model="message" />

    <button @click="handleSendMessage">
      <font-awesome-icon :icon="['fas', 'paper-plane']" />
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
@import '@/assets/styles/variables';

.message-bar {
  position: absolute;
  box-sizing: border-box;
  bottom: 25px;
  width: calc(100% - 40px);
  display: flex;
  padding: 20px;
  border-radius: 5px;
  background-color: $selago;
  border: 1px solid darken($selago, 1%);

  input {
    width: 100%;
    background-color: white;
    margin-right: 20px;
  }

  button {
    width: fit-content;
    padding: 15px 22px;

    background-color: $melrose;
    color: darken($melrose, 30%);

    &:hover {
      background-color: $spray;
      color: darken($spray, 45%);
    }
  }
}
</style>
