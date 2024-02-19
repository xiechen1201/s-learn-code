<template>
	<view v-if="isShowBtn" class="address-choose-box"><button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址+</button></view>
	<view v-else class="address-info-box" @click="chooseAddress">
		<view class="row1">
			<view class="row1-left">
				<view class="username">
					收货人：
					<text>{{ address.userName }}</text>
				</view>
			</view>
			<view class="row1-right">
				<view class="phone">
					电话：
					<text>{{ address.telNumber }}</text>
				</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		<view class="row2">
			<view class="row2-left">收货地址：</view>
			<view class="row2-right">{{ addstr }}</view>
		</view>
	</view>
	<view class="address-border"></view>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
	name: 'my-address',
	data() {
		return {};
	},
	computed: {
		...mapState('moduleUser', ['address']),
		...mapGetters('moduleUser', ['addstr']),
		isShowBtn() {
			return Object.keys(this.address).length === 0;
		}
	},
	methods: {
		...mapMutations('moduleUser', ['updateAddress']),
		chooseAddress() {
			uni.chooseAddress()
				.then(res => {
					this.updateAddress(res);
				})
				.catch(err => {
					if (err && (err.errMsg === 'chooseAddress:fail auth deny' || err.errMsg === 'chooseAddress:fail authorize no response')) {
						// 调用 this.reAuth() 方法，向用户重新发起授权申请
						this.reAuth();
					}
				});
		},
		async reAuth() {
			const [err2, confirmResult] = await uni.showModal({
				content: '检测到您没打开地址权限，是否去设置打开？',
				confirmText: '确认',
				cancelText: '取消'
			});

			if (err2) return;
			if (confirmResult.cancel) {
				return uni.$showMsg('您取消了地址授权！');
			}
			if (confirmResult.confirm)
				return uni.openSetting({
					success: settingResult => {
						if (settingResult.authSetting['scope.address']) {
							return uni.$showMsg('授权成功！请选择地址');
						}
						if (!settingResult.authSetting['scope.address']) {
							return uni.$showMsg('您取消了地址授权！');
						}
					}
				});
		}
	}
};
</script>

<style lang="scss">
.address-border {
	border: 1px solid #bfbfbf;
}

.address-choose-box {
	height: 90px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.address-info-box {
	font-size: 12px;
	height: 90px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0 5px;

	.row1 {
		display: flex;
		justify-content: space-between;

		.row1-right {
			display: flex;
			align-items: center;

			.phone {
				margin-right: 5px;
			}
		}
	}

	.row2 {
		display: flex;
		align-items: center;
		margin-top: 10px;

		.row2-left {
			white-space: nowrap;
		}
	}
}
</style>
