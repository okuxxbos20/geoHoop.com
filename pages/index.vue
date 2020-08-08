<template>
  <div>
    <Header />
    <SearchForm />
    <main class="container">
      <div class="search-result">
        <div
          v-for="court in results"
          :key="court.id"
          class="card"
        >
          <img :src="court.img[0]">
          <p>{{ court.name }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase';

export default {
  data() {
    return {
      results: []
    }
  },
  mounted() {
    const db = firebase.firestore();
    db.collection('court').get().then((court) => {
      court.forEach((v) => {
        this.results.push(v.data());
      });
      console.log(this.results);
    }).catch((error) => {
      console.log(error);
    });
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
main {
  background: #fff;
  width: 100%;
  .search-result {
    display: flex;
    flex-direction: column;
    .card {
      width: 100%;
      padding: 10px;
      border: none;
      border-bottom: 1px solid #eee;
      img {
        width: 300px;
        height: 185.414px;
        object-fit: cover;
        border-radius: 10px;
      }
    }
  }
}
</style>
