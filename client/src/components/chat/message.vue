<template>
  <div class="message" v-if="message">
    <avatar small :avatarId="message.sender.avatarId" />
    <p style="margin: 0px 20px;">{{ message.text }}</p>
    <p>{{ message.sentOn }}</p>
  </div>
</template>

<script>
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
  }
};
</script>

<style lang="scss" scoped>
.message {
  display: flex;
  width: 100%;
}
</style>
