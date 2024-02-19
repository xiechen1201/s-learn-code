export default {
	namespaced: true,
	state() {
		return {
			cart: JSON.parse(uni.getStorageSync('cart') || "[]"),
		}
	},
	getters: {
		// 商品总数
		total(state) {
			const num = state.cart.reduce((pre, cur) => {
				return pre += cur.goods_count
			}, 0)
			return num
		},
		// 已勾选商品数量
		checkedCount(state) {
			return state.cart.filter(el => el.goods_state).reduce((total, item) => total += item.goods_count, 0)
		},
		// 已勾选商品总价
		checkedGoodsAmount(state) {
			return state.cart.filter(el => el.goods_state)
				.reduce((total, item) => total += item.goods_count * item.goods_price, 0)
				.toFixed(2)
		}
	},
	mutations: {
		addToCart(state, goods) {
			const result = state.cart.find(el => el.goods_id === goods.goods_id)

			if (result) {
				result.goods_count++
			} else {
				state.cart.push(goods)
			}

			this.commit('moduleCart/saveToStorage', state)
		},
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		updateGoodsState(state, goods) {
			const res = state.cart.find(el => el.goods_id === goods.goods_id)

			if (res) {
				res.goods_state = goods.goods_state
				this.commit('moduleCart/saveToStorage')
			}
		},
		updateGoodsCount(state, goods) {
			const res = state.cart.find(el => el.goods_id === goods.goods_id)

			if (res) {
				res.goods_count = goods.goods_count
				this.commit('moduleCart/saveToStorage')
			}
		},
		removeGoodsById(state, goods_id) {
			state.cart = state.cart.filter(el => el.goods_id !== goods_id)

			this.commit('moduleCart/saveToStorage')
		},
		updateAllGoodsState(state, newState) {
			state.cart.forEach(x => x.goods_state = newState)
			this.commit('moduleCart/saveToStorage')
		}
	},
}
