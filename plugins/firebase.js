import firebase from 'firebase';

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: "AIzaSyAeXsdwoAZ8cZP_WOMSNUPPSBP29W-Mmtc",
      authDomain: "geohoop-137a4.firebaseapp.com",
      databaseURL: "https://geohoop-137a4.firebaseio.com",
      projectId: "geohoop-137a4",
      storageBucket: "geohoop-137a4.appspot.com",
      messagingSenderId: "813965378594",
      appId: "1:813965378594:web:fab5b5201566afdeb7f67b",
      measurementId: "G-6H1BBPE4C6"
    }
  )
}

export default firebase;
