export default {
  install: function (Vue) {
    Vue.prototype.$tip = function (param) {
      let cfg = {
        class: param.class || 'msg',// msg || dialog
        type: param.type ||'info',// info || warn || err || success
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
    }
  }
}