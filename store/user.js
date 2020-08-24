import firebase from '~/plugins/firebase';
const auth = firebase.auth();
const db = firebase.firestore();

export const state = () => ({
  isAlreadyLogin: false,
  uid: '',
  userData: {}
});

export const mutations = {
  switchLogin(state) {
    state.isAlreadyLogin = true;
  },
  getUserId(state, uid) {
    state.uid = uid;
  },
  getUserData(state, user) {
    state.userData = user.data();
  }
};

export const getters = {
  uid: state => {
    return state.uid
  }
};

export const actions = {
  async checkLogin({ commit }) {
    await auth.onAuthStateChanged((user) => {
      if(user) {
        commit('switchLogin');
        commit('getUserId', user.uid);
        db.collection('users').doc(user.uid).get().then((user) => {
          commit('getUserData', user);
        }).catch((error) => {
          console.log(error);
        });
      }
    });
  }
}
