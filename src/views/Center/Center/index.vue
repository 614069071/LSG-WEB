 <template>
	<!-- 个人中心 -->
	<div class='personal-center-info'>
		<NavBar class="personal-center-left"></NavBar>

		<div class="personal-center-right">
			<div class="info-main">
				<div class="info-des">
					<div class="avator-info">
						<div class="avator">
							<img :src="$store.state.userinfo.headPic|| require('@/assets/images/avator.png')" alt="">
						</div>
						<div class="nick-name">
							<p>{{$store.state.userinfo.nickName}}</p>
							<p>{{dealPhone}}</p>
						</div>
					</div>

					<router-link tag="div" class="editor-info btn" to="/account/infor">编辑个人信息<i class="el-icon-edit"></i></router-link>
				</div>

				<div class="info-orders">
					<!-- // 订单状态; 0: 未支付; 1: 待发货; 2: 待收货; 3: 已完成; 4: 已退货; 5: 申请退换货; 6: 正在退换货; 7: 已取消 -->

					<div class="process-item" @click="toOrderType('unpaid')">
						<span class="process-icon">
							<Cicon iconClass="icon-custom-payment"></Cicon>
							<span class="sum" v-show="orderState.unpaid">{{orderState.unpaid}}</span>
						</span>
						待付款
					</div>

					<div class="process-item" @click="toOrderType('unshipped')">
						<span class="process-icon">
							<Cicon iconClass="icon-fahuo-"></Cicon>
							<span class="sum" v-show="orderState.unshipped">{{orderState.unshipped}}</span>
						</span>
						待发货
					</div>

					<div class="process-item" @click="toOrderType('unreceived')">
						<span class="process-icon">
							<Cicon iconClass="icon-shouhuo"></Cicon>
							<span class="sum" v-show="orderState.unreceived">{{orderState.unreceived}}</span>
						</span>
						待收货
					</div>

					<!-- <div class="process-item btn" @click="toOrderType('unreviewed')">
						<span class="process-icon">
							<Cicon iconClass="icon-daipingjia1"></Cicon>
							<span class="sum" v-show="orderState.unreviewed">{{orderState.unreviewed}}</span>
						</span>
						待评价
					</div> -->
				</div>
			</div>

			<!--最近浏览 -->
			<Carousel class="recenr-browser-list" title="最近浏览" :list="recentBrowseList"></Carousel>
		</div>
	</div>
</template>

<script>
import Carousel from '../components/Carousel';
import NavBar from '../components/NavBar';
import { dealPhone, storages } from '@/utils';

export default {
	name: 'Center',
	components: { Carousel, NavBar },
	data() {
		return {
			recentBrowseList: [],
			orderState: {},
		};
	},
	computed: {
		dealPhone() {
			return dealPhone(this.$store.state.userinfo.phone || '') || '';
		},
	},
	created() {
		this.getBrandList();
		this.getOrderAll();
	},
	methods: {
		getBrandList() {
			//专属推荐
			const params = { size: 10, page: 1 };
			this.$axios.getBrowseList(params).then(({ data: { list = [] } }) => {
				this.recentBrowseList = Object.freeze(list);
			});
		},
		getOrderAll() {
			// 订单状态; 0: 未支付; 1: 待发货; 2: 待收货; 3: 已完成; 4: 已退货; 5: 申请退换货; 6: 正在退换货; 7: 已取消
			// all:所有 finished:已完成  unpaid:待付款 unreceived:待收货 unshipperd:代发货

			this.$axios.orderGetTypeSate().then(({ data = {} }) => {
				this.orderState = data;
			});
		},
		toOrderType(type) {
			this.$router.push({ path: '/goods/order' });
			storages.set('centerOrderType', type);
		},
	},
};
</script>

<style lang='scss' scoped>
.personal-center-info {
	display: flex;
	justify-content: space-between;
}

.personal-center-right {
	width: 940px;
}

.info-main {
	height: 300px;
	box-shadow: 0px 3px 13px 2px rgba(0, 0, 0, 0.1);
}

.info-des {
	height: 190px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: var(--def-backdrop);
	color: var(--f-color);
}

.avator-info {
	display: flex;
	.avator {
		width: 78px;
		height: 78px;
		border-radius: 50%;
		overflow: hidden;
		margin-left: 50px;
	}

	.nick-name {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 10px;

		p:first-child {
			font-size: 18px;
		}

		p:last-child {
			font-size: 12px;
			margin-top: 5px;
		}
	}
}

.editor-info {
	margin-right: 20px;
	font-size: 16px;
	i {
		margin-left: 6px;
	}
}

.info-orders {
	height: 110px;
	padding: 0 50px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: var(--f-color);
}

.process-item {
	display: flex;
	align-items: center;
	color: var(--sec-color);

	.process-icon {
		position: relative;
		width: 48px;
		height: 48px;
		text-align: center;
		line-height: 48px;
		display: block;
		color: var(--def-backdrop);

		.iconfont {
			font-size: 40px;
			margin-right: 16px;
		}

		.sum {
			height: 14px;
			line-height: 14px;
			font-size: 12px;
			color: var(--f-color);
			padding: 0 5px;
			background-color: #fa1919;
			border-radius: 8px;
			position: absolute;
			left: 60%;
			top: 0;
		}
	}
}

.recenr-browser-list {
	margin-top: 30px;
	width: 940px;
}
</style>