import UIkit  from 'uikit'
import { loadData } from '../../api';

import { showError, showSuccess } from '../../helpers/notification';

const state = () => ({
  users: [],
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
  SET_CURRENT_USER(state, {user, isAdd}) {
    state.currentUser = user
    state.isAdd = isAdd
  },
  SET_DELETE_USER(state, id) {
    state.users = state.users.filter(user => user.id !== id)
    localStorage.setItem('userList', JSON.stringify(state.users))
    if (JSON.parse(localStorage.getItem('userList')).length === 0) {
      localStorage.removeItem('userList')
    }
  },
  SET_EDIT_USER(state, user) {
    let indexUser = state.users.findIndex(item => item.id === user.id)
    state.users[indexUser] = user;
    localStorage.setItem('userList', JSON.stringify(state.users))
  },
  SET_ADD_USER(state, user) {
    state.users.push(user)
    localStorage.setItem('userList', JSON.stringify(state.users))
  },
  SET_EDIT_LOADING(state, editLoading) {
    state.editLoading = editLoading
  },
};

const actions = {
  async GET_USERS({commit}) {
    commit('SET_LOADING', true);
    try {
      let localUsers = JSON.parse(localStorage.getItem('userList'))
      if (localUsers) {
        commit('SET_USERS', localUsers);
      } else {
        let { users } = await loadData(1000);
        commit('SET_USERS', users);
        localStorage.setItem('userList', JSON.stringify(users))
      }
    } catch (e) {
      console.log(e)
    }
    commit('SET_LOADING', false);
  },
  GET_CURRENT_USER({commit}, {user, isAdd}) {
    commit('SET_CURRENT_USER', {user, isAdd});
  },
  EDIT_USER({commit}, user) {
    commit('SET_EDIT_LOADING', true);
    try {
      commit('SET_EDIT_USER', user);
      showSuccess('User updated')
    } catch (e) {
      showSuccess('Something went wrong')
    }
    commit('SET_EDIT_LOADING', false);
  },
  DELETE_USER({commit}, id) {
    commit('SET_LOADING', true);
    try {
      commit('SET_DELETE_USER', id);
      showSuccess('User deleted')
    } catch (e) {
      showSuccess('Something went wrong')
    }
    commit('SET_LOADING', false);
  },
  ADD_USER({commit}, user) {
    commit('SET_LOADING', true);
    try {
      commit('SET_ADD_USER', user);
      showSuccess('User added')
    } catch (e) {
      showSuccess('Something went wrong')
    }
    commit('SET_LOADING', false);
  },
};

const getters = {

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
