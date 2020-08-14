import firebase from '~/plugins/firebase';
const auth = firebase.auth();

export const state = () => ({
  isAlreadyLogin: false
});

// computedのような感じで、変数が変わったときだけ再評価される。
export const getters = {
};

// ストアの状態を変更する。コミットが必要。
export const mutations = {
  functionName(state, argument) {
    // ここに処理を書く
  }
};

// 任意の非同期処理を含むことができる。
export const actions = {
}
