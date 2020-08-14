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
    <div v-if="isBookmarkSelected" class="">
      <p class="sign-out" @click="logoutUser()">サインアウト</p>
    </div>
    <div v-if="!isBookmarkSelected" class="register-court">
      <p class="sentence">コートを登録しよう！</p>
      <form>
        <label>コートの名称</label>
        <input v-model="courtName" type="text" placeholder="代々木公園">
        <label>都道府県</label>
        <select @change="getPrefecture($event.target.value)">
          <option
            v-for="pre in prefectures"
            :key="pre.code"
            :value="pre.code"
            :selected="pre.isSelected"
          >
            {{ pre.name }}
          </option>
        </select>
        <label>地域</label>
        <select @change="getCity($event.target.value)">
          <option
            v-for="city in cities"
            :key="city.id"
            :value="city.id"
          >
            {{ city.name }}
          </option>
        </select>
        <label>ゴールの数</label>
        <select class="">
          <option value="">1</option>
          <option value="">2</option>
          <option value="">3</option>
          <option value="">4</option>
          <option value="">5</option>
          <option value="">6</option>
          <option value="">7</option>
          <option value="">8以上</option>
        </select>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import prefecturesjson from '@/assets/json/prefecture.json';
import cityjson from '@/assets/json/city.json';
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
      isBookmarkSelected: true,
      prefectures: [],
      cities: [],
      // about court
      courtName: ''
    }
  },
  mounted() {
    this.prefectures = prefecturesjson.prefectures;
    this.prefectures.map((v) => {
      if (v.code === '13') v.isSelected = true;
    });
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
    },
    getPrefecture(code) {
      console.log(code);
      this.cities = cityjson.filter((v) => v.id === code)[0].cities;
    },
    getCity(v) {
      console.log(v);
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
      width: 50%;
      height: 100%;
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
  .register-court {
    padding: 8px;
    text-align: center;
    .sentence { margin-bottom: 20px; }
    form {
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      width: 100%;
      max-width: 500px;
      label {
        font-size: 15px;
        text-align: left;
        margin: 0 0 0 5px;
      }
      @mixin defaultInput() {
        color: #262626;
        background: #f2f2f2;
        height: 40px;
        border: none;
        border-radius: 8px;
        padding: 5px 10px;
        margin: 5px 0 25px;
        &:focus { outline: none; }
      }
      input {
        @include defaultInput();
      }
      select {
        @include defaultInput();
      }
    }
  }
  .sign-out {
    color: #aaa;
    font-size: 12px;
    transition: 200ms;
    text-align: center;
    &:hover {
      border-bottom: 1px solid #aaa;
      cursor: pointer;
    }
  }
}
</style>
