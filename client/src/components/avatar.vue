<template>
  <div
    class="avatar"
    :class="{ large: large, medium: medium, small: small }"
    :style="getBackgroundImage()"
  />
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
  methods: {
    getBackgroundImage() {
      return `background-image: url(img/avatars/${this.avatarId}.png);`;
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
  border-radius: 5px;
  border-radius: 50%;
  overflow: hidden;

  img {
    position: relative;
    width: 120%;
    height: 120%;
    top: -10px;
  }

  background-size: cover;
  background-position: center;

  &.large {
    width: 100px;
    height: 100px;
  }

  &.medium {
    width: 62px;
    height: 62px;
  }

  &.small {
    width: 50px;
    height: 50px;
  }
}
</style>
