import Vue from 'vue'
import Router from 'vue-router'

import Ha from '@/components/Ha'
import Aa from '@/components/Aa'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Ha
    },
    {
      path: '/a',
      component: Aa
    }
  ]
})
