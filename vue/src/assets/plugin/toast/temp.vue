<template>
  <div v-if="show" class='tip ' :class="flag" id="toast">
    <div class="main">{{text}}</div>
    <div v-show="showbtns" class="btn blue" @click="yes">是</div>
    <div v-show="showbtns" class="btn orange" @click="no">否/取消</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      showbtns: false,
      text: "",
      flag: ""
    };
  },
  props: {},
  methods: {
    yes() {
      this.props.btnYes();
      this._hide();
    },
    no() {
      this.props.btnNo();
      this._hide();
    },
    ini() {
      this._show();
      this.flag = "";
      this.text = this.props.text;
      if (this.props.class == "msg") {
        this.showbtns = false;
        this.flag = "msg";
        let self = this;
        setTimeout(() => {
          self._hide();
          self.props.callback();
        }, this.props.time);
      } else {
        this.flag = "";
        this.showbtns = true;
      }
    },
    _hide() {
      this.show = false;
    },
    _show() {
      this.show = true;
    }
  }
};
</script>
<style scoped>
.tip {
  width: 450px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.9);
  overflow: hidden;
  position: absolute;
  padding: 2rem;
  left: 50%;
  transform: translateX(-50%);
  animation: down 0.5s ease-out forwards;
}
.btn {
  width: 130px;
}
.tip .main {
  margin: 0rem 0 2rem;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.msg {
  padding: 15px 50px;
  width: auto;
}
.msg .main {
  margin: 0;
}
@keyframes down {
  0% {
    top: -2500px;
  }
  70% {
    top: 125px;
  }
  80% {
    top: 160px;
  }
  90% {
    top: 145px;
  }
  100% {
    top: 150px;
  }
}
</style>
