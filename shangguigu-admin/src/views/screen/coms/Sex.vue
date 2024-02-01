<template>
  <div class="tourist-box">
    <div class="top">
      <span class="title">性别比例</span>
      <span class="bg"></span>
    </div>
    <div class="sex-box">
      <div class="man sex-common">
        <img src="@/assets/images/screen/man.png" alt="" srcset="" />
      </div>
      <div class="woman sex-common">
        <img src="@/assets/images/screen/woman.png" alt="" srcset="" />
      </div>
    </div>
    <div class="rate">
      <p>男士58%</p>
      <p>女士42%</p>
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
    grid: {
      left: 20,
      top: 0,
      right: 20,
      bottom: 0,
    },
    xAxis: {
      show: false,
      min: 0,
      max: 100,
    },
    yAxis: {
      show: false,
      type: 'category',
    },
    series: [
      {
        type: 'bar',
        data: [58],
        barWidth: 20,
        z: 100,
        itemStyle: {
          color: '#007AFE',
          borderRadius: 20,
        },
      },
      {
        type: 'bar',
        data: [100],
        barWidth: 20,
        barGap: '-100%',
        itemStyle: {
          color: '#ED7389',
          borderRadius: 20,
        },
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

  .sex-box {
    display: flex;
    justify-content: center;

    .man {
      background: url(@/assets/images/screen/man-bg.png) no-repeat center/100%
        100%;
    }

    .woman {
      background: url(@/assets/images/screen/woman-bg.png) no-repeat center/100%
        100%;
    }

    .sex-common {
      width: 115px;
      height: 115px;
      margin: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .rate {
    display: flex;
    justify-content: space-between;
    color: #fff;
    padding: 0 20px;
  }

  .chart {
    height: 60px;
  }
}
</style>
