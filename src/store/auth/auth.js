import {showError, showSuccess} from '../../helpers/notification'
import firebase from 'firebase/app'

const actions = {
  async LOGIN({commit}, user) {
    try {
      await firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      showSuccess('Avtorization was successful')
    } catch (e) {
      commit('error/SET_ERROR', e, { root: true })
      showError(e.code)
      throw e
    }
  },
  async REGISTER({commit, dispatch}, user) {
    try {
      await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      const uid = await dispatch('getUiId')
      await firebase.database().ref(`/users/${uid}/info`).set({
        name: user.name,
        email: user.email,
      })
      showSuccess('Registration was successful')
    } catch (e) {
      commit('error/SET_ERROR', e, { root: true })
      showError(e.code)
      throw e
    }
  },
  getUiId() {
    const user = firebase.auth().currentUser;
    return user ? user.uid : null
  },
  async LOGOUT({commit}) {
    try {
      await firebase.auth().signOut()
      commit('users/SET_USERS', [], { root: true })
      commit('error/CLEAR_ERROR', null, { root: true })
      showSuccess('You are logged out')
    } catch (e) {
      showError(e.code);
    }
  }
};

export default {
  namespaced: true,
  actions
}
