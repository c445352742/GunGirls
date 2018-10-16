<template>
  <div class="view">
    <div class="areas"></div>
    <div class="self"></div>
    <div class="wrap">
      <div class="btn blue" @click="">主页</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  },
  mounted() {
    console.log(this.$store);
  },
  methods: {},
  components: {}
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "./style.css";
</style>
