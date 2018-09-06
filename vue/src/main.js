// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router.js'
import store from './store'
import axios from 'axios'
// import VueAxios from 'vue-axios'

axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.headers.get['Content-Type'] = 'application/json; charset=utf-8';
Vue.prototype.ajax = function (ajaxParam) {
  axios({
    method: ajaxParam.method || "get",
    url: ajaxParam.url.substr(0, 4) === "http" ? ajaxParam.url : "http://127.0.0.1:9000" + ajaxParam.url,
    params: ajaxParam.params
  })
    .then(suc => {
      ajaxParam.success(suc.data)
    })
    .catch(err => {
      ajaxParam.error ? ajaxParam.error(err) : conosle.log(err)
    });
}
// Vue.use(VueAxios,axios)

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
