import { loadData } from '../../api'
import firebase from 'firebase/app'

import { showError, showSuccess } from '../../helpers/notification'
import { transformToArray } from '../../helpers/transformToArray'

const state = () => ({
  users: [],
  userEmail: null,
  currentUser: null,
  loading: false,
  editLoading: false,
  isAdd: false,
});

const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_USERS(state, users) {
    state.users = users
  },
  SET_ADD_USER(state, user) {
    state.users.push(user)
  },
  SET_DELETE_USER(state, id) {
    state.users = state.users.filter(user => user.id !== id)
  },
  SET_EDIT_USER(state, user) {
    let indexUser = state.users.findIndex(item => item.id === user.id)
    state.users[indexUser] = user;
  },
  SET_CURRENT_USER(state, {user, isAdd}) {
    state.currentUser = user
    state.isAdd = isAdd
  },
  SET_USEREMAIL(state, email) {
    state.userEmail = email
  },
  SET_EDIT_LOADING(state, editLoading) {
    state.editLoading = editLoading
  },
};

const actions = {
  async GET_USERS({commit, dispatch}) {
    commit('SET_LOADING', true);
    try {
      const uid = await dispatch('auth/getUiId', null, { root: true });
      const list = await firebase.database().ref(`/users/${uid}/list`).once('value');
      const listValues = list.val();
      const value = transformToArray(listValues);
      const email = await firebase.database().ref(`/users/${uid}/info`).once('value');
      const emailValue = email.val().email;
      commit('SET_USERS', value);
      commit('SET_USEREMAIL', emailValue);
    } catch (e) {
      showError(e.code)
    }
    commit('SET_LOADING', false);
  },
  async ADD_USER({commit, dispatch}, user) {
    try {
      const uid = await dispatch('auth/getUiId', null, { root: true });
      const newUser =  await firebase.database().ref(`/users/${uid}/list`).push({
        ...user
      })
      commit('SET_ADD_USER', {...user, id: newUser.key});
      showSuccess('User added')
      return { ...user, id: newUser.key}
    } catch (e) {
      showError(e.code)
    }
  },
  async EDIT_USER({commit, dispatch}, user) {
    commit('SET_EDIT_LOADING', true);
    try {
      const uid = await dispatch('auth/getUiId', null, { root: true });
      await firebase.database().ref(`/users/${uid}/list`).child(user.id).update({...user});
      commit('SET_EDIT_USER', user);
      showSuccess('User updated')
    } catch (e) {
      showError(e.code)
    }
    commit('SET_EDIT_LOADING', false);
  },
  GET_CURRENT_USER({commit}, {user, isAdd}) {
    try {
      commit('SET_CURRENT_USER', {user, isAdd});
    } catch (e) {
      console.log(e)
    }
  },
  async DELETE_USER({commit, dispatch}, id) {
    try {
      const uid = await dispatch('auth/getUiId', null, { root: true });
      await firebase.database().ref(`/users/${uid}/list`).child(id).remove();
      commit('SET_DELETE_USER', id);
      showSuccess('User deleted')
    } catch (e) {
      showError(e.code)
    }
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
