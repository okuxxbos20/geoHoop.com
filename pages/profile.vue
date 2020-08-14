<template>
  <div class="profile">
    <p>this is profile</p>
    <p>id : {{ id }}</p>
    <p class="sign-out" @click="logoutUser()">サインアウト</p>
  </div>
</template>

<script>
import firebase from 'firebase';
const auth = firebase.auth();

export default {
  created() {
    const id = this.$route.query.id;
    this.id = id;
  },
  data() {
    return {
      id: ''
    }
  },
  methods: {
    logoutUser() {
      auth.signOut();
      this.$router.push('/');
    }
  }
}
</script>

<style lang="scss" scoped>
.profile {
  .sign-out {
    color: #aaa;
    font-size: 12px;
    transition: 200ms;
    &:hover {
      border-bottom: 1px solid #aaa;
      cursor: pointer;
    }
  }
}
</style>
