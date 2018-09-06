import Vue from 'vue'
import Router from 'vue-router'

import index from '@/pages/index/index'
import home from '@/pages/home'
import Ha from '@/components/Ha'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: index }
  ]
})
