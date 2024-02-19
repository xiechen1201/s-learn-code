<template>
	<view class="my-settle-container">
		<label class="radio" @click="changeAllState">
			<radio color="#C00000" :checked="isFullCheck" />
			<text>全选</text>
		</label>
		<view class="amount-box">
			合计:
			<text class="amount">￥{{ checkedGoodsAmount }}</text>
		</view>
		<view class="btn-settle" @click="settlement">结算({{ checkedCount }})</view>
	</view>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
	name: 'my-settle',
	data() {
		return {
			seconds: 3,
			timer: null
		};
	},
	computed: {
		...mapState('moduleUser', ['token']),
		...mapState('moduleCart', ['cart']),
		...mapGetters('moduleUser', ['addstr']),
		...mapGetters('moduleCart', ['checkedCount', 'total', 'checkedGoodsAmount']),
		isFullCheck() {
			// 总数 === 已勾选的数量
			return this.total === this.checkedCount;
		}
	},
	methods: {
		...mapMutations('moduleCart', ['updateAllGoodsState']),
		...mapMutations('moduleUser', ['updateRedirectInfo']),
		changeAllState(data) {
			this.updateAllGoodsState(!this.isFullCheck);
		},
		settlement() {
			if (!this.checkedCount) {
				return uni.$showMsg('请选择要结算的商品！');
			}
			if (!this.addstr) {
				return uni.$showMsg('请选择收货地址！');
			}
			if (!this.token) {
				return this.delayNavigate();
			}
			this.payOrder();
		},
		delayNavigate() {
			this.seconds = 3;
			this.showTips(this.seconds);

			this.timer = setInterval(() => {
				this.seconds--;
				this.showTips(this.seconds);

				if (this.seconds <= 0) {
					clearInterval(this.timer);
					uni.switchTab({
						url: '/pages/my/my',
						success: () => {
							this.updateRedirectInfo({
								openType: 'switchTab',
								from: '/pages/cart/cart'
							});
						}
					});
				}
			}, 1000);
		},
		showTips(n) {
			uni.showToast({
				icon: 'none',
				title: '请登录后再结算！' + n + ' 秒后自动跳转到登录页',
				mask: true,
				duration: 1500
			});
		},
		// 微信支付
		async payOrder() {
			// 1. 创建订单
			const orderInfo = {
				order_price: 0.01,
				consignee_addr: this.addstr,
				goods: this.cart.filter(x => x.goods_state).map(x => ({ goods_id: x.goods_id, goods_number: x.goods_count, goods_price: x.goods_price }))
			};

			const { data: res } = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo);
			if (res.meta.status !== 200) {
				return uni.$showMsg('创建订单失败！');
			}
			const orderNumber = res.message.order_number;

			// 2. 订单预支付
			const { data: res2 } = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', { order_number: orderNumber });
			if (res2.meta.status !== 200) {
				return uni.$showError('预付订单生成失败！');
			}
			const payInfo = res2.message.pay;

			// 3. 发起微信支付
			const { err, succ } = await uni.requestPayment(payInfo);
			if (err) {
				return uni.$showMsg('订单未支付！');
			}

			const { data: res3 } = await uni.$http.post('/api/public/v1/my/orders/chkOrder', { order_number: orderNumber });

			if (res3.meta.status !== 200) {
				return uni.$showMsg('订单未支付！');
			}

			uni.showToast({
				title: '支付完成！',
				icon: 'success'
			});
		}
	}
};
</script>

<style lang="scss">
.my-settle-container {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 50px;
	background-color: white;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left: 5px;
	font-size: 14px;

	.radio {
		display: flex;
		align-items: center;
	}

	.amount {
		color: #c00000;
	}

	.btn-settle {
		height: 50px;
		min-width: 100px;
		background-color: #c00000;
		color: white;
		line-height: 50px;
		text-align: center;
		padding: 0 10px;
	}
}
</style>
