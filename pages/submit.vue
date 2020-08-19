<template>
  <div class="court-form container">
    <header>
      <p class="geo-hoop" @click="moveTo('/')">geoHoop</p>
    </header>
    <form @submit.prevent="submitData()">
      <p class="db-title">DB登録用フォーム</p>
      <!-- コートの名称 -->
      <div class="insert-place court-name">
        <label :class="{ error: error.name !== 'コートの名称' }">
          {{ error.name }}
        </label>
        <input v-model="court.name" type="text" placeholder="◯◯公園" autofocus>
      </div>
      <!-- 都道府県 -->
      <div class="insert-place select-prefecture">
        <label :class="{ error: error.prefecture !== '都道府県' }">
          {{ error.prefecture }}
        </label>
        <span
          :class="{ deletePlaceholder: court.prefecture !== null }"
        >
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
      <!-- 市町村区 -->
      <div class="insert-place select-city">
        <label :class="{ error: error.city !== '市町村区' }">
          {{ error.city }}
        </label>
        <span
          :class="{ deletePlaceholder: court.city !== null }"
        >
          市町村区を選択
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
      <!-- 連絡先 -->
      <div class="insert-place">
        <label :class="{ error: error.tel !== '連絡先' }">
          {{ error.tel }}
        </label>
        <input v-model="court.tel" type="text" placeholder="09012345678">
      </div>
      <!-- ゴールの数 -->
      <div class="insert-place">
        <label :class="{ error: error.howManyGoal !== 'ゴールの数' }">
          {{ error.howManyGoal }}
        </label>
        <span
          :class="{ deletePlaceholder: court.howManyGoal !== null }"
        >
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
      <!-- 緯度と経度 -->
      <!-- <div class="insert-place">
        <label :class="{ error: error.geo !== '緯度と経度' }">
          {{ error.geo }}
        </label>
        <div class="lat-lng">
          <input
            v-model.number="court.geo.df"
            type="number"
            class="lat"
            placeholder="緯度"
          />
          <input
            v-model.number="court.geo.ff"
            type="number"
            class="lng"
            placeholder="経度"
          />
        </div>
      </div> -->
      <!-- 地図情報 -->
      <div class="insert-place">
        <label :class="{ error: error.embedSrc !== 'htmlのsrc=の箇所' }">
          {{ error.embedSrc }}
        </label>
        <span
          :class="{ deletePlaceholder: court.embedSrc !== null }"
        >
          https://www.google.com/...
        </span>
        <input v-model="court.embedSrc" type="text" />
      </div>
      <!-- GoogleMapsのURL -->
      <div class="insert-place">
        <label :class="{ error: error.googleMapsUrl !== 'GooleMapsのURL' }">
          {{ error.googleMapsUrl }}
        </label>
        <span
          :class="{ deletePlaceholder: court.googleMapsUrl !== '' }"
        >
          https://www.google.com/...
        </span>
        <input v-model="court.googleMapsUrl" type="text" />
      </div>
      <!-- 屋内か屋外か -->
      <div class="insert-place">
        <label :class="{ error: error.isOutside !== '屋外か屋内か' }">
          {{ error.isOutside }}
        </label>
        <div class="inside-outside">
          <div class="item">
            <input
              v-model="court.isOutside"
              type="radio"
              value="true"
            >
            <label>屋外</label>
          </div>
          <div class="item">
            <input
              v-model="court.isOutside"
              type="radio"
              value="false"
            >
            <label>屋内</label>
          </div>
        </div>
      </div>
      <!-- 参考URL -->
      <div class="insert-place">
        <label :class="{ error: error.refUrl !== '参考URL' }">
          {{ error.refUrl }}
        </label>
        <span
          :class="{ deletePlaceholder: court.refUrl !== null }"
        >
          https://...
        </span>
        <input v-model="court.refUrl" type="text" />
      </div>
      <button
        type="submit"
        class="submit-db"
        :class="{ isAbleToSubmit: isAbleToSubmit }"
      >
        DBに送る
      </button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase';
import prefecturesjson from '@/assets/json/prefecture.json';
import cityjson from '@/assets/json/city.json';
const db = firebase.firestore();

export default {
  head() {
    return {
      title: 'form'
    }
  },
  data() {
    return {
      prefectures: [],
      cities: [],
      court: {
        bookmarks: 0,
        city: null,
        embedSrc: null,
        geo: { df: '', ff: '' },
        googleMapsUrl: '',
        howManyGoal: null,
        id: null,
        img: [],
        isOutside: null,
        likes: 0,
        name: null,
        prefecture: null,
        refUrl: null,
        tel: null
      },
      error: {
        name: 'コートの名称',
        prefecture: '都道府県',
        city: '市町村区',
        geo: '緯度と経度',
        howManyGoal: 'ゴールの数',
        embedSrc: 'htmlのsrc=の箇所',
        googleMapsUrl: 'GooleMapsのURL',
        isOutside: '屋外か屋内か',
        refUrl: '参考URL',
        tel: '連絡先'
      },
      isAbleToSubmit: false
      // 全てのバリデーションをパスしたらtrueにする
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
    moveTo(to) {
      this.$router.push(to);
    },
    getPrefecture(code) {
      this.cities = cityjson.filter((v) => v.id === code)[0].cities;
      this.court.prefecture = this.prefectures.filter((v) => v.code === code)[0].name;
    },
    getCity(id) {
      this.court.city = this.cities.filter((v) => v.id === id)[0].name;
    },
    getHowManyCourt(num) {
      this.court.howManyGoal = num;
    },
    submitData() {
      this.error.name = this.court.name === '' ? '*コート名を入力してください' : 'コートの名称';
      this.error.prefecture = this.court.prefecture === null ? '*都道府県を選択してください' : '都道府県';
      this.error.city = this.court.city === null ? '*市町村区を選択してください' : '市町村区';
      this.error.howManyGoal = this.court.howManyGoal === null ? '*ゴールの数を選択してください' : 'ゴールの数';

      if (this.court.geo.df === '' && this.court.geo.ff === '') {
        this.error.geo = '緯度と経度を入力してください';
      } else if (this.court.geo.df === '' && this.court.geo.ff !== '') {
        this.error.geo = '緯度を入力してください';
      } else if (this.court.geo.df !== '' && this.court.geo.ff === '') {
        this.error.geo = '経度を入力してください';
      } else if (this.court.geo.df !== '' && this.court.geo.ff !== '') {
        this.error.geo = '緯度と経度';
      }

      const startMapsUrl = 'https://www.google.com/maps/place';
      if (this.court.googleMapsUrl === '') {
        this.error.googleMapsUrl = '*GoogleMapsのURLを入力してください';
      } else if (!this.court.googleMapsUrl.startsWith(startMapsUrl)) {
        this.error.googleMapsUrl = '*正しいGoogleMapsのURLを入力してください';
      }

      const startSrcUrl = 'https://www.google.com/maps/embed';
      if (this.court.embedSrc === null) {
        this.error.embedSrc = '*GoogleMapsのsrc=以下を入力してください';
      } else if (!this.court.embedSrc.startsWith(startSrcUrl)) {
        this.error.embedSrc = '*正しいsrcを入力してください';
      }

      this.error.isOutside = this.court.isOutside === null ? '*どちらかを選択してください' : '屋外か屋内か';
      console.log(this.court);
    }
  }
}
</script>

<style lang="scss" scoped>
.court-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  form {
    display: flex;
    flex-direction: column;
    margin: 10px auto 0;
    width: 100%;
    max-width: 500px;
    .db-title {
      color: #262626;
      text-align: center;
      margin: 20px 0;
    }
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
      .error {
        color: red;
      }
      span {
        color: #757575;
        position: absolute;
        top: 35px;
        left: 12px;
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
        justify-content: space-around;
        .item {
          // width: 50%;
          display: flex;
          flex-direction: row;
          align-items: center;
          input { margin: 0; }
        }
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
    &:focus { outline: none; }
  }
  .isAbleToSubmit {
    color: #fff;
    background: #262626;
  }
}
</style>
