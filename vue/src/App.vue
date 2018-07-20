<template>
  <div id="app">fe
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
