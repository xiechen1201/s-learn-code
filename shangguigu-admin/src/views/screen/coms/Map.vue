<template>
  <div class="map-wrapper" ref="mapRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import china from '@/libs/china.json';

let mapRef = ref<HTMLElement | null>(null);

echarts.registerMap('china', china as any);

function createSeriesItem(arr: any[]) {
  let res = {
    type: 'lines',
    data: [
      {
        coords: arr,
      },
    ],
    // 特效
    effect: {
      show: true,
      symbol: 'arrow',
      symbolSize: 10,
      color: '#fff',
    },
    lineStyle: {
      color: '#fff',
      width: 2,
      curveness: 0.3,
    },
  };
  return res;
}

onMounted(() => {
  let eInstance = echarts.init(mapRef.value);
  eInstance.setOption({
    geo: [
      {
        map: 'china',
        roam: true,
        top: 120,
        right: 200,
        bottom: 50,
        left: 200,
        zoom: 1.2,
        label: {
          show: true,
          color: '#fff',
          fontSize: 14,
        },
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#20458E',
              },
              {
                offset: 1,
                color: '#0F2551',
              },
            ],
            global: false, // 缺省为 false
          },
          borderColor: '#5885B5',
        },
        emphasis: {
          itemStyle: {},
          label: {
            fontSize: 30,
          },
        },
      },
    ],
    series: [
      createSeriesItem([
        [116.405285, 39.904989],
        [91.132212, 29.660361],
      ]),
      createSeriesItem([
        [116.405285, 39.904989],
        [117.000923, 36.675807],
      ]),
      createSeriesItem([
        [116.405285, 39.904989],
        [111.670801, 40.818311],
      ]),
      createSeriesItem([
        [116.405285, 39.904989],
        [126.642464, 45.756967],
      ]),
    ],
  });
});
</script>

<style lang="scss" scoped>
.map-wrapper {
  flex: 3;
}
</style>
