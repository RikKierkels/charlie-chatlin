<template>
  <div class="message-tile" :class="getClass()">
    <div class="user">
      <avatar small :avatar-id="message.sender.avatarId" />
      <div class="user-details">
        <p class="username">{{ message.sender.username }}</p>
        <p class="timestamp">{{ timestamp }}</p>
      </div>
    </div>

    <p class="text">{{ message.text }}</p>
  </div>
</template>

<script>
import Avatar from '@/components/avatar';
import { format } from 'timeago.js';

export default {
  components: {
    Avatar
  },
  name: 'MessageTile',
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  computed: {
    timestamp() {
      return format(this.message.sentOn);
    }
  },
  methods: {
    getClass() {
      let classes = ['default', 'default', 'one', 'two', 'two', 'three'];
      return classes[Math.floor(Math.random() * classes.length)];
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables';

.user-details {
  margin-left: 20px;
}

.user {
  display: flex;
  align-items: center;

  margin-bottom: 20px;
}

.username {
  font-size: 0.8em;
}

.timestamp {
  font-weight: 400;
  font-size: 0.7em;
}

.text {
  font-size: 1.3em;
  font-weight: 500;
  line-height: 1.2em;
}

.message-tile {
  padding: 30px;
  border-radius: 10px;
  width: 100%;

  &.default {
    background-color: lighten($dark, 10%);
    .username,
    .timestamp,
    .text {
      color: white;
    }
    .timestamp {
      opacity: 0.3;
    }
  }
  &.one {
    background-color: $red;
    .username,
    .text,
    .timestamp {
      color: white;
    }
    .timestamp {
      opacity: 0.6;
    }
  }

  &.two {
    background-color: $blue;
    .username,
    .text,
    .timestamp {
      color: $cyan;
    }
    .timestamp {
      opacity: 0.5;
    }
  }

  &.three {
    background-color: $cyan;
    .username,
    .text,
    .timestamp {
      color: $blue;
    }

    .timestamp {
      opacity: 0.8;
    }
  }

  &.four {
    background-color: $rose;
    .username,
    .text,
    .timestamp {
      color: white;
    }
    .timestamp {
      opacity: 0.3;
    }
  }
}
</style>
