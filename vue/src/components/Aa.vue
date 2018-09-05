<template>
  <div class="view" @click="change">
    bnrythty
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
    change() {
      this.$router.push("/");
    },
    apc() {
      this.axios({
        method: "get",
        url: "http://127.0.0.1:9000/api",
        params: {
          firstName: "Fred",
          lastName: "Flintstone"
        }
      })
        .then(a => {
          console.log(a);
        })
        .catch(err => {
          console.error(err);
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
  background-color: rgba(100,200,0,1);
}
</style>
