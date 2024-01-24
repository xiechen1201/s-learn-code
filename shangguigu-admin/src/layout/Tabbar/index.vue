<template>
  <div class="tabber">
    <Breadcrumb />
    <Setting />
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from './Breadcrumb.vue';
import Setting from './Setting.vue';
</script>

<style lang="scss" scoped>
.tabber {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
