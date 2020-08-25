<template>
  <div class="court">
    <Header :geoHoop="geoHoop" :background="background" />
    <main>
      <div class="box col-md-6">
        <div class="img-part">
          <img
            v-if="!Array.isArray(court.img)"
            src="@/assets/img/noimg.png"
            class="no-img"
          >
          <img v-else :src="court.img[0]" class="court-img">
        </div>
        <div class="box-footer">
          <div class="upper-row">
            <p class="pre-city">#{{ court.prefecture }} #{{ court.city }}</p>
            <div class="likes-bookmarks">
              <label @click="likesCount()">
                <HeartEmptyIcon v-if="!isLiked" />
                <HeartIcon v-if="isLiked" />
                <span>{{ court.likes }}</span>
              </label>
              <label @click="bookmarksCount()">
                <BookmarkEmptyIcon v-if="!isBookmarked"/>
                <BookmarkIcon v-if="isBookmarked"/>
                <span>{{ court.bookmarks }}</span>
              </label>
            </div>
          </div>
          <h2 class="court-name">{{ court.name }}</h2>
        </div>
      </div>
      <div class="basic-info col-md-6">
        <table>
          <tr>
            <td class="name">住所</td>
            <td class="right">{{ court.address }}</td>
          </tr>
          <tr>
            <td class="name">Google Maps</td>
            <td class="right">
              <a :href="court.googleMapsUrl" target="_blank">Google Mapsへ</a>
            </td>
          </tr>
          <tr>
            <td class="name">参考URL</td>
            <td class="right">
              <a :href="court.refUrl" target="_blank">{{ court.refUrl }}</a>
            </td>
          </tr>
          <tr>
            <td class="name">コートタイプ</td>
            <td class="right">{{ isOutside }}</td>
          </tr>
          <!-- <tr>
            <td class="name"></td>
            <td class="right">{{ court }}</td>
          </tr> -->
        </table>
      </div>
    </main>
    <iframe :src="court.embedSrc" class="maps"></iframe>
    <FooterDefault />
  </div>
</template>

<script>
import { HeartEmptyIcon, HeartIcon, BookmarkEmptyIcon, BookmarkIcon } from '@/assets/icons';
import firebase from '~/plugins/firebase';
const db = firebase.firestore();

export default {
  components: {
    HeartEmptyIcon, HeartIcon, BookmarkEmptyIcon, BookmarkIcon
  },
  mounted() {
    const id = this.$route.query.id;
    db.collection('court').doc(id).get()
      .then(court => {
        this.court = court.data();
        this.isOutside = court.data().isOutside ? '屋外コート' : '屋内コート';
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
      court: {},
      isOutside: null,
      geoHoop: '#262626',
      background: '#fff',
      isLiked: false,
      isBookmarked: false
    };
  },
  methods : {
    likesCount() {
      alert('いいねが押されました');
      this.isLiked = !this.isLiked;
    },
    bookmarksCount() {
      alert('ブックマークボタンが押されました');
      this.isBookmarked = !this.isBookmarked;
    }
  }
}
</script>

<style lang="scss" scoped>
.court {
  overflow-x: hidden;
  main {
    margin: 40px 0 0;
    display: flex;
    flex-wrap: wrap;
    .box {
      width: 795px;
      padding: 0;
      @media (min-width: 768px) { padding: 0 10px; }
      .img-part {
        // background: #222;
        height: auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        .no-img {
          width: 100%;
        }
        .court-img {
          width: 100%;
        }
      }
      .box-footer {
        // background: #eee;
        padding: 5px;
        border-bottom: 1px solid #ddd;
        .upper-row {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .pre-city {
            color: #19b5fe;
            margin: 0;
            font-size: 16px;
            font-weight: 200;
          }
          .likes-bookmarks {
            display: flex;
            flex-direction: row;
            label {
              display: flex;
              flex-direction: row;
              margin: 0 0 0 5px;
              &:hover { cursor: pointer; }
              span { margin: 1px 5px; }
            }
          }
        }
        .court-name {
          color: #262626;
          margin: 0;
          font-size: 30px;
          font-weight: 100;
        }
      }
    }
    .basic-info {
      // background: #ddd;
      padding: 10px 5px;
      table {
        width: 100%;
        table-layout: fixed;
        tr {
          height: 33px;
          .name {
            // background: red;
            color: #606060;
            width: 110px;
          }
          .right {
            word-wrap: break-word;
          }
        }
      }
    }
  }
  .maps {
    width: 100%;
    height: 400px;
    border: none;
    margin: 50px 0;
  }
}
</style>
