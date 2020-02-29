<template>
  <div class="avatar-select">
    <avatar-select-item
      v-for="(avatar, i) in avatars"
      :key="i"
      :avatar="avatar"
      @select="handleSelect(avatar)"
      :selected="isSelected(avatar)"
    />
  </div>
</template>

<script>
import Avatars from '@/constants/avatars';
import AvatarSelectItem from '@/components/register/avatar-select-item';

export default {
  name: 'AvatarSelect',
  components: {
    AvatarSelectItem
  },
  data() {
    return {
      avatars: Avatars
    };
  },
  props: {
    value: {
      type: Object,
      required: false
    }
  },
  methods: {
    handleSelect(avatar) {
      this.$emit('input', avatar);
    },
    isSelected(avatar) {
      if (this.value != null) {
        return this.value.id === avatar.id;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/index';

$avatar-select-item-width: 80px;
$avatar-select-item-height: 110px;

.avatar-select {
  position: relative;
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax($avatar-select-item-width, 1fr)
  );
  grid-gap: 1.1rem;

  margin-bottom: 50px;
}

.avatar-select-item {
  width: $avatar-select-item-width;
  height: $avatar-select-item-height;
}
</style>
