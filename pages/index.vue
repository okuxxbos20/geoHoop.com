<template>
  <div>
    <Header />
    <SearchForm />
    <main class="container">
      <div class="divider">
        <p>search result</p>
      </div>
      <div class="search-result">
        <div
          v-for="(arr, idx) in list"
          :key="idx"
          class="arrRow"
        >
          <div
            v-for="(court, idx) in arr"
            :key="idx"
            class="card"
          >
            <div class="overlay">
              <div class="info likes">
                <HeartIcon />
                <p>{{ court.likes }}</p>
              </div>
              <div class="info bookmarks">
                <BookmarkIcon />
                <p>{{ court.bookmarks }}</p>
              </div>
            </div>
            <img
              :src="court.img[0]"
              @click="moveTo(court.id)"
            >
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase';
import HeartIcon from '@/assets/icons/HeartIcon';
import BookmarkIcon from '@/assets/icons/BookmarkIcon';
const db = firebase.firestore();

export default {
  components: { HeartIcon, BookmarkIcon },
  data() {
    return {
      results: [],
      list: []
    }
  },
  mounted() {
    db.collection('court').get().then((court) => {
      court.forEach((v) => {
        this.results.push(v.data());
      });
      console.log(this.results);
      this.clacArray();
    }).catch((error) => {
      console.log(error);
    });
  },
  methods: {
    clacArray() {
      const len = this.results.length;
      const need = Math.floor((len + 2) / 3);
      this.list = Array.from({ length: need }, () => []);
      this.results.map((v, idx) => {
        const quo = Math.floor(idx / 3);
        const mod = idx % 3;
        this.list[quo][mod] = v;
      });
      console.log(this.list);
    },
    moveTo(id) {
      console.log(id);
    }
  }
}
</script>

<style lang="scss" scoped>
main {
  background: #fff;
  width: 100%;
  padding: 0;
  .divider {
    margin: 25px 0;
    p {
      color: #262626;
      font-size: 18px;
      font-weight: 500;
      text-align: center;
      padding-bottom: 8px;
      margin: 0;
      border-bottom: 1px solid #eee;
    }
  }
  .search-result {
    width: 100%;
    display: flex;
    flex-direction: column;
    border-top: 1px solid #eee;
    .arrRow {
      width: 100%;
      display: flex;
      flex-direction: row;
      border: none;
      .card {
        width: calc(100% / 3);
        height: auto;
        border: none;
        position: relative;
        .overlay {
          width: 100%;
          height: 100%;
          background: rgba(#000, 0.55);
          opacity: 0;
          position: absolute;
          top: 0;
          left: 0;
          transition: 200ms;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          &:hover {
            cursor: pointer;
            opacity: 1;
          }
          .info {
            color: #ddd;
            display: flex;
            flex-direction: row;
            margin: 0 10px;
            p { margin: 0 0 0 5px; }
          }
          .likes {
            p { margin: 0 0 0 8px; }
          }
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
