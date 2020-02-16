<template>
  <div class="avatar-list">
    <select-avatar-item
      v-for="(a, i) in avatars"
      :key="`av-${i}`"
      :avatar="a"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SelectAvatarItem from '@/components/register/select-avatar-item';

export default {
  name: 'SelectAvatar',
  components: {
    SelectAvatarItem
  },
  props: {
    selectAvatar: {
      type: Object,
      required: false
    }
  },
  computed: {
    ...mapGetters(['avatars'])
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/index';

.avatar-list {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  grid-gap: 1.5rem;
}
</style>
