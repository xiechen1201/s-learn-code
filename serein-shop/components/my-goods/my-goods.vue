<template>
	<view class="goods-item">
		<view class="goods-item-left">
			<radio v-if="showRadio" :checked="goods.goods_state" color="#C00000" @click="radioClickHandler"></radio>
			<image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
		</view>
		<view class="goods-item-right">
			<view class="goods-name">{{ goods.goods_name }}</view>
			<view class="goods-info-box">
				<view class="goods-price">￥{{ tofixed }}</view>
				<uni-number-box v-if="showNum" :min="1" :value="goods.goods_count" @change="numChangeHandler"></uni-number-box>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'my-goods',
	props: {
		goods: {
			type: Object,
			defaul: {}
		},
		showRadio: {
			type: Boolean,
			default: false
		},
		showNum: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		tofixed() {
			return Number(this.goods.goods_price).toFixed(2);
		}
	},
	data() {
		return {
			defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
		};
	},
	methods: {
		radioClickHandler(e) {
			this.$emit('changeRadio', {
				goods_id: this.goods.goods_id,
				goods_state: !this.goods.goods_state
			});
		},
		numChangeHandler(e) {
			this.$emit('changeCount', {
				goods_id: this.goods.goods_id,
				goods_count: e
			});
		}
	}
};
</script>

<style lang="scss">
.goods-item {
	display: flex;
	padding: 10px 5px;
	border-bottom: 1px solid #f0f0f0;

	.goods-item-left {
		margin-right: 5px;
		display: flex;
		align-items: center;

		.goods-pic {
			width: 100px;
			height: 100px;
			display: block;
		}
	}

	.goods-item-right {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: space-between;

		.goods-name {
			font-size: 13px;
		}

		.goods-info-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.goods-price {
			font-size: 16px;
			color: #c00000;
		}
	}
}
</style>
