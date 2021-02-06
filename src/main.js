import Vue from 'vue'
import './cube-ui'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'

import App from './App.vue'
import router from './router'
import store from './store'
import { createProvider } from './vue-apollo'
import 'amfe-flexible'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(ElementUI)

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
