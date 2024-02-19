<template>
	<!-- 搜索框 -->
	<view class="search-box">
		<uni-search-bar
			v-model="searchValue"
			placeholder="请输入搜索内容"
			:focus="true"
			radius="100"
			@confirm="handleConfirm"
			@cancel="handleClearInput"
			@clear="handleClearInput"
		></uni-search-bar>
	</view>
	<!-- 搜索历史 -->
	<view class="history-box" v-if="searchResults.length === 0">
		<view class="history-title">
			<text>搜索历史</text>
			<uni-icons type="trash" @click="handleClickDelIcon"></uni-icons>
		</view>
		<view class="history-list">
			<uni-tag v-for="(item, i) in historyList" :key="i" :text="item" @click="handleClickTag(item)"></uni-tag>
		</view>
	</view>
	<!-- 商品列表 -->
	<view class="sugg-list" v-else>
		<view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="handleClickSuggItem(item.goods_id)">
			<view class="goods-name">{{ item.goods_name }}</view>
			<UniIcons type="arrowright" size="16" />
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			searchValue: '',
			searchResults: [],
			historyList: []
		};
	},
	onShow() {
		uni.getStorage({
			key: 'historyList',
			success: res => {
				if (res.data) {
					this.historyList = [...res.data];
				}
			}
		});
	},
	methods: {
		async handleConfirm(data) {
			const { value } = data;

			if (value === '') {
				this.searchResults = [];
				return;
			}

			const { data: res } = await uni.$http.get('/api/public/v1/goods/qsearch', {
				query: value
			});

			if (res.meta.status !== 200) return uni.$showMsg();

			this.searchResults = res.message;
			this.saveSearchHistory(value);
		},
		saveSearchHistory(kw) {
			const arr = [...this.historyList];
			arr.unshift(kw);
			this.historyList = [...new Set(arr)];

			uni.setStorage({
				key: 'historyList',
				data: this.historyList
			});
		},
		handleClearInput() {
			this.searchResults = [];
		},
		handleClickDelIcon() {
			uni.removeStorage({
				key: 'historyList',
				success: () => {
					this.historyList = [];
				}
			});
		},
		handleClickTag(val) {
			this.searchValue = val;
			this.handleConfirm({
				value: val
			});
		},
		handleClickSuggItem(goods_id) {
			uni.navigateTo({
				url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
			});
		}
	}
};
</script>

<style lang="scss">
.search-box {
	position: sticky;
	top: 0;
	z-index: 10;

	.uni-searchbar {
		background-color: #c00000;
	}

	.uni-searchbar__cancel {
		color: #ffffff;
	}
}

.history-box {
	padding: 0 5px;

	.history-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 40px;
		font-size: 13px;
		border-bottom: 1px solid #efefef;
	}

	.history-list {
		display: flex;
		flex-wrap: wrap;
		padding: 10px 5px;

		.uni-tag {
			margin-top: 5px;
			margin-right: 5px;
			background-color: #bfbfbf !important;
			border-color: #bfbfbf !important;
		}
	}
}

.sugg-list {
	padding: 0 5px;

	.sugg-item {
		font-size: 12px;
		padding: 13px 0;
		border-bottom: 1px solid #efefef;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.goods-name {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-right: 3px;
		}
	}
}
</style>
