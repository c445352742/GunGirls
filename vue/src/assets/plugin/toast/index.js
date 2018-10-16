import box from './temp'
let $vm = null;
export default {
  install: function (Vue) {
    Vue.prototype.$tip = function (param) {
      let cfg = {
        class: param.class || 'msg',// msg || dialog
        type: param.type || 'info',// info || warn || err || success
        text: param.text || 'default text',
        time: 2000,
        show: true,
        callback: () => {
          param.callback && param.callback();
        },
        btnYes: () => {
          param.btnYes && param.btnYes();
        },
        btnNo: () => {
          param.btnNo && param.btnNo();
        }
      }
      if ($vm == null) {
        let div = Vue.extend(box);
        $vm = new div();
        $vm.$mount('#toast');
      }
      $vm.props = cfg;
      $vm.ini();
    }
  }
}