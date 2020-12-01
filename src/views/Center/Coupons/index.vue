 <template>
	<div class='coupons-page-wrap'>
		<NavBar class="personal-center-left"></NavBar>
		<div class="personal-center-right">
			<div class="personal-center-right-title">我的优惠券</div>
			<TabBar :model="tabBarColle" :current.sync="currentBar" @submit="getCoupons"></TabBar>

			<div class="coupons-list">
				<Coupon class="coupon-item" v-for="item in 5" :key="item" :overdue="false"></Coupon>
			</div>
		</div>
	</div>
</template>

<script>
import NavBar from '../components/NavBar';
import TabBar from '../components/TabBar';
import Coupon from './coupon';

export default {
	name: 'Coupons',
	components: { NavBar, TabBar, Coupon },
	data() {
		return {
			tabBarColle: [
				{ title: '可使用' },
				{ title: '已使用' },
				{ title: '已过期' },
			],
			currentBar: 0,
		};
	},
	methods: {
		getCoupons(v) {
			console.log(v);
		},
	},
};
</script>

<style lang='scss' scoped>
.coupons-list {
	padding-top: 30px;
	width: 970px;
}
.coupon-item {
	display: inline-block;
	margin: 0 20px 14px 0;
}
</style>