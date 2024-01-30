<template>
  <el-form label-width="100">
    <el-form-item label="品牌名称：">
      <el-input placeholder="请输入品牌的名称" />
    </el-form-item>
    <el-form-item label="品牌Logo：">
      <el-upload class="upload-box" drag action="" multiple>
        <el-icon>
          <upload-filled />
        </el-icon>
      </el-upload>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {} from 'vue';
</script>

<style lang="scss" scoped>
.upload-box {
  width: 100%;
}
</style>
