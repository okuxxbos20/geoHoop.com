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
        :class="{ selected: currentPage === 'form' }"
        @click="changePage('form')"
      >
        <FormIcon />
        <p class="name">フォーム</p>
      </label>
      <label
        :class="{ selected: currentPage === 'all-court' }"
        @click="changePage('all-court')"
      >
        <GeoIcon />
        <p class="name">コート一覧</p>
      </label>
    </aside>
    <main>
      <div v-if="currentPage === 'all-court'" class="all-court">
        <header>
          <h5 class="page-title">コート一覧</h5>
        </header>
        <div class="box">
          <div class="controller">
            <label>フィルター</label>
          </div>
          <table>
            <tr class="column-name">
              <td class="checkbox-place">
                <label>
                  <input v-model="isAllCourtChecked" type="checkbox">
                  <span class="checkmark"></span>
                </label>
              </td>
              <td>コート名</td>
              <td>都道府県</td>
              <td>市町村区</td>
              <td>Likes</td>
              <td>Bookmarks</td>
            </tr>
            <tr
              v-for="(court, idx) in courts"
              :key="idx"
              class="court-data"
              :class="{ odd: idx % 2 !== 0 }"
            >
              <td class="checkbox-place">
                <label>
                  <input type="checkbox">
                  <span class="checkmark"></span>
                </label>
              </td>
              <td>{{ court.name }}</td>
              <td>{{ court.prefecture }}</td>
              <td>{{ court.city }}</td>
              <td>{{ court.likes }}</td>
              <td>{{ court.bookmarks }}</td>
            </tr>
          </table>
          <div class="table-footer">
            <p>120件中10件のデータを表示中</p>
            <div class="pagenation">
              <label>
                <ArrowLeftIcon class="arrow-icon" />
              </label>
              <label>
                <ArrowRightIcon class="arrow-icon" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ArrowLeftIcon, ArrowRightIcon, FormIcon, GeoIcon } from '@/assets/icons';
import firebase from '~/plugins/firebase';
const db = firebase.firestore();

export default {
  components: { ArrowLeftIcon, ArrowRightIcon, FormIcon, GeoIcon },
  data() {
    return {
      currentPage: 'all-court',
      isAllCourtChecked: false,
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
    moveTo(to) {
      this.$router.push(`/${to}`);
    },
    changePage(to) {
      this.currentPage = to;
    },
    checkAll() {
      this.isAllCourtChecked = !this.isAllCourtChecked;
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
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 10px;
    .geo-hoop {
      margin: 10px 0 30px;
      &:hover {
        cursor: pointer;
      }
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
    height: 100vh;
    background: #e8ecf1;
    .all-court {
      padding: 20px;
      header {
        width: 100%;
        margin-bottom: 20px;
        .page-title {
          color: #6c757d;
        }
      }
      .box {
        background: #f7f7f7;
        width: 100%;
        border: none;
        border-radius: 8px;
        padding: 20px;
        .controller {
          width: 100%;
          padding: 10px;
        }
        table {
          color: #6c757d;
          width: 100%;
          overflow-x: scroll;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
          margin-bottom: 20px;
          .column-name {
            height: 50px;
            font-weight: 600;
            border-bottom: 1px solid #ddd;
            // td { text-align: center; }
          }
          .court-data {
            height: 40px;
            // td { text-align: center; }
          }
          .odd { background: #e8ecf1; }
          .checkbox-place {
            width: 100px;
            label {
              text-align: center;
              margin-left: 20px;
              &:hover { cursor: pointer; }
              input[type='checkbox'] { display: none; }
              .checkmark {
                position: relative;
                &:before {
                  content: '';
                  position: absolute;
                  top: -7px;
                  left: 0;
                  width: 17px;
                  height: 17px;
                  border: 1px solid #313a46;
                  border-radius: 4px;
                }
              }
              input[type='checkbox']:checked + .checkmark {
                &:after {
                  content: '';
                  display: block;
                  position: absolute;
                  top: -6px;
                  left: 5px;
                  width: 7px;
                  height: 12px;
                  transform: rotate(40deg);
                  border-bottom: 2px solid #313a46;
                  border-right: 2px solid #313a46;
                }
              }
            }
          }
        }
        .table-footer {
          width: 100%;
          padding: 10px 10px 0;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .pagenation {
            display: flex;
            flex-direction: row;
            label {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
              padding-bottom: 7px;
              transition: 200ms;
              &:hover {
                background: #e8ecf1;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
}
</style>
