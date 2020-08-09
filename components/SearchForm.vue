<template>
  <div class="search-wrapper">
    <div class="search-box">
      <form>
        <div class="input-place">
          <div class="prfecture">
            <select class="" @change="getPrefecture($event.target.value)">
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
          <div class="city">
            <select class="" @change="getCity($event.target.value)">
              <option
                v-for="city in cities"
                :key="city.id"
                :value="city.id"
              >
                {{ city.name }}
              </option>
            </select>
          </div>
          <button type="button">
            <SearchIcon class="search-icon" />
          </button>
        </div>
      </form>
      <p class="subtitle">we're all equal on the court.</p>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase';
import prefecturesjson from '@/assets/json/prefecture.json';
import cityjson from '@/assets/json/city.json';
import SearchIcon from '@/assets/icons/SearchIcon';

export default {
  components: { SearchIcon },
  data() {
    return {
      prefectures: [],
      cities: [],
      query: {
        prefecture: '',
        city: ''
      },
    }
  },
  mounted() {
    this.prefectures = prefecturesjson.prefectures;
    this.prefectures.map((v) => v.isSelected = false);
    this.prefectures.map((v) => {
      if (v.code === '13') v.isSelected = true;
    });
    this.cities = cityjson.filter((v) => v.id === '13')[0].cities;
  },
  methods: {
    getPrefecture(code) {
      this.cities = cityjson.filter((v) => v.id === code)[0].cities;
      this.query.prefecture = this.prefectures.filter((v) => v.code === code)[0].name;
    },
    getCity(id) {
      this.query.city = this.cities.filter((v) => v.id === id)[0].name;
      console.log(this.query);
    }
  }
}
</script>

<style lang="scss" scoped>
.search-wrapper {
  width: 100%;
  height: 300px;
  background-image: url('../assets/img/court.jpeg');
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  .search-box {
    background: #fff;
    border-radius: 100px;
    height: 70px;
    // margin: 0 10px;
    // opacity: 0.9;
    form {
      margin: 0 auto;
      .input-place {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        select {
          color: #3c4043;
          background: #fff;
          width: 130px;
          height: 50px;
          max-width: 160px;
          border: 1px solid #dadce0;
          border-radius: 100px;
          padding: 8px 15px;
          margin: 10px;
          font-weight: 500;
          -webkit-appearance: none;
          -moz-appearance: none;
          text-indent: 1px;
          text-overflow: '';
          position: relative;
          &::before {
            position: absolute;
            top: 50%;
            right: 10px;
            content: '';
            width: 5px;
            height: 5px;
            border-left: 30px solid transparent;
            border-right: 30px solid transparent;
            border-top: 30px solid black;
          }
          &:focus { outline: none; }
        }
        button {
          color: #eee;
          background: #19b5fe;
          width: 50px;
          height: 50px;
          border: none;
          border-radius: 100px;
          margin-right: 10px;
          position: relative;
          transition: 200ms;
          &:hover {
            transform: scale(0.9);
          }
          &:focus { outline: none; }
          .search-icon {
            position: absolute;
            top: 45%;
            left: 50%;
            -webkit-transform: translate(-50%,-50%);
            transform: translate(-50%,-50%);
          }
        }
      }
    }
    .subtitle {
      color: #fff;
      background: rgba(#000, 0.3);
      text-align: center;
      width: 100%;
      max-width: 340px;
      margin: 10px auto;
    }
  }
}
</style>
