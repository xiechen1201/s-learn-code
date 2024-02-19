import store from "../store/index.js"
import {
	$http
} from "@escook/request-miniprogram"

$http.baseUrl = 'https://www.uinav.com'

// 请求拦截器
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: "数据加载中..."
	})

	if (options.url.indexOf('/my/') !== -1) {
		options.header = {
			Authorization: store.state.moduleUser.token,
		}
	}
}
// 响应拦截器
$http.afterRequest = function(options) {
	uni.hideLoading()
}

uni.$http = $http
