<template>
	<my-address></my-address>
	<view class="cart-title">
		<uni-icons type="shop" size="18"></uni-icons>
		<text class="cart-title-text">购物车</text>
	</view>
	<view v-if="cart.length !== 0" class="cart-container">
		<uni-swipe-action>
			<block v-for="(goods, i) in cart" :key="i">
				<uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(goods)">
					<my-goods :goods="goods" :show-radio="true" :show-num="true" @changeRadio="handleChangeRadio" @changeCount="handleChangeCount"></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
	</view>
	<view v-else class="empty-cart">
		<image src="/static/cart_empty.png" class="empty-img"></image>
		<text class="tip-text">空空如也~</text>
	</view>
	<my-settle></my-settle>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
	data() {
		return {
			options: [
				{
					text: '删除',
					style: {
						backgroundColor: '#C00000'
					}
				}
			]
		};
	},
	computed: {
		...mapState('moduleCart', ['cart']),
		...mapGetters('moduleCart', ['total'])
	},
	watch: {
		total(newVal) {
			this.setBadge();
		}
	},
	onShow() {
		this.setBadge();
	},
	methods: {
		...mapMutations('moduleCart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
		setBadge() {
			uni.setTabBarBadge({
				index: 2,
				text: String(this.total)
			});
		},
		swipeActionClickHandler(data) {
			this.removeGoodsById(data.goods_id);
		},
		handleChangeRadio(data) {
			this.updateGoodsState(data);
		},
		handleChangeCount(data) {
			this.updateGoodsCount(data);
		}
	}
};
</script>

<style lang="scss">
.cart-title {
	height: 40px;
	display: flex;
	align-items: center;
	font-size: 14px;
	padding-left: 5px;
	border-bottom: 1px solid #efefef;
	.cart-title-text {
		margin-left: 10px;
	}
}
.cart-container {
	padding-bottom: 50px;
}
.empty-cart {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 150px;

	.empty-img {
		width: 150px;
		height: 150px;
	}

	.tip-text {
		font-size: 12px;
		color: gray;
		margin-top: 15px;
	}
}
</style>
