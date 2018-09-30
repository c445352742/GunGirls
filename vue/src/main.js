// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router.js'
import store from './store'
import ajax from '@/assets/ajax'
import toast from '@/assets/plugin/toast/index'
// import VueAxios from 'vue-axios'


Vue.prototype.ajax = ajax;
Vue.use(toast);

Vue.config.productionTip = false

// setTimeout(() => {
//   Vue.prototype.ipcRender = ipcRender;
// }, 0)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})