<template>
  <div class="dashboard">
    <aside>
      <p class="geo-hoop" @click="moveTo('')">geoHoop</p>
      <div class="admin-profile">
        <img src="@/assets/img/avatar.png" />
        <div class="basic-info">
          <p class="admin-name">徳川家康</p>
          <p class="admin-email">tokugawa@gmail.com</p>
        </div>
      </div>
      <label
        :class="{ selected: currentPage === 'all-court' }"
        @click="changePage('all-court')"
      >
        <GeoIcon />
        <p class="name">コート一覧</p>
      </label>
      <label
        :class="{ selected: currentPage === 'court-form' }"
        @click="changePage('court-form')"
      >
        <FormIcon />
        <p class="name">フォーム</p>
      </label>
      <label
        :class="{ selected: currentPage === 'report' }"
        @click="changePage('report')"
      >
        <GraphIcon />
        <p class="name">レポート</p>
      </label>
    </aside>
    <main>
      <AllCourt
        v-if="currentPage === 'all-court'"
        :courts="courts"
        :is-loaded="isLoaded"
      />
      <CourtForm v-if="currentPage === 'court-form'" />
      <Report
        v-if="currentPage === 'report'"
        :courts="courts"
        :is-loaded="isLoaded"
      />
    </main>
  </div>
</template>

<script>
import { ArrowLeftIcon, ArrowRightIcon, FormIcon, GeoIcon, GraphIcon } from '@/assets/icons';
import firebase from '~/plugins/firebase';
const db = firebase.firestore();

export default {
  components: { ArrowLeftIcon, ArrowRightIcon, FormIcon, GeoIcon, GraphIcon },
  created() {
    this.isLoaded = false;
    db.collection('court').get().then((court) => {
      court.forEach((v) => {
        this.courts.push(v.data());
        this.isLoaded = true;
      });
    }).catch((error) => {
      console.log(error);
    });
  },
  data() {
    return {
      currentPage: 'all-court',
      courts: [],
      isLoaded: false
    }
  },
  methods: {
    moveTo(to) {
      this.$router.push(`/${to}`);
    },
    changePage(to) {
      this.currentPage = to;
    }
  },
  head() {
    return {
      title: 'ダッシュボード'
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  display: flex;
  flex-direction: row;
  aside {
    color: #eee;
    background: #313a46;
    width: 220px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 10px;
    .geo-hoop {
      margin: 10px 0 30px;
      &:hover { cursor: pointer; }
    }
    .admin-profile {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 30px;
      img {
        width: 40px;
        height: 40px;
        border: none;
        border-radius: 50%;
        margin-right: 10px;
      }
      .basic-info {
        color: #eee;
        font-size: 13px;
        .admin-name {
          margin: 0;
        }
        .admin-email {
          margin: 0;
        }
      }
    }
    label {
      color: #8391a2;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      border-left: 3px solid #313a46;
      padding: 3px 0 3px 10px;
      margin-bottom: 20px;
      transition: 100ms;
      &:hover {
        color: #e4e9ed;
        cursor: pointer;
      }
      .name { margin: 0 0 0 15px; }
    }
    .selected {
      color: #eee;
      font-weight: 500;
    }
  }
  main {
    width: calc(100% - 220px);
    min-height: 100vh;
    background: #e8ecf1;
  }
}
</style>
