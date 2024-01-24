<template>
  <div class="logo" v-if="!setting.logoHidden">
    <img :src="setting.logo" alt="" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting';
</script>

<style lang="scss" scoped>
.logo {
  height: $base-menu-logo-height;
  display: flex;
  align-items: center;
  padding: 20px;

  img {
    width: $base-menu-logo-width;
    height: $base-menu-logo-height;
  }

  p {
    margin-left: 10px;
    color: #fff;
    font-size: $base-menu-logo-fontSize;
  }
}
</style>
