<template>
  <el-card>
    <el-button type="primary" icon="plus">添加品牌</el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="序号" prop="" width="100px" align="center" />
      <el-table-column label="品牌名称" prop="" align="center" />
      <el-table-column label="Logo" prop="" align="center" />
      <el-table-column label="操作" prop="" align="center" />
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :total="total"
      :page-sizes="[10, 30, 50, 100]"
      background
      layout="->, prev, pager, next, sizes"
    />
  </el-card>
</template>

<script setup>
import { ref } from 'vue';

let tableData = [];

let currentPage = ref(1);
let pageSize = ref(10);
let total = ref(0);
</script>

<style lang="scss" scoped>
.el-table,
.el-pagination {
  margin-top: 20px;
}
</style>
