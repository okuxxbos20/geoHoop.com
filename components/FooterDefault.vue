<template>
  <footer>
    <div class="items">
      <p @click="moveTo('about')">about</p>
      <p @click="moveTo('legal')">legal</p>
    </div>
    <p class="copylight">
      <small lang="en">©2020 geoHoop.com</small>
    </p>
  </footer>
</template>

<script>
export default {
  methods: {
    moveTo(to) {
      this.$router.push(`/${to}`);
    }
  }
}
</script>

<style lang="scss" scoped>
footer {
  width: 70%;
  text-align: center;
  margin: 0 auto;
  .items {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-top: 8px;
    margin: 0 auto 8px;
    border-top: 1px solid #ddd;
    p {
      color: #888;
      font-size: 15px;
      margin: 0 10px;
      transition: 200ms;
      &:hover {
        color: #111;
        cursor: pointer;
      }
    }
  }
  .copylight {
    color: #888;
    margin: 5px 0 10px;
  }
}
</style>
