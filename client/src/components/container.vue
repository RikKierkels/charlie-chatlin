<template>
  <section class="__container">
    <div class="__inner-container">
      <slot name="default" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'container',
  props: {},
  computed: {}
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/index';

.__container {
  width: 100%;

  .__inner-container {
    position: relative;
    margin: 0 auto;

    @media only screen and (max-width: $breakpoint-xs) {
      max-width: 300px;
    }

    @media only screen and (min-width: $breakpoint-xs) and (max-width: $breakpoint-s) {
      max-width: 320px;
    }

    @media only screen and (min-width: $breakpoint-s) and (max-width: $breakpoint-m) {
      max-width: 420px;
    }

    @media only screen and (min-width: $breakpoint-m) and (max-width: $breakpoint-lg) {
      max-width: 600px;
    }

    @media only screen and (min-width: $breakpoint-lg) {
      max-width: 1425px;
      padding: 0 90px;
    }
  }
}
</style>
