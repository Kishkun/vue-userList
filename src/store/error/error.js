const state = () => ({
  error: null
});

const mutations = {
  SET_ERROR(state, error) {
    state.error = error
  },
  CLEAR_ERROR(state) {
    state.error = null
  }
};

export default {
  namespaced: true,
  state,
  mutations
}
