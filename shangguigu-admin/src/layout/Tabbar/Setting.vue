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
    <el-button type="primary" icon="Setting" circle></el-button>
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
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user';
import useSettingStore from '@/store/modules/setting';

const userStore = useUserStore();
const settingStore = useSettingStore();

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
