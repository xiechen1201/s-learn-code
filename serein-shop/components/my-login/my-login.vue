<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
		<view class="tips-text">登录后尽享更多权益</view>
	</view>
</template>

<script setup>
import { computed, unref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const redirectInfo = computed(() => store.state.moduleUser.redirectInfo);

// 获取用户信息
function getUserInfo({ detail }) {
	if (detail.errMsg.includes('ok')) {
		updateUserInfo(detail);
		getToken(detail);
	} else {
		uni.$showMsg('您没有进行登录授权！');
	}
}

// 更新用户信息
function updateUserInfo(detail) {
	store.commit('moduleUser/updateUserInfo', detail.userInfo);
}

// 进行登录
async function getToken(info) {
	const res = await uni.login().catch(err => err);

	if (res.errMsg && res.errMsg !== 'login:ok') {
		return uni.$showError('登录失败！');
	}

	const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin', {
		code: res.code,
		encryptedData: info.encryptedData,
		iv: info.iv,
		rawData: info.rawData,
		signature: info.signature
	});

	loginResult.meta.status === 200 ? uni.$showMsg('登录成功') : uni.$showMsg('登录失败！');
	store.commit('moduleUser/updateToken', res.code);
	navigateBack();
}

// 跳转页面
function navigateBack() {
	const data = unref(redirectInfo);

	if (data && data.openType === 'switchTab') {
		uni.switchTab({
			url: data.from,
			complete: () => {
				store.commit('moduleUser/updateRedirectInfo', null);
			}
		});
	}
}
</script>

<style lang="scss">
.login-container {
	// 登录盒子的样式
	height: 750rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #f8f8f8;
	position: relative;
	overflow: hidden;

	// 绘制登录盒子底部的半椭圆造型
	&::after {
		content: ' ';
		display: block;
		position: absolute;
		width: 100%;
		height: 40px;
		left: 0;
		bottom: 0;
		background-color: white;
		border-radius: 100%;
		transform: translateY(50%);
	}

	// 登录按钮的样式
	.btn-login {
		width: 90%;
		border-radius: 100px;
		margin: 15px 0;
		background-color: #c00000;
	}

	// 按钮下方提示消息的样式
	.tips-text {
		font-size: 12px;
		color: gray;
	}
}
</style>
