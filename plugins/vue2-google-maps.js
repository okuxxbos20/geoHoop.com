import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDa4lP2j4bxr2Z5H6-sSATyy3KVwy9GT54',
    libraries: 'places',
    region: 'JP',
    language: 'ja'
  },
})
