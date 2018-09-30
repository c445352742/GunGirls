import box from './temp'
let $vm;
export default {
  install: function (Vue) {
    Vue.prototype.$tip = function (param) {
      let cfg = {
        class: param.class || 'msg',// msg || dialog
        type: param.type || 'info',// info || warn || err || success
        title: param.title || '',
        text: param.text || '',
        btnAye: {
          callback: param.btnYes || undefined
        },
        btnNay: {
          callback: param.btnNo || undefined
        },
        btnCancel: {
          callback: param.btnCancel || undefined
        }
      }
      if (!$vm) {
        let box = Vue.extend(box);
        let div1 = document.createElement('div')
        document.getElementsByClassName('view')[0].appendChild(div1);
        setTimeout(() => {
          $vm = new box();
          $vm.$mount(div1);
          $vm.param = cfg;
        }, 1000)


        console.log('exe 1')
      }
    }
  }
}