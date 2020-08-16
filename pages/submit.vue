<template>
  <div class="court-form container">
    <p class="db-title">DB登録用フォーム</p>
    <form>
      <div class="insert-place court-name">
        <label>コートの名称</label>
        <input v-model="court.name" type="text" placeholder="◯◯公園">
      </div>
      <div class="insert-place select-prefecture">
        <label>都道府県</label>
        <span :class="{ deletePlaceholder: true }">都道府県を選択</span>
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
        <label>市町村区</label>
        <span :class="{ deletePlaceholder: true }">地域を選択</span>
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
        <label>ゴールの数</label>
        <span :class="{ deletePlaceholder: true }">ゴールの数を選択</span>
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
      <div class="insert-place">
        <label>緯度と経度</label>
        <div class="lat-lng">
          <input type="text" class="lat" />
          <input type="text" class="lng" />
        </div>
      </div>
      <div class="insert-place">
        <label>Goole MapsのURL</label>
        <input type="text" />
      </div>
      <div class="insert-place">
        <label>外用か中用か</label>
        <div class="inside-outside">
          <div class="">
            <span>外用</span>
            <input type="radio">
          </div>
          <div class="">
            <span>外用</span>
            <input type="radio">
          </div>
        </div>
      </div>
    </form>
    <button type="button" class="submit-db">DBに送る</button>
  </div>
</template>

<script>
import firebase from 'firebase';
import prefecturesjson from '@/assets/json/prefecture.json';
import cityjson from '@/assets/json/city.json';
const db = firebase.firestore();

export default {
  data() {
    return {
      prefectures: [],
      cities: [],
      court: {
        bookmarks: 0,
        city: '',
        geo: [],
        googleMapsUrl: '',
        id: '',
        img: [],
        isOutside: null,
        likes: 0,
        name: '',
        prefecture: '',
        howManyGoal: null,
      }
    }
  },
  watch: {
    court: {
      deep: true,
      handler: (court) => {
        console.log(court);
      }
    }
  },
  mounted() {
    this.prefectures = prefecturesjson.prefectures;
    this.prefectures.map((v) => v.isSelected = false);
  },
  methods: {
    getPrefecture(code) {
      this.cities = cityjson.filter((v) => v.id === code)[0].cities;
      this.court.prefecture = this.prefectures.filter((v) => v.code === code)[0].name;
    },
    getCity(id) {
      this.court.city = this.cities.filter((v) => v.id === id)[0].name;
    }
  }
}
</script>

<style lang="scss" scoped>
.court-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  .db-title {
    color: #262626;
    text-align: center;
    margin: 20px 0;
  }
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
      .lat-lng {
        display: flex;
        flex-direction: row;
        justify-content: center;
        input { width: 50%; }
        .lat { margin: 5px 5px 5px 0; }
        .lng { margin: 5px 0 5px 5px; }
      }
      .inside-outside {
        display: flex;
        flex-direction: row;
        width: 50%;
      }
    }
  }
  .submit-db {
    color: #262626;
    background: transparent;
    padding: 5px 18px;
    border: 1px solid #262626;
    border-radius: 100px;
    width: 180px;
    margin: 30px auto;
  }
}
</style>
