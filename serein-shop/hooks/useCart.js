import {
	onMounted,
	computed,
	watch,
	ref
} from 'vue'
import store from "../store/index.js"

const total = computed(() => store.getters["moduleCart/total"]);

watch(total, (newVal) => {
	const len = getCurrentPages().length
	const currentPage = getCurrentPages()[len - 1]

	if (currentPage) {
		const list = ['pages/home/home', 'pages/cate/cate', 'pages/cart/cart', 'pages/my/my']
		const res = list.some(el => {
			return el === currentPage.route
		})

		if (res) {
			uni.setTabBarBadge({
				index: 2,
				text: String(newVal)
			});
		}
	}
})

const setBadge = () => {
	onMounted(() => {
		uni.setTabBarBadge({
			index: 2,
			text: String(total.value)
		});
	})
}

export {
	setBadge,
}
