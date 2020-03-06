<template>
  <div
    class="avatar-select-item"
    :style="getBackgroundImage(avatar)"
    @click="handleSelect(avatar)"
    :class="{ selected }"
  />
</template>

<script>
export default {
  name: 'AvatarSelectItem',
  props: {
    avatar: {
      type: Object,
      required: true
    },
    selected: {
      type: Boolean,
      required: false
    }
  },
  methods: {
    getBackgroundImage(avatar) {
      return `background-image: url(img/avatars/${avatar.id}.png);`;
    },
    handleSelect() {
      this.$emit('select', this.avatar);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.avatar-select-item {
  display: inline-block;
  position: relative;
  box-sizing: border-box;

  border-radius: 5px;
  overflow: hidden;

  background-position: center;
  background-size: cover;

  background-blend-mode: luminosity;
  background-color: #1c2531;

  cursor: pointer;

  &:hover {
    background-blend-mode: normal;

    .overlay {
      opacity: 0;
    }
  }

  &.selected {
    background-blend-mode: unset;
    box-shadow: 0px 0px 0px 4px $lima;
  }
}
</style>
