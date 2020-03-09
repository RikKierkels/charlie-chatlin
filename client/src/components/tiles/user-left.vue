<template>
  <div class="user-left">
    <p>{{ message.text }}</p>
  </div>
</template>

<script>
export default {
  name: 'UserLeftTile',
  props: {
    message: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables';

.user-left {
  position: relative;
  width: 100%;
  text-align: center;
  background-color: darken($blue, 21%);
  padding: 30px;

  p {
    position: relative;
    z-index: 1;
    color: white;
    color: lighten($blue, 5%);

    font-weight: 500;
    line-height: 1.3em;
    font-size: 1em;
  }
}
</style>
