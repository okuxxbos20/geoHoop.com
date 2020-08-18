<template>
  <div class="">
    <iframe :src="court.embedSrc" class="maps">
    </iframe>
    <p>{{ court }}</p>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase';
const db = firebase.firestore();

export default {
  created() {
    const id = this.$route.query.id;
    db.collection('court').doc(id).get()
      .then(court => {
        this.court = court.data();
        console.log(this.court);
      })
      .catch(error => {
        console.log(error);
      });
  },
  head() {
    return {
      title: this.court.name
    }
  },
  data() {0
    return {
      court: ''
    };
  }
}
</script>

<style lang="scss" scoped>
.maps {
  width: 100%;
  height: 400px;
}
</style>
