<template>
  <div
    class="item"
    @click="handleSelect"
    :style="getBackgroundImage()"
    :class="{
      'selected': avatar.isSelected,
      'not-available': !avatar.isAvailable
    }"
  >
    <div class="check-icon-container" :class="{ selected: avatar.isSelected }">
      <font-awesome-icon class="icon" :icon="['fas', 'check']" />
    </div>

    <div class="overlay"></div>
    <p>{{ avatar.username }}</p>
  </div>
</template>

<script>
/* TO-DO:
  some serious huge refactor
  */
import Actions from '@/constants/actions';

export default {
  name: 'SelectAvatarItem',
  props: {
    avatar: {
      type: Object,
      required: true
    }
  },
  methods: {
    getBackgroundImage() {
      return `background-image: url(${this.avatar.image})`;
    },
    handleSelect() {
      if (this.avatar.isAvailable) {
        this.$store.dispatch(Actions.SELECT_AVATAR, this.avatar);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.item {
  position: relative;
  background-color: lighten($bluewood, 50%);

  background-position: center;
  background-size: cover;
  background-blend-mode: luminosity;

  border-radius: 5px;
  text-align: center;
  height: 200px;
  box-sizing: border-box;
  overflow: hidden;

  cursor: pointer;

  border: 0px solid darken($lima, 10%);
  box-shadow: 0px 0px 0px 0px $lima;

  transition: all 400ms cubic-bezier(0.2, 0.81, 0.4, 0.85);

  p {
    position: absolute;
    bottom: 0px;
    padding: 20px;
    color: $spindle;
    font-weight: 600;
    line-height: 1.6em;
    transition: all 200ms cubic-bezier(0.2, 0.81, 0.4, 0.85);
    font-size: 0.9em;

    opacity: 1;
  }

  &.not-available {
    opacity: 0.5;
    transform: scale(0.8);
  }

  .check-icon-container {
    position: absolute;
    z-index: 4;
    left: 50%;
    transform: translateX(-50%);
    bottom: 20px;
    border-radius: 50%;
    width: 0px;
    height: 0px;
    background-color: $lima;
    transition: all 200ms cubic-bezier(0.05, 1, 0.41, 1);
    overflow: hidden;

    .icon {
      color: white;
      margin: 0 auto;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      font-size: 1.5em;
    }
  }

  .overlay {
    overflow: hidden;
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0px;
    left: 0px;
    transition: all 400ms cubic-bezier(0.2, 0.81, 0.4, 0.85);
    background-color: $electric-violet;
    background-color: cyan;
    background-color: $bluewood;
    background: linear-gradient(
      0deg,
      rgb(16, 24, 31) 0%,
      rgba(253, 187, 45, 0) 80%
    );
    border-radius: 5px;
    opacity: 1;
  }

  &:hover {
    transform: scale(1.05);
    .overlay {
      width: 100%;
      opacity: 0.4;
    }

    p {
      opacity: 1;
      color: white;
      bottom: -20px;
      opacity: 0;
    }
  }

  &.selected {
    background-blend-mode: unset;

    .overlay {
      opacity: 1;
      background: linear-gradient(0deg, $lima 0%, rgba(253, 187, 45, 0) 80%);
    }

    p {
      opacity: 0;
      bottom: -20px;
    }

    .check-icon-container {
      width: 50px;
      height: 50px;

      bottom: 30px;
      box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.2), 0px 1px 3px rgba(0, 0, 0, 0.2);
      z-index: 4;
    }
  }
}
</style>
