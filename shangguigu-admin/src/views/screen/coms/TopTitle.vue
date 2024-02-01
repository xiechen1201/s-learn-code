<template>
  <div class="left">
    <span @click="onClickHome">首页</span>
  </div>
  <div class="center">智慧旅游大数据平台</div>
  <div class="right">
    <span>统计报告</span>
    <span>{{ currentTime }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

let currentTime = ref('');
let timer: any;
const onClickHome = () => {
  router.push('/');
};

const joinZero = (num: number): string | number => {
  return num < 10 ? '0' + num : num;
};
const getCurrentTime = () => {
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  let day = new Date().getDate();
  let hour = new Date().getHours();
  let minute = new Date().getMinutes();
  let second = new Date().getSeconds();

  currentTime.value = `${year}-${joinZero(month)}-${joinZero(day)} ${joinZero(
    hour,
  )}:${joinZero(minute)}:${joinZero(second)}`;
};

timer = setInterval(() => {
  getCurrentTime();
}, 1000);

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<style lang="scss" scoped>
.left {
  flex: 1;
  background: url(@/assets/images/screen/dataScreen-header-left-bg.png)
    no-repeat center/cover;

  span {
    float: right;
    display: block;
    width: 150px;
    height: 40px;
    line-height: 40px;
    background: url(@/assets/images/screen/dataScreen-header-btn-bg-l.png)
      no-repeat center/100% 100%;
    text-align: center;
    color: #29fcff;
    font-size: 18px;
  }
}

.center {
  flex: 2;
  height: 74px;
  background: url(@/assets/images/screen/dataScreen-header-center-bg.png)
    no-repeat center/100% 100%;
  text-align: center;
  color: #29fcff;
  font-size: 40px;
  line-height: 74px;
}

.right {
  flex: 1;
  display: flex;
  align-items: center;
  background: url(@/assets/images/screen/dataScreen-header-right-bg.png)
    no-repeat center/cover;

  span:nth-child(1) {
    display: block;
    width: 150px;
    height: 40px;
    background: url(@/assets/images/screen/dataScreen-header-btn-bg-l.png)
      no-repeat center/100% 100%;
    line-height: 40px;
    text-align: center;
    color: #29fcff;
    font-size: 18px;
  }

  span:nth-child(2) {
    color: #29fcff;
    margin-left: 100px;
  }
}
</style>
