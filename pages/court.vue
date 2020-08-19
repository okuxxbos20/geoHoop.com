<template>
  <div class="court">
    <Header
      :geoHoop="geoHoop"
      :background="background"
    />
    <main>
      <div class="name">
        <p>{{ court.name }}</p>
      </div>
    </main>
    <iframe :src="court.embedSrc" class="maps">
    </iframe>
    <!-- <p>{{ court }}</p> -->
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
      court: '',
      geoHoop: '#262626',
      background: '#fff'
    };
  }
}
</script>

<style lang="scss" scoped>
.court {
  main {
    margin: 40px 0;
  }
  .maps {
    width: 100%;
    height: 400px;
    border: none;
  }
}
</style>
