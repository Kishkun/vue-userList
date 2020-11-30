import Vue from 'vue'
import Vuex from 'vuex'
import users from './users/users'
import auth from './auth/auth'
import error from './error/error'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    error,
    auth,
    users
  }
})
