<template>
  <div class="">
    <p>{{ court }}</p>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase';
const db = firebase.firestore();

export default {
  created() {
    const id = $nuxt.$route.query.id;
    db.collection('court').doc(id).get()
      .then(court => {
        this.court = court.data();
        console.log(this.court);
      })
      .catch(error => {
        console.log(error);
      })
  },
  data() {
    return {
      court: ''
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
