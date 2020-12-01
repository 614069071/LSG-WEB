 <template>
	<!-- 订单列表 -->
	<div class='order-page-list-wrap'>
		<HeadBar></HeadBar>
		<!-- 搜索购物车 -->
		<div class="order-header inner">
			<Logo></Logo>
		</div>

		<!-- 订单列表 -->
		<order-list></order-list>

		<!-- 猜你喜欢 -->
		<div class="guess-you-like inner">
			<div class="guess-title">猜你喜欢</div>
			<Commodity class="guess-you-like-list" v-for="(item,index) in guessLikeList" :key="index" :model="item"></Commodity>
		</div>

		<SideFooter></SideFooter>
		<Information></Information>
	</div>
</template>

<script>
import OrderList from './order-list';
export default {
	name: 'Order',
	components: { OrderList },
	data() {
		return {
			guessLikeList: [],
		};
	},
	created() {
		this.getLikeList();
	},
	methods: {
		getLikeList() {
			//专属推荐
			this.$axios.homeRecom().then(({ data: { list = [] } }) => {
				this.guessLikeList = Object.freeze(list.slice(0, 8));
			});
		},
	},
};
</script>

<style lang='scss' scoped>
.order-page-list-wrap {
	background-color: var(--f-color);
	min-height: 100vh;
}
.order-header {
	padding: 20px 0;
}

// 猜你喜欢
.guess-you-like {
	margin-top: 40px;
	padding: 0 20px 10px;
	box-sizing: border-box;
	background-color: #e9f9f9;
	.guess-title {
		height: 60px;
		line-height: 60px;
		font-size: 24px;
	}

	.guess-you-like-list {
		margin-right: 5px;
		margin-top: 10px;
	}
}
</style>