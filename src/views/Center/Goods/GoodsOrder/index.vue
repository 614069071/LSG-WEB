 <template>
	<!-- 全部订单 -->
	<div class='goods-order-page'>
		<NavBar></NavBar>

		<div class="personal-center-right">
			<div class="personal-center-right-title">商品订单</div>
			<!-- // all:所有 finished:已完成 unpaid:待付款 unreceived:待收货 unshipped:代发货 -->
			<TabBar :model="tabBarCollen" :current.sync="currentBar" @submit="toggleTab"></TabBar>

			<!-- <div class="goods-order-search">
				<div class="search-inp">
					<input type="text" placeholder="请输入商品名称和订单号" v-model="searchText"><span @click="searchOrder">搜索</span>
				</div>

				<div class="order-time">
					<span>下单时间</span>
					<Select v-model="orderTime" :model="[{title:'近三个月'},{title:'近一个月'},{title:'近一周'}]"></Select>
				</div>
			</div> -->

			<div class="goods-order-list" v-if="orderFilterList.length">
				<span class="item-goods">商品</span>
				<span class="item-price">售价（元）</span>
				<span class="item-sum">数量</span>
				<span class="item-sum-amount">总计（元）</span>
				<span class="item-status">订单状态</span>
				<span class="item-control">操作</span>
			</div>

			<!-- 所有订单 -->
			<div class="order-list-view">
				<template v-if="orderFilterList.length">
					<div class="order-item" v-for="(item,index) in orderFilterList" :key="index">
						<div class="order-info">
							<!-- <label><input type="checkbox" :value="index" v-model="orderListChecked" /><span>睐思购海购</span></label> -->
							<span>订单号：{{item.orderId}}</span>
							<span>下单时间：{{item.timeCreated | dealTime(true)}}</span>
						</div>

						<div class="order-item-info">
							<div class="order-nape-wrap">
								<div class="order-nape" v-for="nape in item.itemList" :key="nape.orderItemId">
									<router-link tag="div" :to="`/product/detail/${nape.productId}`" class="order-nape-info">
										<div class="order-img">
											<img :src="nape.thumbUrl" alt="">
										</div>
										<div class="order-des">
											<p>{{nape.name}}</p>
											<div>{{nape.itemName}}</div>
										</div>
									</router-link>
									<div class="order-price">{{nape.price}}</div>
									<div class="order-sum">{{nape.num}}</div>

								</div>
							</div>
							<div class="order-sum-amount">
								<p>￥{{item.amountPaid}}</p>
								<p class="freight">(含运/税费：{{item.taxFee}})</p>
							</div>
							<div class="order-center-status">
								<span class="wait-pay">{{item.orderStatus | mapOrderStatus}}</span>
								<router-link tag="span" :to="`/goods/detail/${item.orderId}`" class="order-status-detail btn">订单详情</router-link>
							</div>
							<div class="order-control">
								<!-- <span class="wait-time">请在1小时59分59秒内付款</span> -->
								<!-- 0: 未支付; 1: 待发货; 2: 待收货; 3: 已完成; 4: 已退货; 5: 申请退换货; 6: 正在退换货; 7: 已取消 -->
								<span class="im-pay now-pay" v-if="item.orderStatus === '0'" @click="nowToPay(item)">立即付款</span>
								<span class="" v-if="item.orderStatus === '0'" @click="cancelOrder(item)">取消订单</span>
								<span class="im-pay" v-if="item.orderStatus === '1'" @click="remindDelivery(item)">提醒发货</span>
								<span class="im-pay" v-if="item.orderStatus === '2'" @click="confirmOrder(item)">确认收货</span>
								<router-link v-if="item.orderStatus === '3' || item.orderStatus === '7' " to="/">去逛逛吧</router-link>
								<!-- <span class="im-pay" v-if="item.orderStatus === '1'" @click="applyRefund(item)">申请退款</span> -->
								<!-- <span class="im-pay" v-if="item.orderStatus === '7'" @click="againOrder(item)">重新购买</span>
								<span class="im-pay" v-if="item.orderStatus === '3'" @click="againOrder(item)">再次购买</span> -->
							</div>
						</div>
					</div>

					<div class="pagination-wrap">
						<el-pagination background layout="prev, pager, next" :total="paginationTotal" prev-text="上一页" next-text="下一页" :current-page.sync="currentPage" @current-change="currentClick" />
					</div>
				</template>

				<NoData v-else>暂无没有相关订单</NoData>
			</div>
		</div>

		<Toast :visible.sync="cancelVisible" @success="cancelOrderSubmit">
			<div class="cancel-order-toast">
				确定要取消该订单吗？
			</div>
		</Toast>

		<!-- 申请退款 -->
		<Toast title="申请退款" :visible.sync="refundVisible" @success="refundlOrderSubmit">
			<div class="refund-order-toast">
				<p class="refund-reason">请选择退款原因</p>
				<p>
					<el-radio v-model="refundType" label="0">拍错了</el-radio>
					<el-radio v-model="refundType" label="1">不想要了</el-radio>
					<el-radio v-model="refundType" label="2">其他原因</el-radio>
				</p>
				<div class="refund-text-wrap">
					<textarea class="refund-textarea" maxlength="200" v-model="textareaText" placeholder="退款原因/选填"></textarea>
					<span class="refund-sum">{{mapTextareaTextLen}}/200</span>
				</div>
			</div>
		</Toast>
	</div>
</template>

<script>
import NavBar from '../../components/NavBar';
import TabBar from '../../components/TabBar';
// import Select from '@/views/components/Select';
import { storages } from '@/utils';

export default {
	name: 'GoodsOrder',
	// components: { NavBar, Select },
	components: { NavBar, TabBar },
	data() {
		return {
			orderTbaIndex: 0,
			searchText: '',
			orderTime: '',
			orderListChecked: [],
			allOrderList: [],
			orderFilterList: [],
			paginationTotal: 0,
			currentPage: 1,
			tabBarCollen: [
				{ title: '所有订单', type: '', key: 'all', inner: null },
				{ title: '待付款', type: '0', key: 'unpaid', inner: null },
				{ title: '待发货', type: '1', key: 'unshipped', inner: null },
				{ title: '待收货', type: '2', key: 'unreceived', inner: null },
				{ title: '已完成', type: '3', key: 'finished', inner: null },
				{ title: '已退款', type: '9', key: 'refunded', inner: null },
			],
			currentBar: 0,
			cancelVisible: false,
			orderInfo: {},
			refundVisible: false,
			refundType: '0',
			textareaText: '',
		};
	},
	computed: {
		mapTextareaTextLen() {
			return this.textareaText.length;
		},
	},
	created() {
		// this.loadeing(true);
		// 订单状态; 0: 未支付; 1: 待发货; 2: 待收货; 3: 已完成; 4: 已退货; 5: 申请退换货; 6: 正在退换货; 7: 已取消 9:已退款
		// all:所有 finished:已完成  unpaid:待付款 unreceived:待收货 unshipperd:代发货
		const type = storages.get('centerOrderType') || '';
		const item = this.tabBarCollen.find((e, i) => {
			if (e.key === type) {
				this.currentBar = i;
			}
			return e.key === type;
		}) || { type: '' };

		this.getAllOrderList(item.type);
		this.getOrderAll();
		storages.del('centerOrderType');
	},
	methods: {
		toggleTab(item) {
			console.log(item);
			this.currentPage = 1;
			this.orderTbaIndex = item.type;
			this.getAllOrderList(item.type);
		},
		searchOrder() {
			console.log(this.searchText);
		},
		getAllOrderList(type = '') {
			const parmas = { type, size: 10, page: this.currentPage };

			this.$axios
				.orderGetTypeList(parmas)
				.then(({ data = {} }) => {
					// this.allOrderList = data;
					this.orderFilterList = data.list || [];
					this.paginationTotal = data.total;
				})
				.catch(() => {
					this.orderFilterList = [];
				});
		},
		// 获取分类信息
		getOrderAll() {
			// all:所有 finished:已完成  unpaid:待付款 unreceived:待收货 unshipperd:代发货
			this.$axios.orderGetTypeSate().then(({ data = {} }) => {
				const tabBar = this.tabBarCollen;
				tabBar.forEach((e) => (e.inner = data[e.key]));
				this.tabBarCollen = tabBar;
			});
		},
		nowToPay(item) {
			// console.log(item);
			storages.set('ls__settleColle_order', item.orderId);
			this.$router.push('/submit/pay');
		},
		cancelOrder(item) {
			this.orderInfo = item;
			this.cancelVisible = true;
		},
		cancelOrderSubmit() {
			const parmas = { orderId: this.orderInfo.orderId };

			this.$axios
				.orderCancel(parmas)
				.then(() => {
					this.cancelVisible = false;
					this.$layer.msg('取消成功');
					this.getAllOrderList();
				})
				.catch(() => {
					this.cancelVisible = false;
					this.$layer.msg('服务器开小差了，请稍后再试');
				});
		},
		confirmOrder(item) {
			const id = item.orderId;
			if (!id) return;
			this.$axios
				.orderFinish(id)
				.then(({ data = {} }) => {
					this.orderInfo = data;
					this.getAllOrderList();
				})
				.catch((err) => {
					this.$layer.msg(err.message);
				});
		},
		againOrder(item) {
			console.log(item);
			// this.$router.push(`/product/detail/${item.productId}`);
		},
		currentClick() {
			this.getAllOrderList();
		},
		remindDelivery(item) {
			const id = item.orderId;

			this.$axios
				.orderAlert(id)
				.then(() => {
					this.$layer.msg('提醒成功');
				})
				.catch((err) => {
					this.$layer.msg(err.message);
				});
		},
		applyRefund(item) {
			this.orderInfo = item;
			this.refundVisible = true;
		},
		refundlOrderSubmit() {
			const parmas = {
				id: this.orderInfo.orderId,
				type: this.refundType,
				text: this.textareaText,
			};
			console.log(parmas);

			this.$layer.msg('申请退款');
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
.item-sum,
.order-sum {
	width: 110px;
}
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
	margin-bottom: 40px;
}

.order-item {
	border: 1px solid var(--c-color);
	border-top: none;
	// margin-bottom: 20px;
}

.order-item-info {
	display: flex;
}

.order-nape {
	display: flex;
	border-right: 1px solid var(--c-color);
	padding: 10px 0;
	flex: 1;
	box-sizing: border-box;

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
	box-sizing: border-box;

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
		flex: 1;
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
	box-sizing: border-box;
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
	border-right: 1px solid var(--c-color);

	.freight {
		color: var(--thir-color);
		margin-top: 10px;
	}
}

.order-control {
	padding: 0 20px;
	box-sizing: border-box;

	a {
		color: var(--def-backdrop);
	}

	span {
		cursor: pointer;
	}

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
		border-radius: 4px;
		margin-bottom: 4px;
	}

	.im-pay.now-pay {
		background-color: var(--ye-color);
	}
}

.order-control span:not(:first-child) {
	margin-top: 10px;
}

.cancel-order-toast {
	width: 400px;
}

.refund-order-toast {
	width: 500px;
	text-align: left;
	padding: 0 24px;
	.refund-reason {
		height: 54px;
		line-height: 54px;
	}

	.refund-text-wrap {
		position: relative;
		.refund-textarea {
			background-color: #f9fafb;
			padding: 10px;
			box-sizing: border-box;
			width: 100%;
			height: 90px;
			border: 1px solid #ecedee;
			border-radius: 4px;
			resize: none;
			line-height: 18px;
			margin: 9px 0 40px 0;
		}

		.refund-sum {
			position: absolute;
			right: 10px;
			bottom: 6px;
			color: var(--thir-color);
		}
	}
}
</style>