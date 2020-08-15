<template>
  <div class="switch">
    <div
      class="bookamrks"
      :class="{ selected: isBookmarkSelected }"
      @click="changeStatus('bookmarks')"
    >
      <code>ブックマーク</code>
    </div>
    <div
      class="register"
      :class="{ selected: !isBookmarkSelected }"
      @click="changeStatus('register')"
    >
      <code>コートを登録</code>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isBookmarkSelected: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  methods: {
    changeStatus(status) {
      this.$emit('changeStatus', status);
    }
  }
}
</script>

<style lang="scss" scoped>
.switch {
  width: 95%;
  max-width: 500px;
  height: 40px;
  border: 1px solid #262626;
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 15px auto;
  code {
    color: #262626;
    margin: 0;
  }
  @mixin selector($tl: 0px, $tr: 0px, $br: 0px, $bl: 0px) {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-top-left-radius: $tl;
    border-top-right-radius: $tr;
    border-bottom-right-radius: $br;
    border-bottom-left-radius: $bl;
    &:hover { cursor: pointer; }
  }
  .bookamrks {
    @include selector(10px, 0px, 0px, 10px);
  }
  .register {
    @include selector(0px, 10px, 10px, 0px);
  }
  .selected {
    code { color: #eee; }
    background: #333;
  }
}
</style>
