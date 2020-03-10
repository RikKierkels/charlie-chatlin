<template>
  <div class="user-joined" v-if="giphy">
    <img :src="giphy" />

    <p>{{ message.text }}</p>
  </div>
</template>

<script>
import Giphy from '@/utils/giphy';
import get from 'lodash/get';

export default {
  name: 'UserJoinedTile',
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
    if (this.giphy == null) {
      Giphy.getGiphyWithTag('applause').then(response => {
        this.giphy = get(response, 'data.data.images.downsized_medium.url');
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables';

.user-joined {
  position: relative;
  width: 100%;
  text-align: center;

  background-color: $blue;

  img {
    width: 150%;
    height: 100%;
    max-width: 150%;
    top: 0px;
    left: 0px;
    margin-bottom: -10px;
    margin-top: -10px;
    margin-left: -4px;
    min-height: 200px;
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
