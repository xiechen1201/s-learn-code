<template>
  <div class="tabbar_left">
    <el-icon>
      <Expand />
    </el-icon>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">promotion management</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

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
