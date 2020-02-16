<template>
  <div
    class="avatar"
    v-if="avatar"
    :class="{ large: large, medium: medium, small: small }"
  >
    <img :src="avatar.image" />
  </div>
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    avatarId: {
      type: String,
      required: true
    },
    large: {
      type: Boolean,
      required: false
    },
    medium: {
      type: Boolean,
      required: false
    },
    small: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    avatar() {
      return this.$store.getters.avatars.find(a => a.id === this.avatarId);
    }
  }
};
</script>

<style lang="scss" scoped>
.avatar {
  display: block;
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 120%;
  }

  &.large {
    width: 200px;
    height: 200px;
  }

  &.medium {
    width: 100px;
    height: 100px;
  }

  &.small {
    width: 65px;
    height: 65px;
  }
}
</style>
