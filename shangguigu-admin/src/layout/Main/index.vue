<template>
  <RouterView #default="{ Component }">
    <Transition name="fade" mode="out-in">
      <Component :key="key" :is="Component" />
    </Transition>
  </RouterView>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import useSettingStore from '@/store/modules/setting';

defineOptions({
  name: 'MainContent',
});

const settingStore = useSettingStore();
let key = ref(0);

watch(
  () => settingStore.refsh,
  () => {
    key.value++;
  },
);
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
