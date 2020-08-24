<template>
  <div class="logintest">
    <h4 class="test-page">this is Login-test page.</h4>
    <p class="is-login">login-status: {{ loginStatus }}</p>
    <p class="uid">uid: {{ returnUid }}</p>
    <p class="uid">user data: {{ returnUserData }}</p>
    <div class="btn-box">
      <button type="button" class="mail-login" @click="mailLogin">
        mail login
      </button>
      <button type="button" class="google-login" @click="googleLogin">
        google login
      </button>
    </div>
    <router-link to="/">home</router-link>
  </div>
</template>

<script>
export default {
  computed: {
    loginStatus() {
      const user = this.$store.state.user;
      return user.isAlreadyLogin;
    },
    returnUid() {
      const user = this.$store.state.user;
      return user.uid;
    },
    returnUserData() {
      const user = this.$store.state.user;
      return user.userData;
    }
  },
  mounted () {
    this.$store.dispatch('user/checkLogin');
  },
  methods: {
    mailLogin() {
      alert('mail login');
    },
    googleLogin() {
      alert('google login');
    }
  }
}
</script>

<style lang="scss" scoped>
.logintest {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
  .test-page {
    margin: 5px 0;
  }
  .is-login {
    margin: 5px 0;
  }
  button {
    border: none;
    border-radius: 100px;
    padding: 10px 20px;
    margin: 10px 0;
  }
}
</style>
