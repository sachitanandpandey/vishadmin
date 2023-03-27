import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: 'newuser'
  },
  getters: {
    getUser (state) {
      return state.user
    }
  },
  mutations: {
    setuser (state, payload) { state.user = payload.value }
  },
  actions: {
  },
  modules: {
  }
})
