<template>
	<view class="my-search-container" :style="{'background-color': bgcolor}">
		<view class="my-search-box" :style="{ 'border-radius': radius }" @click="handleClickSearch">
			<icon type="search" size="17"></icon>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-search",
		props: {
			bgcolor: {
				type: String,
				default: "#c00000"
			},
			radius: {
				type: String,
				default: "15px"
			}
		},
		data() {
			return {};
		},
		methods: {
			handleClickSearch() {
				uni.navigateTo({
					url:"/subpkg/search/search"
				})
			}
		}
	}
</script>

<style lang="scss">
	.my-search-container {
		height: 50px;
		padding: 0 10px;
		display: flex;
		align-items: center;

		.my-search-box {
			height: 36px;
			background-color: #ffffff;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			.placeholder {
				font-size: 15px;
				margin-left: 5px;
				color: #B5B5B5;
			}
		}
	}
</style>
