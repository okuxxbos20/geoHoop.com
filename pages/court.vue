<template>
  <div class="court">
    <Header :geoHoop="'#eee'" :background="'#313a46'" />
    <main>
      <div class="box col-md-6">
        <div class="main-img">
          <img
            v-if="Array.isArray(court.img) && isLoaded"
            :src="court.img[currentImgNum]"
            class="court-img"
          >
          <div v-else>
            <vue-loading
              type="bars"
              color="#6c757d"
              :size="{ width: '50px', height: '50px' }"
            />
          </div>
          <div class="img-overlay">
            <div class="arrowleft-icon" @click="minusImgNum()">
              <ArrowLeftIcon />
            </div>
            <div class="arrowright-icon" @click="plusImgNum(court.img.length - 1)">
              <ArrowRightIcon />
            </div>
          </div>
        </div>
        <div v-if="Array.isArray(court.img) && isLoaded" class="sub-img">
          <img
            v-for="(img, idx) in court.img"
            :key="idx"
            :src="img"
            class="sub-court-img"
            @click="currentImgNum = idx"
          >
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
        <h5 class="table-title">コート情報</h5>
        <div class="table-wrapper">
          <table>
            <tr>
              <td class="name">住所</td>
              <td class="right">{{ court.address }}</td>
            </tr>
            <tr class="odd">
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
            <tr class="odd">
              <td class="name">コートタイプ</td>
              <td class="right">{{ isOutside }}</td>
            </tr>
            <!-- <tr>
              <td c class="name"></td>
              <td class="right">{{ court }}</td>
            </tr> -->
          </table>
        </div>
      </div>
    </main>
    <iframe :src="court.embedSrc" class="maps"></iframe>
    <FooterDefault />
  </div>
</template>

<script>
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  HeartEmptyIcon,
  HeartIcon,
  BookmarkEmptyIcon,
  BookmarkIcon
} from '@/assets/icons';
import firebase from '~/plugins/firebase';
const db = firebase.firestore();

export default {
  components: {
    ArrowLeftIcon,
    ArrowRightIcon,
    BookmarkEmptyIcon,
    BookmarkIcon,
    HeartEmptyIcon,
    HeartIcon,
  },
  mounted() {
    const id = this.$route.query.id;
    this.isLoaded = false;
    db.collection('court').doc(id).get()
      .then(court => {
        this.court = court.data();
        this.isOutside = court.data().isOutside ? '屋外コート' : '屋内コート';
        this.isLoaded = true;
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
      isLiked: false,
      isBookmarked: false,
      isLoaded: false,
      currentImgNum: 0
    };
  },
  methods : {
    minusImgNum() {
      if (this.currentImgNum !== 0) {
        this.currentImgNum --;
      }
    },
    plusImgNum(len) {
      console.log('yo');
      if (this.currentImgNum !== len) {
        this.currentImgNum ++;
      } else {
        this.currentImgNum = 0;
      }
    },
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
  background: #e8ecf1;
  main {
    margin: 45px 0 0;
    display: flex;
    flex-wrap: wrap;
    .box {
      width: 795px;
      padding: 0;
      @media (min-width: 768px) { padding: 10px; }
      .main-img {
        background: rgba(#000, 0.8);
        height: 460px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        .court-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .img-overlay {
          background: rgba(#000, 0.4);
          opacity: 0;
          position: absolute;
          width: 100%;
          height: calc(100% - 138px);
          top: 0;
          left: 0;
          @media (min-width: 768px) {
            width: calc(100% - 20px);
            height: calc(100% - 163px);
            top: 10px;
            left: 10px;
          }
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          transition: 200ms;
          &:hover {
            cursor: pointer;
            opacity: 1;
          }
          @mixin arrowicon($right, $left) {
            color: #fff;
            background: rgba(#fff, 0.4);
            width: 30px;
            height: 30px;
            border: none;
            border-radius: 50%;
            display: flex;
            flex-direction: row;
            justify-content: center;
            padding: 1px $right 0 $left;
            margin: 0 5px;
          }
          .arrowleft-icon { @include arrowicon(5px, 0); }
          .arrowright-icon { @include arrowicon(0, 2px); }
        }
      }
      .sub-img {
        width: 100%;
        height: 70px;
        .sub-court-img {
          width: 110px;
          height: 100%;
          object-fit: cover;
          // border: 2px solid #666;
          &:hover { cursor: pointer; }
        }
      }
      .box-footer {
        padding: 5px;
        border-bottom: 1px solid #ddd;
        .upper-row {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .pre-city {
            color: #6c757d;
            margin: 0;
            font-size: 16px;
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
          color: #6c757d;
          margin: 0;
          font-size: 30px;
        }
      }
    }
    .basic-info {
      padding: 10px 5px;
      .table-title {
        color: #6c757d;
        margin: 10px 0;
      }
      .table-wrapper {
        background: #f7f7f7;
        border-radius: 8px;
        padding: 20px 15px;
        margin: 0 15px;
        table {
          border-radius: 8px;
          width: 100%;
          table-layout: fixed;
          margin: 0 auto;
          tr {
            height: 33px;
            .name {
              color: #6c757d;
              width: 110px;
              font-size: 16px;
              font-weight: 600;
              padding-left: 10px;
            }
            .right {
              word-wrap: break-word;
              padding-left: 30px;
            }
          }
          .odd {
            background: #e8ecf1;
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
