<template>
  <div class="report">
    <header>
      <h5 class="page-title">レポート</h5>
    </header>
    <main>
      <div class="data-sheet">
        <PrefectureBar :courts="courts" />
      </div>
      <div class="data-sheet">
        <Scatter />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      likesSum: 0,
      bookmarksSum: 0,
    }
  },
  props: {
    courts: {
      type: Array,
      required: false,
      default: []
    }
  }
}
</script>

<style lang="scss" scoped>
.report {
  padding: 20px;
  header {
    width: 100%;
    margin-bottom: 20px;
    .page-title { color: #6c757d; }
  }
  main {
    .data-sheet {
      background: #f7f7f7;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 30px;
    }
  }
}
</style>
