<template>
  <div>
    <Header />
    <SearchForm @searchCourt="searchCourt" />
    <main class="container">
      <div class="divider">
        <p>search result</p>
      </div>
      <div v-if="courts.length > 0" class="search-result">
        <div
          v-for="(court, idx) in courts"
          :key="idx"
          class="newarr"
          @click="moveTo(court.id)"
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
          <img :src="court.img[0]">
        </div>
      </div>
      <div v-if="courts.length === 0" class="no-search-result">
        <p>指定した地区にコートはありませんでした。</p>
      </div>
    </main>
    <FooterDefault />
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
      courts: []
    }
  },
  created() {
    db.collection('court').get().then((court) => {
      court.forEach((v) => {
        this.courts.push(v.data());
      });
    }).catch((error) => {
      console.log(error);
    });
  },
  methods: {
    moveTo(id) {
      this.$router.push({ name: 'court', query: { id: id } });
    },
    searchCourt(query) {
      console.log(query);
      this.courts = [];
      db.collection('court')
      .where('prefecture', '==', query.prefecture)
      .where('city', '==', query.city)
      .get().then((court) => {
        court.forEach((v) => {
          this.courts = [...this.courts, v.data()];
        });
      }).catch((error) => {
        console.log(error);
      });
    }
  }
}
</script>

<style lang="scss" scoped>
main {
  background: #fff;
  width: 100%;
  padding: 0;
  margin-bottom: 30px;
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
    flex-direction: row;
    flex-wrap: wrap;
    border-top: 1px solid #eee;
    .newarr {
      width: calc(100% / 3);
      height: auto;
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
</style>
