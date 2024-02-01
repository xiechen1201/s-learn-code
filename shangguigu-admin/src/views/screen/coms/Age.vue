<template>
  <div class="tourist-box">
    <div class="top">
      <span class="title">年龄比例</span>
      <span class="bg"></span>
    </div>
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
    tooltip: {
      trigger: 'item',
    },
    legend: {
      right: 20,
      orient: 'vertical',
      textStyle: {
        color: '#fff',
        fontSize: '14px',
      },
    },
    series: [
      {
        // name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: '0-20' },
          { value: 735, name: '20-40' },
          { value: 580, name: '40-60' },
          { value: 484, name: '60-80' },
          { value: 300, name: '80+' },
        ],
      },
    ],
  });
});
</script>

<style lang="scss" scoped>
.tourist-box {
  flex: 1;
  margin-top: 10px;
  background: url(@/assets/images/screen/dataScreen-main-rc.png) no-repeat
    center/100% 100%;

  .top {
    padding-top: 10px;
    height: 45px;

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
  }

  .chart {
    height: 247px;
  }
}
</style>
