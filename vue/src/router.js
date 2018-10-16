import Vue from 'vue'
import Router from 'vue-router'

import index from '@/pages/index/index'
import home from '@/pages/home/index'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: index },
    { path: '/home', component: home }
  ]
})
