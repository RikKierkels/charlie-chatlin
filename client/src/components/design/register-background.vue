<template>
  <div class="background-circles">
    <div class="circle two" />

    <div class="circle one" />
    <div class="circle three" />
    <!-- <stair class="stair one" />
    <stair class="stair two" />

    <stair class="stair three" />

    <smile class="smile one" />
    <smile class="smile two" />-->
  </div>
</template>

<script>
//import Stair from '@/components/design/stair';
//import Smile from '@/components/design/smile';

export default {
  name: 'BackgroundCircle',
  components: {
    //Stair
    //Smile
  },
  props: {
    size: {
      type: Number,
      required: true
    },
    x: {
      type: Number,
      required: false
    },
    y: {
      type: Number,
      required: false
    }
  },
  computed: {
    style() {
      let result = `width: ${this.size}px; height: ${this.size}px;`;
      if (this.x) result += ` left: ${this.x}px;`;
      if (this.y) result += ` top: ${this.y}px;`;
      return result;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.smile {
  position: absolute;
  fill: none;
  stroke-width: 20px;
  stroke-linecap: round;

  stroke: dodgerblue;

  &.one {
    width: 550px;
    height: 550px;
    left: -540px;
    top: -170px;

    stroke: $bluewood;
  }

  &.two {
    width: 600px;
    height: 600px;
    left: -200px;
    top: 100px;

    stroke: $spindle;
    transform: rotate(180deg);
  }
}
.stair {
  position: absolute;
  fill: none;

  &.one {
    stroke: $electric-violet;
    stroke-width: 4px;
    left: -20px;
    top: -100px;
  }
  &.two {
    stroke: $bluewood;
    left: 200px;
    top: -250px;
    width: 200px;
    height: 200px;
    transform: rotate(270deg);
    stroke-width: 10px;
  }
  &.three {
    stroke: $electric-violet;
    left: -840px;
    top: -180px;
    width: 150px;
    height: 150px;
    transform: rotate(-226deg);
    stroke-width: 8px;
  }
}
.circle {
  display: block;
  background-color: $electric-violet;
  border-radius: 50%;
  position: absolute;

  &.one {
    width: 400px;
    height: 400px;
    background-color: $bluewood;
    top: -100px;
    left: -500px;
  }

  &.two {
    width: 800px;
    height: 800px;
    background-color: $spindle;
    top: -200px;
    left: -100px;
  }

  &.three {
    width: 0px;
    height: 0px;
    background-color: $spindle;
    top: 30px;
    left: 500px;
  }
}

.background-circles {
  z-index: -1;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>
