<template>
  <div>
    <template v-if="message.sender">
      <div class="message">
        <avatar small :avatarId="message.sender.avatarId" />
        <div class="message-container">
          <p>
            <span class="username">{{ message.sender.username }}</span>
            <span class="timestamp">{{ formattedTimestamp }}</span>
          </p>
          <p class="text">{{ message.text }}</p>
        </div>
      </div>
    </template>

    <template v-else>
      <p class="text-alt">{{ message.text }}</p>
    </template>
  </div>
</template>

<script>
import { format } from 'timeago.js';
import Avatar from '@/components/avatar';

export default {
  name: 'Message',
  components: {
    Avatar
  },
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  mounted() {
    console.log('mounted message', this.message);
  },
  computed: {
    formattedTimestamp() {
      return format(this.message.sentOn, 'en-US');
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.message {
  display: flex;
  width: 100%;
  background-color: white;
  margin-bottom: 20px;
  width: calc(100% - 40px);

  padding: 10px 10px;
  border-radius: 5px;

  .message-container {
    margin-left: 20px;

    .username {
      font-weight: 600;
      margin-right: 10px;
      //font-size: 0.9em;
      color: $gray;
    }

    .timestamp {
      color: lighten($oxford, 30%);
    }

    .text {
      margin-top: 5px;
      font-weight: 500;
    }
  }
}

.text-alt {
  opacity: 0.5;
}
</style>
