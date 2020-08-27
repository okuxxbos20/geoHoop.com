<template>
  <div class="all-court">
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
            <label class="all-checkbox" @click="checkAll()">
              <span
                :class="{ allSelect: isAllCourtChecked, indeterminate: isIndeterminate }">
              </span>
            </label>
          </td>
          <td><label>コート名</label></td>
          <td><label>都道府県</label></td>
          <td><label>市町村区</label></td>
          <td class="add-triangle" @click="changeLikesOrder()">
            <label>Likes</label>
          </td>
          <td class="add-triangle" @click="changeBookmarksOrder()">
            <label>Bookmarks</label>
          </td>
          <td><label>コートタイプ</label></td>
          <td class="add-triangle" @click="changeCreatedAtOrder()">
            <label>登録日</label>
          </td>
          <td><label>id</label></td>
        </tr>
        <tr
          v-for="(court, idx) in courts"
          :key="idx"
          class="court-data"
          :class="{ odd: idx % 2 !== 0 }"
        >
          <td class="checkbox-place">
            <label class="individual-checkbox">
              <input v-model="selectedCourt" type="checkbox" :value="court.name">
              <span class="checkmark"></span>
            </label>
          </td>
          <td><label>{{ court.name }}</label></td>
          <td><label>{{ court.prefecture }}</label></td>
          <td><label>{{ court.city }}</label></td>
          <td><label>{{ court.likes }}</label></td>
          <td><label>{{ court.bookmarks }}</label></td>
          <td>
            <label>
              <span v-if="court.isOutside" class="outside">屋外</span>
              <span v-if="!court.isOutside" class="inside">屋内</span>
            </label>
          </td>
          <td><label>{{ court.createdAt | timestampFunc  }}</label></td>
          <td>
            <label @click="moveTo(court.id)" class="court-id">
              {{ court.id.substr(0, 8) }}...
            </label>
          </td>
        </tr>
      </table>
      <div class="table-footer">
        <p>{{ courts.length }}件中{{ courts.length }}件のデータを表示中</p>
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
</template>

<script>
import { ArrowLeftIcon, ArrowRightIcon } from '@/assets/icons';

export default {
  components: { ArrowLeftIcon, ArrowRightIcon },
  filters: {
    timestampFunc(time) {
      if (time !== undefined) {
        const sum = time.seconds * 1000 + time.nanoseconds / (1000 ** 2);
        const d = new Date(sum);
        const year = d.getFullYear();
        let month = d.getMonth() + 1;
        let date = d.getDate();
        month = month < 10 ? `0${month}` : month
        date = date < 10 ? `0${date}` : date
        return `${year}/${month}/${date}`;
      }
    }
  },
  data() {
    return {
      isAllCourtChecked: false,
      isIndeterminate: false,
      selectedCourt: [],
      isLikesAsc: null,
      isBookmarksAsc: null,
      isCreatedAtAsc: null
    }
  },
  props: {
    courts: {
      type: Array,
      required: false,
      default: []
    }
  },
  watch: {
    selectedCourt(newArr, oldArr) {
      if (newArr.length === 0) {
        this.isIndeterminate = false;
        this.isAllCourtChecked = false;
      } else if (newArr.length === this.courts.length) {
        this.isIndeterminate = false;
        this.isAllCourtChecked = true;
      } else {
        this.isIndeterminate = true;
        this.isAllCourtChecked = false;
      }
    }
  },
  methods: {
    checkAll() {
      if (this.isAllCourtChecked) {
        this.isAllCourtChecked = false;
        this.isIndeterminate = false;
        this.selectedCourt = [];
      } else {
        this.isAllCourtChecked = true;
        this.isIndeterminate = false;
        this.selectedCourt = this.courts.map((v) => v.name);
      }
    },
    changeLikesOrder() {
      if (this.isLikesAsc || this.isLikesAsc === null) {
        this.courts = this.courts.sort((a, b) => {
          return b.likes - a.likes;
        })
        this.isLikesAsc = false;
      } else if (!this.isLikesAsc || this.isLikesAsc === null) {
        this.courts = this.courts.sort((a, b) => {
          return a.likes - b.likes;
        })
        this.isLikesAsc = true;
      }
    },
    changeBookmarksOrder() {
      if (this.isBookmarksAsc || this.isBookmarksAsc === null) {
        this.courts = this.courts.sort((a, b) => {
          return b.bookmarks - a.bookmarks;
        })
        this.isBookmarksAsc = false;
      } else if (!this.isBookmarksAsc || this.isBookmarksAsc === null) {
        this.courts = this.courts.sort((a, b) => {
          return a.bookmarks - b.bookmarks;
        })
        this.isBookmarksAsc = true;
      }
    },
    changeCreatedAtOrder() {
      if (this.isCreatedAtAsc || this.isCreatedAtAsc === null) {
        this.courts = this.courts.sort((a, b) => {
          return b.createdAt - a.createdAt;
        })
        this.isCreatedAtAsc = false;
      } else if (!this.isCreatedAtAsc || this.isCreatedAtAsc === null) {
        this.courts = this.courts.sort((a, b) => {
          return a.createdAt - b.createdAt;
        })
        this.isCreatedAtAsc = true;
      }
    },
    moveTo(id) {
      this.$router.push({ name: 'court', query: { id: id } });
    }
  }
}
</script>

<style lang="scss" scoped>
.all-court {
  padding: 20px;
  header {
    width: 100%;
    margin-bottom: 20px;
    .page-title { color: #6c757d; }
  }
  .box {
    background: #f7f7f7;
    width: 100%;
    border: none;
    border-radius: 8px;
    padding: 20px;
    overflow: auto;
    white-space: nowrap;
    .controller {
      width: 100%;
      padding: 10px;
    }
    table {
      color: #6c757d;
      width: 100%;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      margin-bottom: 20px;
      .column-name {
        height: 50px;
        font-weight: 600;
        border-bottom: 1px solid #ddd;
        td {
          label { margin: 0 10px; }
        }
        .add-triangle {
          position: relative;
          &:hover { cursor: pointer; }
          @mixin traiangle($top) {
            content: '';
            width: 7px;
            height: 7px;
            position: absolute;
            top: $top;
            right: -1px;
            margin: auto;
            box-sizing: border-box;
            border: 4px solid transparent;
          }
          &:before {
            @include traiangle(30%);
            border-bottom: 4px solid #bdc3c7;
          }
          &:after {
            @include traiangle(54%);
            border-top: 4px solid #bdc3c7;
          }
        }
      }
      .court-data {
        height: 40px;
        // &:hover { cursor: pointer; }
        td {
          label { margin: 0 10px; }
          .outside {
            color: #eee;
            background: #3fc380;
            font-size: 14px;
            padding: 3px 8px;
            border-radius: 20px;
          }
          .inside {
            color: #eee;
            background: #2574a9;
            font-size: 14px;
            padding: 3px 8px;
            border-radius: 20px;
          }
          .court-id {
            transition: 100ms;
            &:hover {
              color: #1e8bc3;
              cursor: pointer;
            }
          }
        }
      }
      .odd { background: #e8ecf1; }
      .checkbox-place {
        width: 100px;
        .all-checkbox {
          margin: 0 20px 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          &:hover { cursor: pointer; }
          span {
            width: 17px;
            height: 17px;
            display: block;
            border: 2px solid #6c7a89;
            border-radius: 4px;
            position: relative;
          }
          .allSelect {
            background: #6c7a89;
            &:after {
              content: '';
              display: block;
              position: absolute;
              top: -1px;
              left: 3px;
              width: 7px;
              height: 12px;
              transform: rotate(40deg);
              border-bottom: 2px solid #eee;
              border-right: 2px solid #eee;
            }
          }
          .indeterminate {
            background: #6c7a89;
            &:after {
              content: '';
              display: block;
              position: absolute;
              width: 11px;
              top: 50%;
              left: 50%;
              -webkit-transform: translate(-52%,-50%);
              transform: translate(-52%,-50%);
              border-bottom: 2px solid #eee;
            }
          }
        }
        .individual-checkbox {
          margin: 0 0 0 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
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
              border: 2px solid #6c7a89;
              border-radius: 4px;
            }
          }
          input[type='checkbox']:checked + .checkmark {
            &:before { background: #6c7a89; }
            &:after {
              content: '';
              display: block;
              position: absolute;
              top: -6px;
              left: 5px;
              width: 7px;
              height: 12px;
              transform: rotate(40deg);
              border-bottom: 2px solid #eee;
              border-right: 2px solid #eee;
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
</style>
