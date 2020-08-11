<template>
  <div class="">
    <GmapMap
      :center="center"
      :zoom="14"
      style="width: 100%; height: 300px"
    >
      <!-- <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
      /> -->
    </GmapMap>
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
        this.center = {
          lat: court.data().geo.df,
          lng: court.data().geo.ff
        };
      })
      .catch(error => {
        console.log(error);
      });
  },
  data() {0
    return {
      court: '',
      center: { lat: 35.682663, lng: 139.7149979 },
      // markers: [
      //   { position: { lat: 35.682663, lng: 139.7149979 } }
      // ]
    };
  }
}
</script>

<style lang="scss" scoped>
</style>
