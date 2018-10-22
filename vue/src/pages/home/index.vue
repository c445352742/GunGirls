<template>
  <div class="view">
    <div class="info">
      <div class="left">
        <div class="lv">ds. 1</div>
        <div class="txt">
          <div class="title">Guardian</div>
          <div class="name">AliPay等</div>
        </div>
      </div>
    </div>
    <div class="dest">
      <div class="name">Menu</div>
      <div class="adventure cell a">adventure</div>
      <div class="gears cell">gears</div>
      <div class="hero cell">hero</div>
      <div class="package cell">package</div>
      <div class="skill cell">skill</div>
    </div>
    <div class="self"></div>
    <div class="host" :style="{backgroundImage:'url(/static/'+card+'.png)'}"></div>
    <div class="setting">
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      card: "1"
    };
  },
  mounted() {
    let self = this;
    this.ajax({
      method: "post",
      url: "http://127.0.0.1:9000/api/refreshAll",
      success(result) {
        if (result.status === "success") {
        } else {
          self.$tip({
            class: "msg",
            text: result.data.msg
          });
        }
      },
      error(result) {
        self.$tip({
          class: "msg",
          text: result.data ? result.data.msg : 'server error'
        });
      }
    });
  },
  methods: {},
  components: {}
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import "./style.scss"
</style>
