import Vue from 'vue'
import Router from 'vue-router'

import home from '@/pages/home'
import Ha from '@/components/Ha'
import Aa from '@/components/Aa'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: home, name: "fsd" },
    {
      path: '/a',
      component: Aa
    }
  ]
})
