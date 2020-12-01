 <template>
	<!-- 服务>(酒店和旅游订单) -->
	<div class='goods-order-page'>
		<NavBar></NavBar>

		<div class="personal-center-right">
			<div class="goods-order-title">{{serviceTypeTitle}}订单</div>
			<div class="goods-order-tab">
				<span :class="{active:orderTbaIndex === 0}" @click="toggleTab(0)">所有订单</span>
				<span :class="{active:orderTbaIndex === 1}" @click="toggleTab(1)">待付款<i>2</i></span>
				<span :class="{active:orderTbaIndex === 2}" @click="toggleTab(2)">待使用<i>2</i></span>
				<span :class="{active:orderTbaIndex === 3}" @click="toggleTab(3)">已使用<i>2</i></span>
				<span :class="{active:orderTbaIndex === 4}" @click="toggleTab(4)">已过期<i>2</i></span>
				<span :class="{active:orderTbaIndex === 5}" @click="toggleTab(5)">已退款<i>2</i></span>
			</div>

			<div class="goods-order-search">
				<div class="search-inp">
					<input type="text" placeholder="请输入商品名称和订单号" v-model="searchText"><span @click="searchOrder">搜索</span>
				</div>

				<div class="order-time">
					<span>下单时间</span>
					<Select v-model="orderTime" :model="[{title:'近三个月'},{title:'近一个月'},{title:'近一周'}]"></Select>
				</div>
			</div>

			<div class="goods-order-list">
				<span class="item-goods">商品</span>
				<span class="item-price">售价（元）</span>
				<!-- <span class="item-sum">数量</span> -->
				<span class="item-sum-amount">总计（元）</span>
				<span class="item-status">订单状态</span>
				<span class="item-control">操作</span>
			</div>

			<!-- 所有订单 -->
			<div class="order-list-view">
				<div class="order-item" v-for="(item,index) in 1" :key="index">
					<div class="order-info">
						<label><input type="checkbox" :value="index" v-model="orderListChecked" /><span>睐思购海购</span></label>
						<span>订单号：2020082612093572</span>
						<span>下单时间：2020-08-26 12:23</span>
					</div>

					<div class="order-item-info">
						<div class="order-nape-wrap">
							<div class="order-nape" v-for="(item,index) in 2" :key="index">
								<div class="order-nape-info">
									<div class="order-img">
										<img src="@/assets/images/hotel3.jpg" alt="">
									</div>
									<div class="order-des">
										<p>三亚北京路希尔顿酒店</p>
										<div><span>包装:豪华版</span><span>净含量：50g</span></div>
									</div>
								</div>
								<div class="order-price">199.90</div>
								<!-- <div class="order-sum">2</div> -->
								<div class="order-sum-amount">
									<p>399.80</p>
									<p class="freight">(含运/税费：10.00)</p>
								</div>
							</div>
						</div>
						<div class="order-center-status">
							<span class="wait-pay">待付款</span>
							<router-link tag="span" to="/service/detail/1" class="order-status-detail btn">订单详情</router-link>
						</div>
						<div class="order-control">
							<span class="wait-time">请在1小时59分59秒内付款</span>
							<span class="im-pay btn">立即支付</span>
							<span>取消订单</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import NavBar from '../components/NavBar';
import Select from '@/views/components/Select';

export default {
	name: 'GoodsOrder',
	components: { NavBar, Select },
	data() {
		return {
			orderTbaIndex: 0,
			searchText: '',
			orderTime: '',
			orderListChecked: [],
			serviceTypeTitle: '酒店',
		};
	},

	created() {
		const type = this.$route.params.type;
		this.serviceTypeTitle = type === 'hotel' ? '酒店' : '旅游';
	},
	methods: {
		toggleTab(i) {
			this.orderTbaIndex = i;
		},
		searchOrder() {
			console.log(this.searchText);
		},
	},
};
</script>

<style lang='scss' scoped>
@import '@/styles/common.scss';
.goods-order-page {
	display: flex;
	justify-content: space-between;
}

.goods-order-title {
	padding: 20px 0 23px 0;
	font-size: 18px;
}

.goods-order-tab {
	border-bottom: 1px solid var(--e-color);
	padding-bottom: 10px;
	& > span {
		font-size: 16px;
		display: inline-block;
		cursor: pointer;
		position: relative;
		width: 90px;
		margin-right: 60px;
		text-align: center;
		i {
			color: var(--def-backdrop);
			padding-left: 5px;
		}
		&.active {
			color: var(--def-backdrop);
		}
		&.active:before {
			content: '';
			position: absolute;
			width: 90px;
			height: 2px;
			border-radius: 2px;
			background-color: var(--def-backdrop);
			bottom: -10px;
			left: 0;
		}
	}
}

.goods-order-search {
	margin: 20px 0 10px 0;
	display: flex;
	justify-content: space-between;
}

.goods-order-list {
	padding: 20px 0;
	display: flex;

	& > span:not(:first-child) {
		text-align: center;
	}
}

.item-goods {
	flex: 1;
	padding-left: 50px;
}
.item-price,
.order-price {
	width: 110px;
}
// .item-sum,
// .order-sum {
// 	width: 110px;
// }
.item-sum-amount,
.order-sum-amount {
	width: 140px;
}
.item-status,
.order-center-status {
	width: 120px;
	text-align: center;
}
.item-control,
.order-control {
	width: 120px;
	text-align: center;
}

.search-inp {
	display: flex;

	input {
		width: 200px;
		height: 32px;
		border: 1px solid var(--ed-color);
		box-sizing: border-box;
		outline: none;
		padding-left: 10px;
	}

	span {
		width: 40px;
		height: 32px;
		line-height: 32px;
		text-align: center;
		background-color: var(--def-backdrop);
		color: var(--f-color);
		cursor: pointer;
	}
}

.order-time {
	display: flex;
	align-items: center;
	& > span {
		margin-right: 10px;
	}
}

// 订单
.order-info {
	display: flex;
	color: var(--thir-color);
	background-color: var(--ed-color);
	height: 30px;
	align-items: center;
	padding-left: 10px;

	label {
		display: flex;
		align-items: center;
		input {
			margin-right: 5px;
		}
		span {
			width: 150px;
		}
	}

	& > span {
		margin-right: 50px;
	}
}

.order-list-view {
	font-size: 12px;
}

.order-item {
	border: 1px solid var(--c-color);
	border-top: none;
	margin-bottom: 20px;
}

.order-item-info {
	display: flex;
}

.order-nape {
	display: flex;
	border-right: 1px solid var(--c-color);
	padding: 10px 0;

	& > div:not(:first-child) {
		text-align: center;
	}
}

.order-nape-wrap {
	flex: 1;
}

.order-nape-wrap .order-nape:not(:last-child) {
	border-bottom: 1px solid var(--c-color);
}

.order-nape-info {
	display: flex;
	flex: 1;
	// width: 340px;
	.order-img {
		width: 100px;
		height: 100px;
		margin-left: 10px;
		border-radius: 7px;
		overflow: hidden;
	}

	.order-des {
		margin-left: 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 5px 0 10px 0;
		p {
			line-height: 22px;
		}

		div {
			color: var(--thir-color);
			span {
				margin-right: 20px;
			}
		}
	}
}

.order-sum-amount,
.order-price,
.order-sum,
.order-center-status,
.order-control {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.order-center-status {
	border-right: 1px solid var(--c-color);

	.wait-pay {
		color: var(--thir-color);
		margin-bottom: 10px;
	}
	.order-status-detail {
		color: var(--def-backdrop);
	}
}

.order-sum-amount {
	.freight {
		color: var(--thir-color);
		margin-top: 10px;
	}
}

.order-control {
	padding: 0 20px;
	box-sizing: border-box;
	.wait-time {
		color: var(--thir-color);
		line-height: 18px;
	}
	.im-pay {
		width: 70px;
		height: 30px;
		background-color: var(--def-backdrop);
		color: var(--f-color);
		line-height: 30px;
		text-align: center;
	}
}

.order-control span:not(:first-child) {
	margin-top: 10px;
}
</style>