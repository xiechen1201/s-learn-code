<template>
  <div class="tabbar_left">
    <el-icon @click="onClickExpan">
      <component :is="iconName"></component>
    </el-icon>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="item in route.matched"
        :key="item.path"
        :to="{ path: item.path }"
      >
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import useSettingStore from '@/store/modules/setting';

const route = useRoute();
const settingStore = useSettingStore();

const iconName = computed(() => (settingStore.fold ? 'Expand' : 'Fold'));

const onClickExpan = () => {
  settingStore.fold = !settingStore.fold;
};
</script>

<style style="scss" scoped>
.tabbar_left {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .el-icon {
    margin-right: 10px;
  }
}
</style>
