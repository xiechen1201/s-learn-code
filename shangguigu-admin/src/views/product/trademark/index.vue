<template>
  <el-card>
    <el-button type="primary" icon="plus" @click="dialogVisible = true">
      添加品牌
    </el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="序号" type="index" width="100px" align="center" />
      <el-table-column label="品牌名称" prop="tmName" align="center" />
      <el-table-column label="Logo" align="center">
        <template #default="{ row }">
          <img :src="row.logoUrl" style="width: 50px" alt="" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default>
          <el-button
            type="primary"
            size="small"
            icon="edit"
            @click="onClickEditBtn"
          />
          <el-button type="danger" size="small" icon="delete" />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :total="total"
      :page-sizes="[10, 30, 50, 100]"
      background
      layout="->, prev, pager, next, sizes, total"
      @change="onPageChange"
    />
    <!-- 弹窗 -->
    <el-dialog v-model="dialogVisible" title="添加品牌" width="30%">
      <EditForm />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            确 认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getHasTardemark } from '@/apis/product';
import type { IRecords } from '@/apis/type';
import EditForm from './coms/EditForm.vue';

let tableData = ref<IRecords[]>([]);
let currentPage = ref(1);
let pageSize = ref(10);
let total = ref(0);
let dialogVisible = ref(false);

const getTableList = () => {
  getHasTardemark({ page: currentPage.value, limit: pageSize.value }).then(
    (res) => {
      if (res.code === 200) {
        tableData.value = res.data.records;
        total.value = res.data.total;
      }
    },
  );
};

const onPageChange = () => {
  getTableList();
};

onMounted(() => {
  getTableList();
});

const onClickEditBtn = () => {
  dialogVisible.value = true;
};
</script>

<style lang="scss" scoped>
.el-table,
.el-pagination {
  margin-top: 20px;
}
</style>
