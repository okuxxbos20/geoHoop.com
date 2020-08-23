<template>
  <div class="court">
    <Header
      :geoHoop="geoHoop"
      :background="background"
    />
    <main>
      <div class="img-part">
        <!-- ちゃんと配列になっているか？ -->
        <img v-if="court.img[1] === undefined" src="@/assets/img/noimg.png" class="no-img">
        <img v-if="court.img[1] !== undefined" :src="court.img[1]" class="court-img">
      </div>
      <div class="basic-info">
        <h2 class="court-name">{{ court.name }}</h2>
        <p class="pre-city">@{{ court.prefecture }}{{ court.city }}</p>
        <div class="likes-bookmarks">
          <label>
            <HeartIcon />
            <span>{{ court.likes }}</span>
          </label>
          <label>
            <BookmarkIcon />
            <span>{{ court.bookmarks }}</span>
          </label>
        </div>
      </div>
    </main>
    <!-- <iframe :src="court.embedSrc" class="maps">
    </iframe> -->
    <!-- <p>{{ court.img[0] }}</p> -->
  </div>
</template>

<script>
import firebase from '~/plugins/firebase';
import HeartIcon from '@/assets/icons/HeartIcon';
import BookmarkIcon from '@/assets/icons/BookmarkIcon';
const db = firebase.firestore();

export default {
  components: {
    HeartIcon, BookmarkIcon
  },
  mounted() {
    const id = this.$route.query.id;
    db.collection('court').doc(id).get()
      .then(court => {
        this.court = court.data();
        console.log(this.court);
      })
      .catch(error => {
        console.log(error);
      });
  },
  head() {
    return {
      title: this.court.name
    }
  },
  data() {0
    return {
      court: '',
      geoHoop: '#262626',
      background: '#fff'
    };
  }
}
</script>

<style lang="scss" scoped>
.court {
  main {
    margin: 80px 0 0;
    display: flex;
    flex-wrap: wrap;
    // justify-content: center;
    .img-part {
      background: #222;
      width: 700px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: 0 100px ;
      .no-img {
        width: 100%;
        // height: auto;
      }
      .court-img {
        width: 100%;
      }
    }
    .basic-info {
      background: #ddd;
      padding-top: 30px;
      margin: 0;
      .court-name {
        color: #262626;
        margin: 0;
      }
      .pre-city {
        margin: 0;
      }
      .likes-bookmarks {
        display: flex;
        flex-direction: row;
        label {
          display: flex;
          flex-direction: row;
          margin: 0 20px;
        }
      }
    }
  }
  .maps {
    width: 100%;
    height: 400px;
    border: none;
  }
}
</style>
