<template>
	<view>
		<my-userinfo v-if="token"></my-userinfo>
		<my-login v-else></my-login>
	</view>
</template>

<script setup>
import { computed } from 'vue';
import { mapState, useStore } from 'vuex';
import { setBadge } from '@/hooks/useCart.js';

setBadge();

const store = useStore();
const token = computed(() => store.state.moduleUser.token);
</script>

<style lang="scss">
page,
page > view,
.my-container {
	height: 100%;
}
</style>
