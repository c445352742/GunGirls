<template>
  <div class="view" v-on:click="cha">
    home
    <img alt="" @click="apc">
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    cha() {
      // this.$router.push("/a");
    },
    apc() {
      this.ajax({
        method: "get",
        url: "http://127.0.0.1:9000/api",
        params: {
          firstName: "Fred",
          lastName: "Flintstone"
        },
        success(e) {
          console.log(e);
        },
        error(e) {
          console.log(e);
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 100, 200, 1);
}
img {
  width: 300px;
  height: 250px;
  background: url(/static/a.png) center no-repeat;
}
</style>
