import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
import register from './register'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    register
  }
})
