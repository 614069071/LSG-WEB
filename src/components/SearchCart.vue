<template>
	<!-- 搜索购物车 -->
	<div class='search-cart-wrap'>
		<div class="search-wrap">
			<div class="search-icon"><i class="el-icon-search"></i></div>
			<input class="search-input" type="text" :placeholder="searchPlacehoder" v-model.trim="searchText" @keydown.enter="goToSearch">
			<div class="btn search-btn" @click="goToSearch"><i class="el-icon-search"></i></div>
		</div>
		<div v-login="'/cart'" class="btn cart-wrap">
			<span class="cart-wrap-icon"></span>
			<span class="cart-wrap-text">购物车</span>
			<span v-if="cartSum" class="cart-wrap-sum">{{cartSum}}</span>
		</div>
	</div>
</template>

<script>
import { storage } from '@/utils';
export default {
	name: 'SearchCart',
	props: {
		hot: {
			// 热搜
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			searchText: '',
			searchPlacehoder: '',
			recom: [],
		};
	},
	computed: {
		cartSum() {
			const lsCart = this.$store.state.lsCart;
			let sum = 0;
			lsCart.forEach((e) => (sum += e.num));
			return sum;
		},
	},
	created() {
		this.setPlacehoder();
	},
	methods: {
		goToSearch() {
			let pramas = {};

			pramas.keyword = this.searchText || this.searchPlacehoder || '';
			pramas.keyword && this.$router.push({ path: '/result', query: pramas });

			this.searchText = '';
			this.setPlacehoder();
		},
		setPlacehoder() {
			const searchRecommend = storage.get('searchRecommend');
			this.recom = searchRecommend;
			const num = Math.floor(Math.random() * searchRecommend.length);
			this.searchPlacehoder = searchRecommend[num];
		},
	},
};
</script>

<style lang='scss'>
$height: 36px;
.search-cart-wrap {
	width: 757px;
	display: flex;
	justify-content: space-between;
}

.search-wrap {
	width: 510px;
	border-radius: 18px;
	overflow: hidden;
	position: relative;
}

.search-input {
	display: block;
	width: 100%;
	height: 40px;
	line-height: 40px;
	border-radius: 40px;
	padding: 0 70px 0 40px;
	border: 2px solid var(--def-backdrop);
	box-sizing: border-box;
}

.search-icon {
	width: 40px;
	height: 40px;
	position: absolute;
	left: 0;
	top: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #bbbbbb;
	font-size: 14px;
}

.search-btn {
	width: 70px;
	height: 40px;
	background-color: var(--def-backdrop);
	border-radius: 40px;
	position: absolute;
	right: -2px;
	top: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
	font-size: 18px;
}

.cart-wrap {
	width: 106px;
	height: $height;
	border-radius: $height;
	border: 2px solid var(--def-backdrop);
	display: flex;
	justify-content: center;
	align-items: center;
}

.cart-wrap-icon {
	width: 20px;
	height: 20px;
	font-size: 26px;
	color: var(--def-backdrop);
	margin-right: 3px;
	background-image: url('../assets/images/cart-icon.png');
}

.cart-wrap-sum {
	width: 20px;
	height: 20px;
	background-color: #ff2337;
	text-align: center;
	line-height: 20px;
	color: #fff;
	border-radius: 10px;
	margin-left: 3px;
	font-size: 12px;
}

.cart-wrap:hover .cart-wrap-text {
	color: var(--def-backdrop);
}
</style>