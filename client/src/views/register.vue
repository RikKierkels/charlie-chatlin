<template>
  <div class="register">
    <avatar-select v-model="avatar" />
  </div>
</template>

<script>
import Chat from '@/utils/chat';
import AvatarSelect from '@/components/register/avatar-select';

export default {
  name: 'Register',
  components: {
    AvatarSelect
  },

  computed: {
    isAbleToRegister() {
      return (
        this.avatar != null && this.username != null && this.username.length > 0
      );
    }
  },
  methods: {
    register() {
      if (this.isAbleToRegister) {
        Chat.register(this.username, this.avatar);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.register {
  position: relative;

  padding: 50px;
  box-sizing: border-box;
}

input {
  margin-right: 20px;
}

h1 {
  margin-bottom: 30px;
  color: $red;
  font-weight: 700;
  font-size: 2.5em;
}

p {
  color: $blue;
}
</style>
