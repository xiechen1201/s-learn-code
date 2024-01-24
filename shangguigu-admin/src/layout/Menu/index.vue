<template>
  <template v-for="(item, index) in menuList" :key="index">
    <!--没有子路由 -->
    <template v-if="!item.children">
      <el-menu-item
        v-if="!item.meta.hidden"
        :index="item.path"
        @click="onClickMenuItem"
      >
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>{{ item.meta.title }}</template>
      </el-menu-item>
    </template>
    <!--只有一个子路由 -->
    <template v-else-if="item.children && item.children.length === 1">
      <el-menu-item
        v-if="!item.meta.hidden"
        :index="item.path"
        @click="onClickMenuItem"
      >
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>{{ item.children[0].meta.title }}</template>
      </el-menu-item>
    </template>
    <!--有子路由 && 个数大于 1 -->
    <template v-else-if="item.children && item.children.length > 1">
      <el-sub-menu v-if="!item.meta.hidden" :index="item.path">
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <MenuSub :menuList="item.children" />
      </el-sub-menu>
    </template>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

defineOptions({
  name: 'MenuSub',
});

defineProps({
  menuList: {
    type: Array,
    default: () => [],
  },
});

const onClickMenuItem = (e) => {
  router.push(e.indexPath.join('/'));
};
</script>

<style lang="scss" scoped></style>
