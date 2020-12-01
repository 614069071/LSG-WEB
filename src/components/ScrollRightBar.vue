 <template>
	<div class="scroll-bar-right-wrap">
		<ul>
			<!-- <li>
				<Cicon iconClass="icon-qiandao"></Cicon>
				<span>签到</span>
			</li> -->
			<li v-login="'/cart'">
				<Cicon iconClass="icon-gouwuche"></Cicon>
				<span>购物车</span>
				<span class="cart" v-if="cartSum">{{cartSum}}</span>
			</li>
			<li @click="scrollTo">
				<Cicon iconClass="icon-dingbu"></Cicon>
				<span>Top</span>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'scroll-right-bar',
	methods: {
		scrollTo() {
			scroll(0, 0);
		},
	},
	computed: {
		cartSum() {
			const lsCart = this.$store.state.lsCart;
			let sum = 0;
			lsCart.forEach((e) => (sum += e.num));
			return sum;
		},
	},
};
</script>

<style lang='scss' scoped>
.scroll-bar-right-wrap ul li {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 60px;
	height: 60px;
	background-color: #fff;
	font-size: 12px;
	position: relative;

	.cart {
		position: absolute;
		top: 5px;
		right: 5px;
		min-width: 12px;
		padding: 0 2px;
		height: 16px;
		font-size: 12px;
		background-color: #ff2337;
		border-radius: 10px;
		line-height: 16px;
		text-align: center;
		color: white;
	}

	i {
		color: var(--def-backdrop);
		font-size: 18px;
	}
}

.scroll-bar-right-wrap ul li:hover {
	color: var(--def-backdrop);
}
.scroll-bar-right-wrap ul li:not(:last-child) {
	border-bottom: 1px solid #eee;
}
</style>