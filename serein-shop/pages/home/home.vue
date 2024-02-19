<template>
	<view class="search-box">
		<my-search></my-search>
	</view>
	<!-- 轮播 -->
	<view class="uni-margin-wrap">
		<swiper class="swiper" circular :autoplay="true" :indicator-dots="true">
			<swiper-item v-for="(item, index) in swiperList" :key="index">
				<navigator class="navigator" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id"><image :src="item.image_src"></image></navigator>
			</swiper-item>
		</swiper>
	</view>
	<!-- 导航 -->
	<view class="nav-list">
		<view class="nav-item" v-for="(item, index) in navList" :key="index" @click="handleClickNavItem(item)"><image :src="item.image_src"></image></view>
	</view>
	<!-- 分类 -->
	<view class="floor-list">
		<view class="floor-item" v-for="(item, i) in floorList" :key="i">
			<image :src="item.floor_title.image_src" class="floor-title"></image>
			<view class="floor-img-box">
				<!-- left-img-box -->
				<view class="left-img-box" @click="handleClickFloor(item)">
					<image :src="item.product_list[0].image_src" :style="{ width: item.product_list[0].image_width + 'rpx' }" mode="widthFix"></image>
				</view>
				<!-- right-img-box -->
				<view class="right-img-box">
					<view v-for="(item2, i2) in item.product_list" :key="i2" class="right-img-item" @click="handleClickFloor(item2)">
						<image v-if="i2 !== 0" :src="item2.image_src" mode="widthFix" :style="{ width: item2.image_width + 'rpx' }"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { setBadge } from '../../hooks/useCart.js';

setBadge();
</script>

<script>
export default {
	data() {
		return {
			swiperList: [],
			navList: [],
			floorList: []
		};
	},
	onLoad() {
		this.getSwiperList();
		this.getNavList();
		this.getFloorList();
	},
	methods: {
		async getSwiperList() {
			const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata');
			if (res.meta.status !== 200) {
				uni.$showMsg();
				return;
			}
			this.swiperList = res.message;
		},
		async getNavList() {
			const { data: res } = await uni.$http.get('/api/public/v1/home/catitems');

			if (res.meta.status !== 200) return uni.$showMsg();
			this.navList = res.message;
		},
		async getFloorList() {
			const { data: res } = await uni.$http.get('/api/public/v1/home/floordata');

			if (res.meta.status !== 200) return uni.$showMsg();

			res.message.forEach(el => {
				el.product_list.forEach(item => {
					item.url = '/subpkg/goods_list/goods_list?' + item.navigator_url.split('?')[1];
				});
			});

			this.floorList = res.message;
		},
		handleClickNavItem(item) {
			if (item.name === '分类') {
				uni.switchTab({
					url: '/pages/cate/cate'
				});
			} else {
			}
		},
		handleClickFloor(item) {
			if (item.product_list) {
				uni.navigateTo({
					url: item.product_list[0].url
				});
			} else {
				uni.navigateTo({
					url: item.url
				});
			}
		}
	}
};
</script>

<style lang="scss">
.search-box {
	position: sticky;
	top: 0;
	z-index: 10;
}

.swiper {
	height: 330rpx;

	.navigator,
	image {
		width: 100%;
		height: 100%;
	}
}

.nav-list {
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin: 15px 0;

	.nav-item image {
		width: 128rpx;
		height: 140rpx;
	}
}

.floor-list {
	.floor-title {
		height: 60rpx;
		width: 100%;
		display: flex;
	}

	.right-img-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.floor-img-box {
		display: flex;
		padding-left: 10rpx;
	}
}
</style>
