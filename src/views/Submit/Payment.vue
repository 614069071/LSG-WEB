 <template>
	<div class='payment-order-wrap inner'>
		<div class="pay-top-wrap">
			<div class="pay-top--top">
				<div class="before">
					<Cicon iconClass="icon-duigou"></Cicon>
				</div>

				<div class="after">
					<!-- 订单状态; 0: 未支付; 1: 待发货; 2: 待收货; 3: 已完成; 4: 已退货; 5: 申请退换货; 6: 正在退换货; 7: 已取消 -->
					<h5 v-if=" orderInfo.orderStatus == '0'">订单提交成功，现在只差最后一步啦!</h5>
					<template v-if=" orderInfo.orderStatus == '1'">
						<h5>订单支付完成</h5>
						<router-link to="/cart" class="btn-def btn">购物车</router-link>
						<router-link to="/goods/order" class="btn-def btn">我的订单</router-link>
					</template>
					<h5 v-if=" orderInfo.orderStatus == '7'">订单已取消!</h5>
					<p v-if="orderInfo.orderStatus == '0' && endTime">请您在提交订单后
						<mv-count-down class="order-count-down" @endCallback="getOrderInfo" :startTime="startTime" endText="已取消" :endTime="endTime" :dayTxt="'天'" :hourTxt="'小时'" :minutesTxt="'分钟'" :secondsTxt="'秒'" :isStart="true" /> 内完成支付，否则订单会自动取消！
					</p>
				</div>
			</div>

			<div class="pay-top--bottom">
				<p v-for="(item,index) in orderInfo.itemList" :key="index">{{item.name}}</p>
				<p>收货信息：{{orderInfo.receiverAddress}}，{{orderInfo.receiverContact}}收，电话：{{orderInfo.receiverMobile}}</p>
			</div>
		</div>

		<div class="pay-center-wrap">
			<div class="before"><img src="@/assets/images/mobile.png" alt=""></div>
			<div class="after">
				<h5>扫码下载app 优惠等你享</h5>
				<p>扫码打开睐思购APP 购物支付可享受优惠</p>
			</div>
		</div>

		<div class="pay-bottom-wrap" v-if=" orderInfo.orderStatus == '0'">
			<div class="pay-bottom--top">
				<p>支付金额：<span><i>￥</i>{{orderInfo.amountPaid}}</span></p>
				<router-link to="/goods/order" class="user-order btn">我的订单<Cicon iconClass="icon-youbian"></Cicon>
				</router-link>
			</div>

			<div class="pay-bottom--bottom">
				<label class="pay-type-item btn">
					<input type="radio" value="alipay" v-model="payType">
					<div class="alipay"></div>
				</label>
				<label class="pay-type-item btn">
					<input type="radio" value="wx" v-model="payType">
					<div class="weixin"></div>
				</label>
				<a class="submit-btn" v-if="payType === 'alipay'" :href="paymentUrl">去支付</a>
				<router-link v-else to="/submit/scan" class="submit-btn btn">去支付</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import MvCountDown from 'mv-count-down';
import { storages } from '@/utils';

export default {
	name: '',
	components: { MvCountDown },
	data() {
		return {
			payType: 'alipay',
			startTime: 0,
			endTime: 0,
			orderInfo: {},
			// isLate: false,
		};
	},
	beforeRouteEnter(to, from, next) {
		const settleColle_catch = storages.get('ls__settleColle_order');
		settleColle_catch ? next() : next(from);
	},
	computed: {
		paymentUrl() {
			const ls__settleColle_order = storages.get('ls__settleColle_order');
			// http://api.laisigou.com/pay/alipay/订单ID?sessionId=sessionId&token=token  回跳地址，在后面加个returnUrl
			const { token, sessionId } = this.$store.state.userinfo;
			return `http://api.laisigou.com/pay/alipay/${ls__settleColle_order}?sessionId=${sessionId}&token=${token}&returnUrl=http://192.168.5.194:8080/__hash__/submit/pay`;
		},
	},
	created() {
		this.getOrderInfo();
	},
	beforeDestroy() {
		console.log('payment beforeDestroy');
		// storages.del('ls__settleColle_order');
	},
	methods: {
		getOrderInfo() {
			const ls__settleColle_order = storages.get('ls__settleColle_order');

			this.$axios.orderGetInfo(ls__settleColle_order).then(({ data = {} }) => {
				this.orderInfo = data;
				const time = data.timeCreated;
				const date = new Date(time);
				let nTime = new Date(date.setSeconds(date.getSeconds() + 60 * 60 * 2));

				this.startTime = new Date().getTime();
				this.endTime = nTime.getTime();
			});
		},
		goToPament() {
			const ls__settleColle_order = storages.get('ls__settleColle_order');
			console.log(ls__settleColle_order, 'ssssssssssssss');
			// http://api.laisigou.com/pay/alipay/订单ID?sessionId=sessionId&token=token  回跳地址，在后面加个returnUrl
			const { token, sessionId } = this.$store.state.userinfo;
			const url = `http://api.laisigou.com/pay/alipay/${ls__settleColle_order}?sessionId=${sessionId}&token=${token}&returnUrl=hp-dev.laisigou.com/#/goods/order`;
			console.log(url, 'url');
			window.open(url);
		},
	},
};
</script>

<style lang='scss' scoped>
.payment-order-wrap > div {
	background-color: var(--f-color);
	border: 1px solid var(--c-color);
	// margin-top: 30px;
}

.pay-top-wrap {
	padding: 0 20px;
	margin-top: 30px;
}

.pay-top--top {
	padding: 30px 0;

	display: flex;
	// border-bottom: 1px solid var(--c-color);
	.before {
		width: 20px;
		height: 20px;
		background-color: var(--def-backdrop);
		color: var(--f-color);
		text-align: center;
		line-height: 20px;
		border-radius: 50%;
		i {
			font-size: 14px;
		}
	}

	.after {
		margin-left: 10px;
		h5 {
			font-size: 18px;
			font-weight: 500;
		}

		p {
			line-height: 16px;
			font-size: 14px;
			color: var(--sec-color);
			margin-top: 10px;
			span {
				color: var(--def-backdrop);
			}

			.order-count-down {
				display: inline-block;
				font-size: 14px;
				color: var(--def-backdrop);
			}
		}
	}
}

.pay-top--bottom {
	padding: 30px 0;
	border-top: 1px solid var(--e-color);

	p:last-child {
		margin-top: 10px;
	}
}

.pay-center-wrap {
	display: flex;
	padding: 20px;
	margin-top: 30px;
	margin-bottom: 30px;
	.before {
		width: 79px;
		height: 79px;
		background-color: var(--e-color);
	}

	.after {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-left: 10px;

		h5 {
			font-size: 20px;
			font-weight: 700;
		}

		p {
			color: var(--def-backdrop);
			margin-top: 8px;
		}
	}
}

.pay-bottom-wrap {
	padding: 0 20px 30px;
	margin-bottom: 100px;
	margin-top: 20px;
	.pay-bottom--top {
		display: flex;
		height: 54px;
		line-height: 54px;
		justify-content: space-between;
		border-bottom: 1px solid var(--c-color);
	}

	.user-order {
		color: #9a9a9a;
	}

	.pay-bottom--bottom {
		padding: 5px 0 0 20px;
	}

	.pay-type-item {
		display: flex;
		align-items: center;
		height: 40px;
		padding: 10px 0;

		& > div {
			width: 120px;
			height: 40px;
			background-position: center;
			background-size: cover;
		}

		.alipay {
			background-image: url('../../assets/images/alipay.png');
		}

		.weixin {
			background-image: url('../../assets/images/weixin.png');
		}
	}

	.submit-btn {
		width: 100px;
		height: 30px;
		display: block;
		line-height: 30px;
		text-align: center;
		color: var(--f-color);
		background-color: var(--def-backdrop);
	}
}

.order-footer-wrapper {
	margin-bottom: 30px;
}

.btn-def {
	width: 70px;
	height: 26px;
	line-height: 26px;
	text-align: center;
	display: inline-block;
	margin: 10px 10px 0 0;
	color: var(--f-color);
	background-color: var(--def-backdrop);
}
</style>