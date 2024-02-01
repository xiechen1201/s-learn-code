<template>
  <div class="tourist-box">
    <div class="top">
      <span class="title">游客比例</span>
      <span class="bg"></span>
      <span class="count">可预约总量9999人</span>
    </div>
    <div class="number">
      <span>2</span>
      <span>1</span>
      <span>6</span>
      <span>9</span>
      <span>0</span>
      <span>8</span>
      <span>人</span>
    </div>
    <div ref="chartRef" class="chart"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import 'echarts-liquidfill';

let chartRef = ref<HTMLElement | null>(null);

onMounted(() => {
  let eInstance = echarts.init(chartRef.value);
  eInstance.setOption({
    series: {
      type: 'liquidFill',
      data: [0.6, 0.4, 0.2],
      radius: '90%',
    },
  });
});
</script>

<style lang="scss" scoped>
.tourist-box {
  flex: 1.2;
  margin-top: 10px;
  background: url(@/assets/images/screen/dataScreen-main-lb.png) no-repeat
    center/100% 100%;

  .top {
    height: 75px;
    padding-top: 10px;

    .title {
      margin-left: 20px;
      color: #fff;
      font-size: 20px;
    }

    .bg {
      display: block;
      width: 68px;
      height: 7px;
      margin-left: 20px;
      margin-top: 10px;
      background: url(@/assets/images/screen/dataScreen-title.png) no-repeat
        center/100% 100%;
    }

    .count {
      float: right;
      margin-right: 20px;
      color: #fff;
      font-size: 20px;
    }
  }

  .number {
    display: flex;
    padding: 10px;

    span {
      flex: 1;
      background: url(@/assets/images/screen/total.png) no-repeat center/100%
        100%;
      text-align: center;
      line-height: 40px;
      color: #29fcff;
      font-weight: bolder;
    }
  }

  .chart {
    width: 100%;
    height: 260px;
  }
}
</style>
