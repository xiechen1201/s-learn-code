<template>
  <div class="tabbar_right">
    <el-button type="primary" icon="Refresh" circle></el-button>
    <el-button type="primary" icon="FullScreen" circle></el-button>
    <el-button type="primary" icon="Setting" circle></el-button>
    <img style="height: 32px; width: 32px; margin: 0 10px" src="/logo.png" />
    <el-dropdown>
      <span class="el-dropdown-link">
        {admin}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style style="scss" scoped>
.tabbar_right {
  display: flex;
  align-items: center;
}
</style>
