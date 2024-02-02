<template>
  <div class="line-wrapper">
    <div class="title">未来30天游客预测</div>
    <div ref="chartRef" class="chart"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

let chartRef = ref<HTMLElement | null>(null);

onMounted(() => {
  let eInstance = echarts.init(chartRef.value);
  eInstance.setOption({
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      show: false,
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 400, 1290, 1330, 1320],
        type: 'line',
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'red', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'blue', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        smooth: true,
      },
    ],
    grid: {
      left: 50,
      bottom: 30,
      top: 20,
      right: 30,
    },
  });
});
</script>

<style lang="scss" scoped>
.line-wrapper {
  flex: 1;
  background: url(@/assets/images/screen/dataScreen-main-cb.png) no-repeat
    center/100% 100%;
  margin: 0 20px;

  .title {
    height: 60px;
    line-height: 60px;
    color: #fff;
    padding: 0 20px;
    font-size: 20px;
  }

  .chart {
    height: 200px;
  }
}
</style>
