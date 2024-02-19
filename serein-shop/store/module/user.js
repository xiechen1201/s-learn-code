export default {
	namespaced: true,
	state() {
		return {
			address: JSON.parse(uni.getStorageSync('address') || '{}'),
			userInfo: JSON.parse(uni.getStorageSync('userinfo') || "{}"),
			token: uni.getStorageSync('token') || "",
			redirectInfo: null
		}
	},
	getters: {
		addstr(state) {
			if (!state.address.provinceName) return ''
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address
				.detailInfo
		}
	},
	mutations: {
		updateAddress(state, address) {
			state.address = address
			this.commit("moduleUser/saveAddressToStorage")
		},
		saveAddressToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		},
		updateUserInfo(state, userinfo) {
			state.userinfo = userinfo
			this.commit('moduleUser/saveUserInfoToStorage')
		},
		saveUserInfoToStorage(state) {
			uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
		},
		updateToken(state, token) {
			state.token = token
			this.commit('moduleUser/saveTokenToStorage')
		},
		saveTokenToStorage(state) {
			uni.setStorageSync('token', state.token)
		},
		updateRedirectInfo(state, info) {
			state.redirectInfo = info
		}
	}
}
