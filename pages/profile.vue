<template>
  <div class="profile container">
    <header>
      <p class="geo-hoop" @click="moveTo()">geoHoop</p>
    </header>
    <div class="basic-info">
      <img v-if="userData.img" class="profile-img" :src="userData.img">
      <img v-if="!userData.img" class="profile-img" src="@/assets/img/avatar.png">
      <h2 class="user-name">{{ userData.name }}</h2>
      <p class="user-email">{{ userData.email }}</p>
    </div>
    <SwitchBar
      :is-bookmark-selected="isBookmarkSelected"
      @changeStatus="changeStatus"
    />
    <div v-if="isBookmarkSelected" class="your-bookmarks">
      <div v-if="!userData.bookmarks" class="no-bookmarks">
        <p>まだブックマークがありません</p>
      </div>
      <div v-else>
        <div v-for="(item, idx) in userData.bookmarks" :key="idx">
          {{ item }}
        </div>
      </div>
      <p class="sign-out" @click="logoutUser()">サインアウト</p>
    </div>
    <div v-if="!isBookmarkSelected" class="register-court">
      <p class="sentence">コートを登録しよう！</p>
      <form>
        <div class="insert-place court-name">
          <input v-model="court.name" type="text" placeholder="◯◯公園">
        </div>
        <div class="insert-place select-prefecture">
          <span :class="{ deletePlaceholder: court.prefecture !== null }">
            都道府県を選択
          </span>
          <select @change="getPrefecture($event.target.value)">
            <option value="" style="display: none;"></option>
            <option
              v-for="pre in prefectures"
              :key="pre.code"
              :value="pre.code"
              :selected="pre.isSelected"
            >
              {{ pre.name }}
            </option>
          </select>
        </div>
        <div class="insert-place select-city">
          <span :class="{ deletePlaceholder: court.city !== null }">
            地域を選択
          </span>
          <select @change="getCity($event.target.value)">
            <option
              v-for="city in cities"
              :key="city.id"
              :value="city.id"
            >
              {{ city.name }}
            </option>
          </select>
        </div>
        <div class="insert-place">
          <span :class="{ deletePlaceholder: court.howManyCourt !== null }">
            ゴールの数を選択
          </span>
          <select @change="getHowManyCourt($event.target.value)">
            <option value="" style="display: none;"></option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8+">8以上</option>
          </select>
        </div>
      </form>
      <button type="button" name="button" class="confirm-btn">登録する</button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import prefecturesjson from '@/assets/json/prefecture.json';
import cityjson from '@/assets/json/city.json';
const auth = firebase.auth();

export default {
  head() {
    return {
      title: 'プロフィール'
    }
  },
  data() {
    return {
      isBookmarkSelected: true,
      prefectures: [],
      cities: [],
      hasUserBookmarks: false,
      // about court
      court: {
        name: '',
        prefecture: null,
        city: null,
        howManyCourt: null,
        img: []
      }
    }
  },
  computed: {
    userData() {
      return this.$store.state.user.userData;
    }
  },
  mounted() {
    this.$store.dispatch('user/checkLogin');
    this.prefectures = prefecturesjson.prefectures;
    this.prefectures.map((v) => v.isSelected = false);
  },
  methods: {
    moveTo() {
      this.$router.push('/');
    },
    logoutUser() {
      auth.signOut();
      this.$router.push('/');
    },
    getPrefecture(code) {
      this.cities = cityjson.filter((v) => v.id === code)[0].cities;
      this.court.prefecture = this.prefectures.filter((v) => v.code === code)[0].name;
    },
    getCity(id) {
      this.court.city = this.cities.filter((v) => v.id === id)[0].name;
    },
    getHowManyCourt(num) {
      this.court.howManyCourt = num;
    },
    changeStatus(status) {
      this.isBookmarkSelected = (status === 'bookmarks') ? true : false;
    }
  }
}
</script>

<style lang="scss" scoped>
.profile {
  margin-bottom: 50px;
  header {
    height: 30px;
    .geo-hoop {
      color: #262626;
      width: 70px;
      text-align: center;
      margin: 10px 0 0 0;
      padding-bottom: 2px;
      transition: 200ms;
      &:hover {
        cursor: pointer;
        border-bottom: 1px solid #262626;
      }
    }
  }
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
  .your-bookmarks {
    display: flex;
    flex-direction: column;
    align-items: center;
    .no-bookmarks {
      margin: 40px 0;
      p {
        color: #aaa;
        font-size: 1em;
        margin: 0;
      }
    }
    .sign-out {
      color: #aaa;
      font-size: 12px;
      transition: 200ms;
      text-align: center;
      &:hover { cursor: pointer; }
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
        margin: 5px 0 10px;
        &:focus { outline: none; }
      }
      input {
        @include defaultInput();
      }
      select {
        @include defaultInput();
        -webkit-appearance: none;
        -moz-appearance: none;
        text-indent: 1px;
        text-overflow: '';
      }
      .insert-place {
        display: flex;
        flex-direction: column;
        position: relative;
        span {
          color: #757575;
          position: absolute;
          top: 13px;
          left: 13px;
          z-index: 100;
        }
        .deletePlaceholder { display: none; }
      }
    }
    .confirm-btn {
      color: #262626;
      background: transparent;
      border: 1px solid #262626;
      border-radius: 100px;
      padding: 5px 18px;
      &:focus { outline: none; }
    }
  }
}
</style>
