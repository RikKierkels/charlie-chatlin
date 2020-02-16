<template>
  <div class="message" v-if="message">
    <avatar small :avatarId="message.avatarId" />
    <p>{{ message.text }}</p>
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
