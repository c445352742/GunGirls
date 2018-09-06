<template>
  <div class="view">
    <Login v-if="show" />
    <div class="wrap">
      <div class="btn blue" @click="showLogin">开始</div>
    </div>
  </div>
</template>

<script>
import Login from "@/components/login";
export default {
  data() {
    return {
      show: false
    };
  },
  methods: {
    showLogin() {
      this.show = !this.show;
    }
  },
  components: {
    Login
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "./style.css";
</style>
