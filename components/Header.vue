<template>
  <div class="header conatiner" :style="{ background: background }">
    <div @click="moveTo('/')">
      <p class="geo-hoop" :style="{ color: geoHoop }">geoHoop</p>
    </div>
    <div class="right-box">
      <p
        v-if="!isAlreadyLogin"
        class="not-login"
        @click="isLoginformOpen = true"
        :style="{ color: geoHoop }"
      >
        Login
      </p>
      <div
        v-if="isAlreadyLogin"
        class="aleady-login"
        @click="moveTo('profile')"
      >
        <img v-if="!user.img" src="@/assets/img/avatar.png">
        <img v-if="user.img" :src="user.img">
      </div>
    </div>
    <div
      v-if="isLoginformOpen"
      class="form-window"
      @click.self="isLoginformOpen = !isLoginformOpen"
    >
      <form @submit.prevent="submitForm()">
        <div v-if="isLoginForm" class="input-place">
          <h3>ログイン</h3>
          <input v-model="loginEmail" type="email" placeholder="geo@hoop.com">
          <input v-model="loginPassword" type="password" placeholder="password">
          <div class="" @click="googleLogin()">
            <GoogleIcon />
          </div>
          <button type="submit" class="login-btn">ログイン</button>
          <p>
            新規ユーザは<span @click="isLoginForm = false">こちら</span>
          </p>
          <p v-if="isError" class="error">{{ error }}</p>
        </div>
        <div v-if="!isLoginForm" class="input-place">
          <h3>アカウント作成</h3>
          <input v-model="email" type="email" placeholder="new@hoop.com">
          <input v-model="password" type="password" placeholder="your password">
          <div class="" @click="googleLogin()">
            <GoogleIcon />
          </div>
          <button type="submit" class="create-btn">アカウント作成</button>
          <p>
            ログインは<span @click="isLoginForm = true">こちら</span>
          </p>
          <p v-if="isError" class="error">{{ error }}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import GoogleIcon from '@/assets/icons/GoogleIcon';
const auth = firebase.auth();

export default {
  components: { GoogleIcon },
  props: {
    geoHoop: {
      type: String,
      required: false,
      default: '#eee'
    },
    background: {
      type: String,
      required: false,
      default: 'transparent'
    }
  },
  data() {
    return {
      isAlreadyLogin: false,
      isLoginformOpen: false,
      isLoginForm: true,
      isError: false,
      user: {
        uid: '',
        name: '',
        img: '',
        email: '',
        isGoogleLogin: false
      },
      loginEmail: '',
      loginPassword: '',
      email: '',
      password: ''
    };
  },
  async mounted () {
    await auth.onAuthStateChanged((user) => {
      if (user) {
        this.isAlreadyLogin = true;
        this.user = {
          uid: user.uid,
          name: user.displayName,
          img: user.photoURL,
          email: user.email,
          isGoogleLogin: false
        }
      } else {
        this.isAlreadyLogin = false;
      }
    });
  },
  methods: {
    moveTo(to) {
      this.$router.push(to);
    },
    submitForm() {
      if (!this.isLoginForm && !this.isAlreadyLogin) {
        this.registerUser();
      }
      if (this.isLoginForm && !this.isAlreadyLogin) {
        this.loginUser();
      }
    },
    registerUser() {
      auth.createUserWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        firebase.firestore().collection('users').doc(user.user.uid).set({
          name: '',
          img: '',
          uid: user.user.uid,
          email: this.email,
          bookmarks: [],
          createdAt: new Date(),
          modifiedAt: new Date(),
          isGoogleLogin: false
        }).then(() => {
          console.log('success to create new user!');
          this.isLoginformOpen = false;
        }).catch((error) => {
          this.error = error.code;
        })
      })
      .catch((error) => {
        this.isError = true;
        this.error = error.code;
      });
    },
    loginUser() {
      auth.signInWithEmailAndPassword(this.loginEmail, this.loginPassword)
      .then(() => {
        console.log('success to login!');
        this.isLoginformOpen = false;
      })
      .catch((error) => {
        this.isError = true;
        this.error = error.code;
      });
    },
    logoutUser() {
      auth.signOut();
    },
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider).then(user => {
        firebase.firestore().collection('users').doc(user.user.uid).set({
          name: user.user.displayName,
          img: user.user.photoURL,
          uid: user.user.uid,
          email: user.user.email,
          createdAt: new Date(),
          modifiedAt: new Date(),
          bookmarks: [],
          isGoogleLogin: true
        });
        this.user = {
          name: user.user.displayName,
          img: user.user.photoURL,
          uid: user.user.uid,
          email: user.user.email,
          isGoogleLogin: true
        };
        this.isLoginformOpen = false;
        console.log(this.user);
      }).catch(error => {
        this.isError = true;
        this.error = error.message;
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 45px;
  background: transparent;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  z-index: 1000;
  .geo-hoop {
    color: #eee;
    margin: 0 0 0 20px;
    transition: 200ms;
    &:hover { cursor: pointer; }
  }
  .right-box {
    margin-right: 20px;
    .not-login {
      color: #fff;
      transition: 200ms;
      &:hover {
        cursor: pointer;
        transform: scale(1.1);
      }
    }
    .aleady-login {
      transition: 200ms;
      &:hover {
        cursor: pointer;
        transform: scale(1.1);
      }
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
    }
  }
  .form-window {
    background: rgba(#000, 0.3);
    width: 100%;
    height: 300px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    form {
      background: #fefefe;
      width: 95%;
      max-width: 400px;
      height: 280px;
      border-radius: 10px;
      z-index: 101;
      margin: 10px auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px;
      h3 {
        color: #262626;
        font-size: 24px;
      }
      .input-place {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin: auto 0;
        input {
          color: #262626;
          background: #eee;
          border: none;
          border-radius: 5px;
          padding: 5px 10px;
          margin: 5px 0;
          width: 90%;
          &:focus { outline: none; }
        }
       button {
         color: #fff;
         padding: 5px 18px;
         margin-top: 10px;
         border: none;
         border-radius: 100px;
         transition: 200ms;
         &:hover {
           cursor: pointer;
           transform: scale(1.1);
         }
         &:focus { outline: none; }
       }
       .login-btn { background: #323232; }
       .create-btn { background: #00b5cc; }
       p {
         font-size: 12px;
         margin: 10px 0 0;
         span {
           transition: 200ms;
           &:hover {
             cursor: pointer;
             border-bottom: 1px solid #333;
           }
         }
       }
       .error {
         color: red;
         margin: 0;
       }
      }
    }
  }
}
</style>
