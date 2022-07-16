import { createStore } from 'vuex'
import toyStore from './modules/toy-module.js'
import userStore from './modules/user-module.js'
import authStore from './modules/auth-module.js'


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
    authStore
  }
})

export default store;