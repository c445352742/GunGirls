<template>
  <div id="app">
    <transition name="route" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  mounted() {
    (function(doc, win) {
      var docEl = doc.documentElement,
        resizeEvt =
          "orientationchange" in window ? "orientationchange" : "resize",
        recalc = function() {
          var clientWidth = docEl.clientWidth;
          if (!clientWidth) return;
          if (docEl.clientWidth / 16 > docEl.clientHeight / 9) {
            clientWidth = (docEl.clientHeight * 16) / 9;
          }
          clientWidth = Math.max(1200, clientWidth);
          docEl.style.fontSize = 10 * (clientWidth / 750) + "px";
        };
      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener("DOMContentLoaded", recalc, false);
    })(document, window);
  }
};
</script>

<style>
@import "./assets/style.css";
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  font-family: "Arial";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  perspective: 100vw;
  color: #333333;
  perspective-origin: center center;
  overflow: hidden;
}

.route-leave-active {
  animation: leaveA 0.3s linear;
}
.route-enter-active {
  animation: enterA 0.3s linear;
  /* transform-origin: 40% 50% 0; */
}
@keyframes leaveA {
  0% {
    transform: translate3d(0, 0, 0) rotate3d(0, 0, 0, 0);
    transform-origin: 40% 50% 0;
  }
  100% {
    transform: translate3d(0, 0vh, -50vw) rotate3d(0, 1, 0, 90deg);
    transform-origin: 40% 50% 0;
  }
}
@keyframes enterA {
  0% {
    transform: translate3d(0, 0vh, -50vw) rotate3d(0, 1, 0, -90deg);
    transform-origin: 40% 50% 0;
  }

  100% {
    transform: translate3d(0, 0, 0) rotate3d(0, 0, 0, 0);
    transform-origin: 40% 50% 0;
  }
}
</style>
