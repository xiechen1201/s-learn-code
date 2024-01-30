<template>
  <div class="tabbar_right">
    <el-button
      type="primary"
      icon="Refresh"
      circle
      @click="onClickRefreshBtn"
    ></el-button>
    <el-button
      type="primary"
      icon="FullScreen"
      circle
      @click="onClickFullScreenBtn"
    ></el-button>
    <el-button
      type="primary"
      icon="Setting"
      circle
      @click="onClickSetting"
    ></el-button>
    <img
      class="avatar-img"
      style="height: 32px; width: 32px; margin: 0 10px"
      :src="userStore.avatar"
    />
    <el-dropdown>
      <span>
        {{ userStore.userName }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="onClickLoginOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <el-drawer
    v-model="drawer"
    size="15%"
    append-to-body
    title="主题设置"
    direction="rtl"
  >
    <el-form>
      <el-form-item label="暗黑模式：">
        <el-switch v-model="isDark" @change="onChangeSwitch" />
      </el-form-item>
      <el-form-item label="主题颜色：">
        <el-color-picker v-model="themeColor" @change="onChangeColor" />
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user';
import useSettingStore from '@/store/modules/setting';
import { ref, onMounted } from 'vue';

const userStore = useUserStore();
const settingStore = useSettingStore();
const drawer = ref(false);
const isDark = ref(false);
const themeColor = ref('');

onMounted(() => {
  const el = document.documentElement;
  let res = getComputedStyle(el).getPropertyValue(`--el-color-primary`);
  themeColor.value = res;
});

const onClickRefreshBtn = () => {
  settingStore.refsh = !settingStore.refsh;
};

const onClickFullScreenBtn = () => {
  let full = document.fullscreenElement;

  if (!full) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

const onClickSetting = () => {
  drawer.value = true;
};

const onChangeSwitch = () => {
  document.documentElement.className =
    document.documentElement.className.includes('dark') ? '' : 'dark';
};

const onChangeColor = (value: string) => {
  document.documentElement.style.setProperty('--el-color-primary', value);
};

const onClickLoginOut = () => {
  userStore.loginOut();
};
</script>

<style style="scss" scoped>
.tabbar_right {
  display: flex;
  align-items: center;

  .avatar-img {
    margin: 0 13px;
  }
}
</style>
