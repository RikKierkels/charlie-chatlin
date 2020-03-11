<template>
  <div class="register">
    <avatar-select />
  </div>
</template>

<script>
import AvatarSelect from '@/components/register/avatar-select';

export default {
  name: 'Register',
  components: {
    AvatarSelect
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
