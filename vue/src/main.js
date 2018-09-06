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
  let obj = {
    method: ajaxParam.method || "get",
    url: ajaxParam.url.substr(0, 4) === "http" ? ajaxParam.url : "http://127.0.0.1:9000" + ajaxParam.url,

  }
  if (ajaxParam.method.toUpperCase() === 'POST') {
    obj.data = ajaxParam.params;
  } else {
    obj.params = ajaxParam.params;
  }
  console.log(obj)
  axios(obj).then(suc => {
    ajaxParam.success(suc.data)
  }).catch(err => {
    ajaxParam.error ? ajaxParam.error(err) : null;
    console.log(err);
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



// curl 'http://127.0.0.1:9000/api/login?name=a&pwd=1499437827bf34ea6efa89a48954323a' -X POST 
// -H 'Origin: http://127.0.0.1:8989' -H 'Accept-Encoding: gzip, deflate, br' 
// -H 'Accept-Language: zh-CN,zh;q=0.9,en;q=0.8' 
// -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) 
// Chrome/68.0.3440.106 Safari/537.36'
//  -H 'Accept: application/json, text/plain, */*' 
// -H 'Referer: http://127.0.0.1:8989/' 
// -H 'Connection: keep-alive' -H 'Content-Length: 0' --compressed