 <template>
	<div class='order-detail-wrap'>
		<div>当前位置：<router-link v-for="item in mapBreadRoutes" :to="item.path" :key="item.path">{{item.meta.title}}<i class="el-icon-arrow-right"></i></router-link>订单详情</div>
		<!-- 订单状态 -->
		<!-- 0: 未支付; 1: 待发货; 2: 待收货; 3: 已完成; 4: 已退货; 5: 申请退换货; 6: 正在退换货; 7: 已取消 -->
		<template v-if="orderInfo.orderStatus == '0' || orderInfo.orderStatus == '1' || orderInfo.orderStatus == '2' || orderInfo.orderStatus == '3'">
			<Steps :step="orderInfo.orderStatus"></Steps>
		</template>

		<div class="order-tips">
			<p class="current-status">当前订单状态：{{mapOrderInfo.state}}</p>
			<p v-if="mapOrderInfo.tips" class="tips">{{mapOrderInfo.tips}}</p>

			<template v-if="orderInfo.orderStatus == '0'">
				<p class="tips">还有
					<mv-count-down v-if="endTime" class="order-count-down" @endCallback="cancelOrderCallback" :startTime="startTime" endText="已取消" :endTime="endTime" :dayTxt="'天'" :hourTxt="'小时'" :minutesTxt="'分钟'" :secondsTxt="'秒'" :isStart="true" /> 秒进行付款，若未及时付款，系统将取消订单
				</p>
				<p class="remind-delivery">
					<span class="def now-pay" @click="nowToPay">立即支付</span>
					<span class="sec" @click="cancelOrderClick">取消订单</span>
				</p>
			</template>

			<template v-if="orderInfo.orderStatus == '1'">
				<p class="remind-delivery">
					<span class="def" @click="remindDelivery">提心发货</span>
					<span class="sec" @click="applyRefundClick">申请退款</span>
				</p>
			</template>

			<template v-if="orderInfo.orderStatus == '2'">
				<p class="remind-delivery">
					<span class="def" @click="confirmGoods">确认收货</span>
				</p>
			</template>

		</div>

		<div class="order-status">
			<p>订单状态</p>
			<div>
				<p><span>收货地址:</span>{{orderInfo.receiverContact}} {{orderInfo.receiverMobile}} {{orderInfo.receiverAddress}}</p>
				<p><span>订单编号:</span>{{orderInfo.orderId}}</p>
				<p><span>订单金额:</span>￥{{orderInfo.amountPaid}}</p>
				<p><span>下单时间:</span>{{orderInfo.timeCreated | dealTime(true)}}</p>
				<!-- <p><span>订单留言:</span>暂无</p> -->
			</div>
		</div>

		<div class="logistics-list-wrap" v-if="orderInfo.orderStatus === '2' || orderInfo.orderStatus === '3'">
			<p class="logistics-title">物流信息</p>

			<div class="logistics-list">
				<div class="logistics-list-left">
					<p><span>承运物流：</span>{{logisticsInfo.companyName}}</p>
					<p class="order-number"><span>物流单号：</span>{{logisticsInfo.code}}</p>
				</div>

				<div class="logistics-list-main">
					<div v-if="logisticsInfo.traces.length" class="logistics-list-content custom-scroll-bars">
						<div class="logistics-item" v-for="(item,index) in logisticsInfo.traces" :key="index">
							<div class="logistics-location"><span class="icon-cricle"></span>{{item.location}}</div>
							<div class="logistics-time">{{item.time | dealTime(true)}}</div>
						</div>
					</div>

					<p v-else>暂无物流信息</p>
				</div>
			</div>

		</div>

		<!-- 订单结款信息 -->
		<OrderFooter :model="orderInfo"></OrderFooter>

		<!-- 取消订单 -->
		<Toast :visible.sync="cancelVisible" @success="cancelOrder">
			<div class="cancel-order-toast">
				确定要取消该订单吗？
			</div>
		</Toast>

		<!-- 申请退款 -->
		<Toast title="申请退款" :visible.sync="refundVisible" @success="applyRefund">
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
import OrderFooter from './components/OrderFooter';
import Steps from './components/Steps';
import MvCountDown from 'mv-count-down';
import { storages } from '@/utils';

export default {
	name: 'order-detail',
	components: { OrderFooter, Steps, MvCountDown },
	data() {
		return {
			currentStep: 0,
			orderInfo: {},
			startTime: new Date().getTime(),
			endTime: 0,
			logisticsInfo: {
				companyName: '暂无相关信息',
				code: '暂无相关信息',
				traces: [],
			},
			cancelVisible: false,
			refundVisible: false,
			refundType: '0',
			textareaText: '',
		};
	},
	computed: {
		mapBreadRoutes() {
			const reg = new RegExp('/goods/detail');
			return this.$store.state.breadRoutes
				.filter((e) => !reg.test(e.path))
				.slice(-2);
		},
		mapTextareaTextLen() {
			return this.textareaText.length;
		},
		mapOrderInfo() {
			const key = this.orderInfo.orderStatus;
			console.log(key, 'key');
			//  0: 未支付; 1: 待发货; 2: 待收货; 3: 已完成; 4: 已退货; 5: 申请退换货; 6: 正在退换货; 7: 已取消 8:待评价 9：已退款 10：已评价
			const status = {
				0: {
					state: '待支付',
					tips: '',
				},
				1: {
					state: '待发货',
					tips: '您的订单待发货，请耐心等待',
				},
				2: {
					state: '待收货',
					tips: '您的订单已发货，正飞速赶来中',
				},
				3: {
					state: '已完成',
					tips: '您的订单已签收，祝您购物愉快',
				},
				4: {
					state: '已退货',
					tips: '订单已退款',
				},
				5: {
					state: '申请退换货',
					tips: '',
				},
				6: {
					state: '正在退换货',
					tips: '',
				},
				7: {
					state: '已取消',
					tips: '订单已取消：未支付，已取消',
				},
				8: {
					state: '待评价',
				},
				9: {
					state: '已退款',
				},
				10: {
					state: '已评价',
				},
			};

			console.log(status[key]);
			return status[key] || {};
		},
	},
	watch: {
		'$route.params.id': {
			handler(id) {
				this.getOrderInfo(id);
			},
			immediate: true,
		},
	},
	methods: {
		getOrderInfo(id) {
			this.$axios.orderGetInfo(id).then(({ data = {} }) => {
				this.orderInfo = data;
				const time = data.timeCreated;
				const date = new Date(time);
				const gap = date.setSeconds(date.getSeconds() + 60 * 60 * 2);
				const nTime = new Date(gap).getTime();
				this.endTime = nTime;

				if (!parseInt(data.deliveryStatus)) return;
				if (!(data.orderStatus == '2' || data.orderStatus == '3')) return;
				this.getShipmentInfo(id);
			});
		},
		nowToPay() {
			storages.set('ls__settleColle_order', this.orderInfo.orderId);
			this.$router.push('/submit/pay');
		},
		cancelOrderClick() {
			this.cancelVisible = true;
		},
		cancelOrder() {
			const parmas = { orderId: this.orderInfo.orderId };
			this.$axios
				.orderCancel(parmas)
				.then(() => {
					this.cancelVisible = false;
					this.getOrderInfo();
				})
				.catch(() => {
					this.cancelVisible = false;
				});
		},
		cancelOrderCallback() {
			console.log('取消');
			const id = this.orderInfo.orderId;
			this.$axios.orderGetInfo(id).then(({ data = {} }) => {
				this.orderInfo = data;
			});
		},
		confirmGoods() {
			const id = this.orderInfo.orderId;
			if (!id) return;
			this.$axios
				.orderFinish(id)
				.then(({ data = {} }) => {
					this.orderInfo = data;
				})
				.catch((err) => {
					this.$layer.msg(err.message);
				});
		},
		// 获取物流信息
		getShipmentInfo(id) {
			this.$axios.getShipmentInfo(id).then(({ data = {} }) => {
				const arr = data.traces.reverse();
				data.traces = arr;
				this.logisticsInfo = data;
			});
		},
		remindDelivery() {
			const id = this.orderInfo.orderId;

			this.$axios
				.orderAlert(id)
				.then(() => {
					this.$layer.msg('提醒成功');
				})
				.catch(() => {
					this.$layer.msg('已经提醒过了哦！');
				});
		},
		applyRefundClick() {
			this.refundVisible = true;
		},
		applyRefund() {
			console.log('申请退款');
			this.$layer.msg('申请退款');
		},
	},
};
</script>

<style lang='scss' scoped>
.order-detail-wrap {
	background-color: var(--f-color);
	padding-bottom: 30px;
}
</style>

<style lang="scss">
$color: var(--thir-color);

.order-tips {
	padding: 40px 0 40px 48px;
	margin-top: 50px;
	border: 1px solid var(--cb-color);

	.tips {
		color: $color;
		font-size: 12px;
		margin-top: 10px;
	}

	.remind-delivery {
		margin-top: 10px;
		span {
			cursor: pointer;
			margin-right: 20px;
			font-size: 12px;
			min-width: 70px;
			height: 26px;
			line-height: 26px;
			text-align: center;
			display: inline-block;
			border: 1px solid var(--def-backdrop);
		}
		.def {
			color: var(--f-color);
			background-color: var(--def-backdrop);
		}

		.sec {
			color: var(--def-backdrop);
		}
	}
}

.order-status {
	border: 1px solid var(--cb-color);
	margin-top: 20px;
	font-size: 12px;

	& > p {
		height: 34px;
		line-height: 34px;
		border-bottom: 1px solid var(--cb-color);
		padding-left: 50px;
		color: $color;
	}

	& > div {
		padding: 13px 0;
		p {
			padding-left: 50px;
			height: 26px;
			line-height: 26px;
			span {
				width: 80px;
				display: inline-block;
			}
		}
	}
}

.logistics-list-wrap {
	.logistics-title {
		height: 34px;
		line-height: 34px;
		padding-left: 50px;
		color: $color;
	}

	.logistics-list-left {
		padding: 20px 0 0 50px;
		min-height: 70px;
		p {
			margin-bottom: 14px;
			span {
				display: inline-block;
				width: 80px;
			}
			&.order-number {
				color: var(--sec-color);
			}
		}
	}

	.logistics-list {
		display: flex;
		border: 1px solid var(--cb-color);

		& > div {
			flex: 1;
		}

		& > div:first-child {
			border-right: 1px solid var(--cb-color);
		}

		.logistics-list-main {
			// height: 266px;
			padding: 35px 10px 35px 0;
			box-sizing: border-box;
			display: flex;
			justify-content: center;
			align-items: center;

			& > p {
				text-align: center;
				color: var(--c-color);
			}
		}

		.logistics-list-content {
			height: 196px;
			padding: 10px 20px 10px 80px;
			overflow: auto;

			.logistics-item {
				width: 400px;
			}

			.logistics-location {
				color: var(--sec-color);
				position: relative;
				line-height: 20px;
				display: flex;
				align-items: center;
				// background-color: #eee;

				&::before {
					content: '';
					position: absolute;
					left: -40px;
					top: 0;
					width: 1px;
					height: 50%;
					background-color: var(--cb-color);
				}

				&::after {
					content: '';
					position: absolute;
					left: -40px;
					top: 50%;
					width: 1px;
					height: 50%;
					background-color: var(--cb-color);
				}

				.icon-cricle {
					position: absolute;
					left: -40px;
					top: 50%;
					width: 12px;
					height: 12px;
					border-radius: 50%;
					transform: translate(-50%, -50%);
					background-color: var(--cb-color);
					z-index: 10;
				}
			}

			.logistics-time {
				color: $color;
				font-size: 12px;
				padding-top: 4px;
				padding-bottom: 30px;
				position: relative;
			}
			.logistics-time:before {
				content: '';
				position: absolute;
				width: 1px;
				height: 100%;
				background-color: var(--cb-color);
				left: -40px;
				top: 0;
			}
		}
	}

	.logistics-list-content .logistics-item:first-child {
		.logistics-location::before {
			display: none;
		}
		.logistics-location .icon-cricle {
			width: 20px;
			height: 20px;
			background-color: var(--def-backdrop);
		}
	}

	.logistics-list-content .logistics-item:last-child {
		.logistics-time {
			padding-bottom: 0;
		}
		.logistics-time::before {
			display: none;
		}

		.logistics-location::after {
			display: none;
		}
	}
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

<style>
.order-count-down {
	display: inline-block;
	font-size: 14px !important;
	color: var(--def-backdrop);
}
</style>
