<template>
  <container class="register">
    <h1>Charlie Chatlin</h1>
    <p>Welcome to the Mediaan Masterclass 2020!<br /></p>
    <p class="mb-5">Choose your avatar below and register a username.</p>

    <avatar-select v-model="avatar" />
    <input type="text" placeholder="username" v-model="username" />

    <button :disabled="!isAbleToRegister" @click="register">
      Register
    </button>
  </container>
</template>

<script>
import Chat from '@/utils/chat';
import Container from '@/components/container';
import AvatarSelect from '@/components/register/avatar-select';

export default {
  name: 'Register',
  components: {
    Container,
    AvatarSelect
  },
  data() {
    return {
      avatar: null,
      username: null
    };
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
  padding-top: 100px;
}

input {
  margin-right: 20px;
}

h1 {
  margin-bottom: 30px;
}
</style>
