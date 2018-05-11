<template>
  <div  id="app">fe
    <img @click="apc" src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  methods: {
    apc() {
      this.axios({
        method: "get",
        url: "127.0.0.1:9000/api",
        data: {
          firstName: "Fred",
          lastName: "Flintstone"
        },
        // success: (s) => {
        //   console.log(s);
        // },
        // error: (err) => {
        //   console.log(err);
        // }
      }).then(_=>{console.log(_);}).catch(_=>{
        console.error(_);
      });
      console.log(this.$store.state.count);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
