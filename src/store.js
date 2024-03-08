import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loader: false,
    pageName:''
  },
  mutations: {
    loader(state,payload){
      state.loader =payload;
    },
    currentPage(state,payload){
      state.pageName = payload;
    }
  },
  actions: {

  }
})
