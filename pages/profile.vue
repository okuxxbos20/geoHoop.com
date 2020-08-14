<template>
  <div class="profile">
    <p>this is profile</p>
    <p>id : {{ id }}</p>
  </div>
</template>

<script>
export default {
  created() {
    const id = this.$route.query.id;
    this.id = id;
  },
  data() {
    return {
      id: ''
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
