<template>
  <div class="layout_continer">
    <!-- 左侧菜单 -->
    <div :class="{ layout_slider: true, fold: settingStore.fold }">
      <Logo />
      <el-scrollbar class="scrollbar">
        <el-menu
          background-color="#001529"
          text-color="#fff"
          :default-active="activeIndex"
          :collapse="settingStore.fold"
        >
          <Menu :menuList="userStore.menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div :class="{ layout_tabbar: true, fold: settingStore.fold }">
      <Tabbar />
    </div>
    <!-- 内容展示 -->
    <div :class="{ layout_main: true, fold: settingStore.fold }">
      <Main />
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './Logo/index.vue';
import Menu from './Menu/index.vue';
import Tabbar from './Tabbar/index.vue';
import Main from './Main/index.vue';
import useUserStore from '@/store/modules/user';
import useSettingStore from '@/store/modules/setting';
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

defineOptions({
  name: 'Layout',
});

const route = useRoute();
const userStore = useUserStore();
const settingStore = useSettingStore();

let activeIndex = ref();

watchEffect(() => {
  let paths = route.path.split('/');
  activeIndex.value = paths[paths.length - 1];
});
</script>

<style lang="scss" scoped>
.layout_continer {
  width: 100%;
  height: 100vh;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    transition: all 0.2s;

    &.fold {
      width: $base-menu-min-width;
    }

    .scrollbar {
      width: 100%;
      height: calc(100% - $base-menu-logo-height - 40px);

      .el-menu {
        border-right: none;
      }
    }
  }

  .layout_tabbar {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    width: calc(100vw - $base-menu-width - 10px - 10px);
    height: $base-tabbar-height;
    padding: 20px 10px;
    transition: all 0.2s;
    border-bottom: 1px solid #ccc;

    &.fold {
      left: $base-menu-min-width;
      width: calc(100vw - $base-menu-min-width - 10px);
    }
  }

  .layout_main {
    position: absolute;
    top: $base-tabbar-height + 40px;
    left: $base-menu-width;
    width: calc(100vw - $base-menu-width);
    height: calc(100vh - $base-tabbar-height - 40px);
    padding: 20px;
    box-sizing: border-box;
    overflow: auto;
    transition: all 0.2s;

    &.fold {
      left: $base-menu-min-width;
      width: calc(100% - $base-menu-min-width);
    }
  }
}
</style>
