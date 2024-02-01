<template>
  <div class="container">
    <div ref="screenRef" class="screen">
      <header class="top">
        <TopTitle />
      </header>
      <main class="main">
        <div class="left">
          <Tourist />
          <Sex />
          <Age />
        </div>
        <div class="center">
          <Map />
          <Line />
        </div>
        <div class="right">右</div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import TopTitle from './coms/TopTitle.vue';
import Tourist from './coms/Tourist.vue';
import Sex from './coms/Sex.vue';
import Age from './coms/Age.vue';
import Map from './coms/Map.vue';
import Line from './coms/Line.vue';

let screenRef = ref<HTMLElement | null>(null);

function getScreen(w = 1920, h = 1080) {
  const ww = document.documentElement.clientWidth / w;
  const hh = document.documentElement.clientHeight / h;

  return ww < hh ? ww : hh;
}

onMounted(() => {
  screenRef.value!.style.transform = `scale(${getScreen()}) translate(-50%, -50%)`;
});

window.onresize = () => {
  screenRef.value!.style.transform = `scale(${getScreen()}) translate(-50%, -50%)`;
};
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background: url(@/assets/images/screen/bg.png) no-repeat center/100% 100%;

  .screen {
    position: relative;
    top: 50%;
    left: 50%;
    width: 1920px;
    height: 1080px;
    transform-origin: left top;

    .top {
      width: 100%;
      height: 40px;
      display: flex;
    }

    .main {
      display: flex;

      .right {
        flex: 1;
      }

      .left {
        flex: 1;
        display: flex;
        flex-direction: column;
        height: calc(1080px - 40px);
      }

      .center {
        flex: 2;
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>
