<template>
  <div class="cover">
    <div class="login">
      <h1>Login</h1>
      <div class="line">
        <div class="t">用户名:</div><input type="text" v-model="name">
      </div>
      <div class="line">
        <div class="t">密码:</div><input type="password" v-model="pwd">
      </div>
      <div class="line btns">
        <div class="btn orange">Register</div>
        <div class="btn blue" @click="submit">SignIn</div>
      </div>
    </div>
  </div>
</template>

<script>
const encrypt = require("@/assets/md5.js");
export default {
  data() {
    return {
      name: "a",
      pwd: "sfd"
    };
  },
  methods: {
    submit() {
      let self = this;
      this.ajax({
        method: "post",
        url: "http://127.0.0.1:9000/api/login",
        data: {
          name: self.name,
          pwd: encrypt.md5(self.pwd)
        },
        success(result) {
          if (result.status === "success") {
            console.log(result);
          } else {
          }
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cover {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}
.login {
  width: 400px;
  height: 260px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.7);
  overflow: hidden;
  position: relative;
  animation: down 0.5s ease-out forwards;
  padding: 20px;
}
h1 {
  margin: 10px 0 20px;
}
.t {
  width: 60px;
  text-align: right;
  display: inline-block;
  margin-right: 10px;
}
.line {
  margin-bottom: 10px;
}
.line input {
  width: 200px;
  padding: 0 10px;
}
.btns {
  position: absolute;
  bottom: 30px;
  width: 100%;
  margin-left: -20px;
}
@keyframes down {
  0% {
    top: -3000px;
  }
  70% {
    top: -25px;
  }
  80% {
    top: 10px;
  }
  90% {
    top: -5px;
  }
  100% {
    top: 0;
  }
}
</style>
