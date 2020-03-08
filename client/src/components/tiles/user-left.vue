<template>
  <div class="user-joined">
    <img :src="giphy" v-if="giphy" />

    <p>{{ message.text }}</p>
  </div>
</template>

<script>
import Giphy from '@/utils/giphy';
import get from 'lodash/get';

export default {
  name: 'UserLeftTile',
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      giphy: null
    };
  },
  beforeMount() {
    /* to-do: masonry is dismounting components, store message */
    if (this.giphy == null) {
      Giphy.getSadGiphy().then(response => {
        this.giphy = get(response, 'data.data.images.downsized_medium.url');
      });
    }
  }
};
</script>

<style scoped lang="scss">
.user-joined {
  position: relative;
  width: 100%;
  text-align: center;

  img {
    width: 150%;
    height: 100%;
    max-width: 150%;
    top: 0px;
    left: 0px;
  }

  p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    color: white;
    font-weight: 700;
    line-height: 1.3em;
    font-size: 1.2em;
    text-shadow: 0px 2px 7px rgba(0, 0, 0, 0.3), 0px 0px 2px rgba(0, 0, 0, 0.2);
  }
}
</style>
