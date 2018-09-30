<template>
  <div class="tip">
    <div>asfew</div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["msg"],
  mounted() {
    console.log(this.props)
  }
};
</script>
<style scoped>
.tip {
  width: 400px;
  height: 260px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.7);
  overflow: hidden;
  position: relative;
  padding: 20px;
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
