<template>
	<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
		<swiper-item v-for="(item, i) in goods_info.pics" :key="i"><image :src="item.pics_big" @click="preview(i)"></image></swiper-item>
	</swiper>
	<view class="goods-info-box">
		<view v-show="goods_info.goods_price" class="price">￥{{ goods_info.goods_price }}</view>
		<view class="goods-info-body">
			<view class="goods-name">{{ goods_info.goods_name }}</view>
			<view class="favi">
				<uni-icons type="star" size="18" color="gray"></uni-icons>
				<text>收藏</text>
			</view>
		</view>
		<view class="yf">快递：免运费</view>
	</view>
	<rich-text :nodes="goods_info.goods_introduce"></rich-text>
	<view class="goods_nav">
		<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="handleClickLeftBtn" @buttonClick="handleClickRightBtn"></uni-goods-nav>
	</view>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
	data() {
		return {
			goods_info: {},
			options: [
				{
					icon: 'shop',
					text: '店铺'
				},
				{
					icon: 'cart',
					text: '购物车',
					info: 0
				}
			],
			buttonGroup: [
				{
					text: '加入购物车',
					backgroundColor: '#ff0000',
					color: '#fff'
				},
				{
					text: '立即购买',
					backgroundColor: '#ffa200',
					color: '#fff'
				}
			]
		};
	},
	computed: {
		...mapState({
			cart: state => state.moduleCart.cart
		}),
		...mapGetters('moduleCart', ['total'])
	},
	watch: {
		total: {
			handler(newVal) {
				const result = this.options.find(el => el.text === '购物车');

				if (!result) return;
				result.info = newVal;
			},
			immediate: true
		}
	},
	onLoad(options) {
		const goods_id = options.goods_id;
		this.getGoodsDetail(goods_id);
	},
	methods: {
		...mapMutations('moduleCart', ['addToCart']),
		async getGoodsDetail(goods_id) {
			const {
				data: { meta, message }
			} = await uni.$http.get('/api/public/v1/goods/detail', {
				goods_id
			});

			if (meta.status !== 200) return uni.$showMsg();
			message.goods_introduce = message.goods_introduce.replace(/\<img /g, '<img style="display: block;" ').replace(/\.webp/g, '.jpg ');

			this.goods_info = message;
		},
		preview(i) {
			uni.previewImage({
				current: i,
				urls: this.goods_info.pics.map(x => x.pics_big)
			});
		},
		handleClickLeftBtn(e) {
			if (e.content.text === '购物车') {
				uni.switchTab({
					url: '/pages/cart/cart'
				});
			}
		},
		handleClickRightBtn(e) {
			if (e.content.text === '加入购物车') {
				const goods = {
					goods_id: this.goods_info.goods_id, // 商品的Id
					goods_name: this.goods_info.goods_name, // 商品的名称
					goods_price: this.goods_info.goods_price, // 商品的价格
					goods_count: 1, // 商品的数量
					goods_small_logo: this.goods_info.goods_small_logo, // 商品的图片
					goods_state: true // 商品的勾选状态
				};

				this.addToCart(goods);
			}
		}
	}
};
</script>

<style lang="scss">
swiper {
	height: 750rpx;

	image {
		width: 100%;
		height: 100%;
	}
}
.goods-info-box {
	padding: 10px;
	padding-right: 0;

	.price {
		color: #c00000;
		font-size: 18px;
		margin: 10px 0;
	}

	.goods-info-body {
		display: flex;
		justify-content: space-between;

		.goods-name {
			font-size: 13px;
			padding-right: 10px;
		}
		.favi {
			width: 120px;
			font-size: 12px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border-left: 1px solid #efefef;
			color: gray;
		}
	}

	.yf {
		margin: 10px 0;
		font-size: 12px;
		color: gray;
	}
}
rich-text {
	padding-bottom: 50px;
}
.goods_nav {
	// 为商品导航组件添加固定定位
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
}
</style>
