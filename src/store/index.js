import { createStore } from 'vuex'
import toyStore from './modules/toy-module.js'
import userStore from './modules/user-module.js'
import reviewStore from './modules/review-module.js'


const store = createStore({
  strict: true,
  state () {
    return {
      
    }
  },
  mutations: {

  },
  modules: {
    toyStore,
    userStore,
    reviewStore
  }
})

export default store;