import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadingAmount: 0,
    setId: '',
    setsData: []
  },
  mutations: {
    SET_LOADING: (state, isLoading) => {
      isLoading ? ++state.loadingAmount : --state.loadingAmount
    }
  },
  actions: {
    setLoading ({ commit }, isLoading) {
      commit('SET_LOADING', isLoading)
    }
  },
  getters: {
    isLoading: state => {
      return state.loadingAmount > 0
    }
  }
})
