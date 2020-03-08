<template>
  <div
    class="avatar-select-item"
    :style="style"
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
    handleSelect() {
      this.$emit('select', this.avatar);
    }
  },
  computed: {
    height() {
      return 200 + Math.random() * 50;
    },
    style() {
      return `background-image: url(img/avatars/${this.avatar.id}.png); height: ${this.height}px;`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.avatar-select-item {
  position: relative;
  box-sizing: border-box;
  overflow: hidden;

  background-position: center;
  background-size: 130%;

  background-blend-mode: overlay;
  background-color: $blue;

  cursor: pointer;

  width: 100%;
  height: 200px;

  transition: all 100ms ease-in-out;

  &:hover {
    background-blend-mode: normal;

    &.selected {
      background-color: $lima;
      background-blend-mode: overlay;
    }
  }

  &.selected {
    background-color: $lima;
  }
}
</style>
