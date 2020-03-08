<template>
  <masonry :cols="cols" :gutter="gutter" style="width: 100%;">
    <div class="logo tile">
      <img src="img/mediaan-logo.png" />
    </div>

    <div class="name tile">
      <h1>Charlie Chatlin</h1>
    </div>

    <div class="welcome tile">
      <p>Welcome to the Mediaan Masterclass 2020!</p>
    </div>

    <div class="username tile">
      <p>Choose your avatar, register a username and enter the chatroom.</p>
    </div>

    <avatar-select-item
      v-for="(a, i) in avatars"
      :key="i"
      :avatar="a"
      @select="handleSelect(a)"
      :selected="isSelected(a)"
      class="tile"
    />

    <div class="username-input tile">
      <form :submit="handleRegister">
        <input type="text" v-model="username" placeholder="Your Username" />

        <button @click="handleRegister">
          <font-awesome-icon :icon="['fas', 'door-open']" />
        </button>
      </form>
    </div>
  </masonry>
</template>

<script>
import Chat from '@/utils/chat';
import Avatars from '@/constants/avatars';
import AvatarSelectItem from '@/components/register/avatar-select-item';

export default {
  name: 'AvatarSelect',
  components: {
    AvatarSelectItem
  },
  data() {
    return {
      avatars: Avatars,
      cols: {
        default: 12,
        4000: 11,
        3600: 10,
        3200: 9,
        2800: 8,
        2400: 7,
        2000: 6,
        1700: 5,
        1400: 4,
        1100: 3,
        800: 2,
        500: 1
      },
      gutter: { default: '20px' },

      avatar: null,
      username: null
    };
  },
  methods: {
    handleSelect(avatar) {
      this.avatar = avatar;
    },
    isSelected(a) {
      if (this.avatar != null) {
        return this.avatar.id === a.id;
      } else {
        return false;
      }
    },
    handleRegister(e) {
      e.preventDefault();

      if (this.isAbleToRegister) {
        Chat.register(this.username, this.avatar);
      }
    }
  },
  computed: {
    isAbleToRegister() {
      return (
        this.avatar != null && this.username != null && this.username.length > 0
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/index';

.tile {
  margin-bottom: 20px;
  box-sizing: border-box;
  border-radius: 10px;
  overflow: hidden;
}

.logo {
  background-color: darken($blue, 10%);
  padding: 30px;

  img {
    width: 100%;
  }
}

.name {
  background-color: $red;
  padding: 30px;
  text-align: center;

  h1 {
    color: white;
    font-size: 2.7em;
    font-weight: 700;
    line-height: 1.2em;
  }
}

.welcome {
  background-color: $cyan;
  padding: 30px;

  p {
    color: $blue;
    font-size: 1.3em;
    line-height: 1.1em;
    font-weight: 500;
  }
}

.username {
  background-color: $blue;
  padding: 30px;
  p {
    font-size: 1.3em;
    color: $cyan;
    line-height: 1.3em;
    font-weight: 500;
  }
}

.username-input {
  background-color: $lima;
  color: white;
  padding: 30px;

  input {
    width: 100%;
    background-color: $lima;
    color: white;
    font-size: 1.3em;
    font-family: 'Fira Sans';
    outline: none;
    border: 0;
    overflow: auto;
    resize: none;
    margin-bottom: 20px;

    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
  }

  button {
    float: right;
    border: 0;
    background-color: lighten($lima, 12%);
    width: 80px;
    height: 80px;
    border-radius: 50%;
    color: white;
    font-size: 1.2em;
    cursor: pointer;

    svg {
      position: relative;
      left: -2px;

      color: white;
    }
  }
}
</style>
