<template>
  <Container class="register-container">
    <div class="select-avatar-container">
      <!-- <img src="/img/charlie.png" class="charlie-logo" /> -->
      <!--<register-background /> -->
      <!-- <h1>Select your avatar</h1> -->
      <select-avatar />
      <button :disabled="!isAbleToRegister" @click="handleRegister">
        Register and enter chatroom
      </button>
    </div>
  </Container>
</template>

<script>
import Chat from '@/utils/chat';
import Container from '@/components/container';
import SelectAvatar from '@/components/register/select-avatar';
//import RegisterBackground from '@/components/design/register-background.vue';

export default {
  name: 'Register',
  components: {
    SelectAvatar,
    Container
    //RegisterBackground
  },
  computed: {
    selectedAvatar() {
      return this.$store.getters.selectedAvatar;
    },
    isAbleToRegister() {
      return this.selectedAvatar != null;
    }
  },
  methods: {
    handleRegister() {
      Chat.register(this.selectedAvatar);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.charlie-logo {
  margin: 0 auto;
  text-align: center;
  width: 400px;
  position: relative;
  display: block;
  margin-bottom: 60px;
}

.register-container {
  padding: 60px 0px;
  height: 100%;

  /deep/ .__inner-container {
    height: 70vh;
    width: 100%;
  }

  .select-avatar-container {
    position: relative;
    display: block;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;

    h1 {
      margin-bottom: 40px;
      text-align: center;
    }

    button {
      padding: 15px 21px;
      background-color: $electric-violet;
      position: relative;
      border: 0;
      color: cyan;
      font-size: 2em;
      font-weight: 600;
      border-radius: 5px;
      margin-top: 20px;
      outline: 0;
      cursor: pointer;
      margin: 70px auto;
      text-align: center;
      display: block;

      &:disabled {
        opacity: 0.7;
      }
    }
  }
}
</style>
