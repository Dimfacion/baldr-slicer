import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const state = () => ({
  userId: null
})

export default new Vuex.Store({
  modules: {},
  state,
  mutations: {
    setUserId(state, userId) {
      state.userId = userId;
    }
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })],
})
