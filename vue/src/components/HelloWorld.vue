<template>
  <div>
    asdfwef
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
