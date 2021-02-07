import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'landingpage',
    component: resolve => {
      require(['@/views/landingpage.vue'], resolve)
    }
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: resolve => {
      require(['@/views/register/signIn.vue'], resolve)
    }
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: resolve => {
      require(['@/views/register/signUp.vue'], resolve)
    }
  },
  {
    path: '/phoneVer',
    name: 'phoneVer',
    component: resolve => {
      require(['@/views/register/phoneVer.vue'], resolve)
    }
  },
  {
    path: '/selectPrice',
    name: 'selectPrice',
    component: resolve => {
      require(['@/views/likes/selectPrice.vue'], resolve)
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
