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
            <label>
              <input v-model="isAllCourtChecked" type="checkbox">
              <span class="checkmark"></span>
            </label>
          </td>
          <td>コート名</td>
          <td>都道府県</td>
          <td>市町村区</td>
          <td class="add-triangle">Likes</td>
          <td class="add-triangle">Bookmarks</td>
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
</template>

<script>
export default {
  data() {
    return {
      isAllCourtChecked: false,
    }
  },
  props: {
    courts: {
      type: Array,
      required: false,
      default: []
    }
  },
  methods: {
    checkAll() {
      this.isAllCourtChecked = !this.isAllCourtChecked;
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
        .add-triangle {
          position: relative;
          @mixin traiangle($top) {
            content: '';
            width: 8px;
            height: 8px;
            position: absolute;
            top: $top;
            right: 30px;
            margin: auto;
            box-sizing: border-box;
            border: 5px solid transparent;
          }
          &:before {
            @include traiangle(28%);
            border-bottom: 5px solid #bdc3c7;
          }
          &:after {
            @include traiangle(55%);
            border-top: 5px solid #bdc3c7;
          }
        }
      }
      .court-data {
        height: 40px;
        &:hover { cursor: pointer; }
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
</style>
