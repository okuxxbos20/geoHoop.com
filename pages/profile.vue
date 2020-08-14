<template>
  <div class="profile">
    <header>
      <p>this is header.</p>
    </header>
    <div class="basic-info">
      <img v-if="user.img" class="profile-img" :src="user.img">
      <img v-if="!user.img" class="profile-img" src="@/assets/img/avatar.png">
      <h2 class="user-name">{{ user.name }}</h2>
      <p class="user-email">{{ user.email }}</p>
    </div>
    <div class="switch">
      <div
        class="bookamrks"
        :class="{ selected: isBookmarkSelected }"
        @click="isBookmarkSelected = true"
      >
        <code>ブックマーク</code>
      </div>
      <div
        class="register"
        :class="{ selected: !isBookmarkSelected }"
        @click="isBookmarkSelected = false"
      >
        <code>コートを登録</code>
      </div>
    </div>
    <p class="sign-out" @click="logoutUser()">サインアウト</p>
  </div>
</template>

<script>
import firebase from 'firebase';
const auth = firebase.auth();
const db = firebase.firestore();

export default {
  async created() {
    await auth.onAuthStateChanged((user) => {
      const provider = user.providerData[0].providerId;
      if (user) {
        if (provider === 'google.com') {
          console.log('google');
          this.lookUpId = user.uid;
          this.getUser(this.lookUpId);
        } else {
          console.log('mail');
          this.lookUpId = user.uid;
          this.getUser(this.lookUpId);
        }
      } else {
        this.id = 'please log in...';
      }
    });
  },
  data() {
    return {
      lookUpId: '',
      user: '',
      isBookmarkSelected: true
    }
  },
  methods: {
    getUser(id) {
      db.collection('users').doc(id).get().then(user => {
        this.user = user.data();
        console.log(this.user);
      })
      .catch(error => {
        console.log(error);
      });
    },
    logoutUser() {
      auth.signOut();
      this.$router.push('/');
    }
  }
}
</script>

<style lang="scss" scoped>
.profile {
  .basic-info {
    color: #262626;
    display: flex;
    flex-direction: column;
    align-items: center;
    .profile-img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    .user-name {
      margin: 0;
      font-weight: 300;
    }
    .user-email {
      color: #aaa;
      margin: 0;
    }
  }
  .switch {
    width: 95%;
    max-width: 350px;
    height: 40px;
    border: 1px solid #262626;
    border-radius: 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 15px auto;
    code {
      color: #262626;
      margin: 0;
    }
    @mixin selector($tl: 0px, $tr: 0px, $br: 0px, $bl: 0px) {
      width: calc(50%);
      height: calc(100%);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      border-top-left-radius: $tl;
      border-top-right-radius: $tr;
      border-bottom-right-radius: $br;
      border-bottom-left-radius: $bl;
      &:hover { cursor: pointer; }
    }
    .bookamrks {
      @include selector(10px, 0px, 0px, 10px);
    }
    .register {
      @include selector(0px, 10px, 10px, 0px);
    }
    .selected {
      code { color: #eee; }
      background: #333;
    }
  }
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
