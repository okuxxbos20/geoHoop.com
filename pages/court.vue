<template>
  <div class="">
    <p>court id is : {{ id }}</p>
  </div>
</template>

<script>
// import firebase from '~/plugins/firebase';
// const db = firebase.firestore();

export default {
  created() {
    this.id = this.$route.path.substr(9);
    // db.collection('court').doc(id).get()
    //   .then(court => {
    //     this.court = court.data();
    //     console.log(this.court);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   })
  },
  data() {
    return {
      id: '',
      court: ''
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
