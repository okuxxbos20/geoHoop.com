<template>
  <div class="header">
    <p class="title">geoHoops</p>
    <div class="right-box">
      <img src="@/assets/img/avatar.png" alt="avatar">
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 72px;
  background: transparent;
  padding: 0 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  top: 0;
  .title {
    color: #eee;
    // background: rgba(#000, 0.3);
    padding: 5px 10px;
    position: absolute;
    top: 25px;
    left: 0;
    margin-left: 40px;
  }
  .right-box {
    position: absolute;
    right: 0;
    margin-right: 20px;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
}
</style>
