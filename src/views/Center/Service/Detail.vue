 <template>
	<div class='service-detail-wrap'>
		<div>当前位置：睐思购海购 > 个人中心 > 我的订单 > 订单详情</div>

		<div class="order-tips">
			<p class="current-status">当前订单状态：{{orderStatus[currentStatus]}}</p>
			<p class="tips" v-if="currentStatus === 0">还有<span>29分59秒</span>进行付款，若未及时付款，系统将自动取消订单</p>
			<p class="tips" v-else-if="currentStatus === 1">当前订单待使用</p>
			<p class="tips" v-else-if="currentStatus === 2">当前订单已使用 <i>消费时间：2020-08-26 10:27:23</i></p>
			<p class="tips" v-else-if="currentStatus === 3">订单已取消：用户取消</p>
			<p class="tips" v-else-if="currentStatus === 4">您的订单已退款</p>
			<p class="tips" v-else-if="currentStatus === 5">您的订单已过期</p>

			<p class="remind-delivery" v-if="currentStatus === 0">
				<span class="def">立即付款</span>
				<span v-if="false">取消订单</span>
			</p>
		</div>

		<div class="order-status">
			<p>订单状态</p>
			<div>
				<p><span>订单编号:</span>2020082612032376</p>
				<p><span>订单金额:</span>￥199.90</p>
				<p><span>下单时间:</span>2020-08-26 10:27:23</p>
				<p><span>订单留言:</span>暂无</p>
				<p><span>联系人:</span>王小二</p>
				<p><span>联系电话:</span>123456789987</p>
			</div>
		</div>

		<div class="order-detail-info-wrap">
			<div class="order-detail-info-caption">
				<span class="service-info">商品信息</span>
				<span class="service-time">时间</span>
				<span class="service-sum">数量</span>
				<span class="service-price">售价（元）</span>
			</div>
			<div class="order-detail-info-body">
				<div class="service-info">
					<div class="service-info-img">
						<img src="@/assets/images/hotel3.jpg" alt="">
					</div>
					<div class="service-info-main">
						<p>三亚北京路希尔顿酒店 赠送早餐 一间/晚送早餐 一间/晚送早餐 一间/晚送早餐 一间/晚</p>
						<p>大床房1间</p>
						<p>地址：海南省三亚市上水区北京录1009号</p>
						<p>电话：0755-88887777</p>
					</div>
				</div>
				<div class="service-time">
					<p>线下预约</p>
					<p class="valid-time">有效期截止至：2020年10月1日</p>
				</div>
				<div class="service-sum">
					共4晚
				</div>
				<div class="service-price">
					39.9
				</div>
			</div>
		</div>

		<div class="service-result">
			订单总价：
			<span>￥463.00</span>
		</div>

	</div>
</template>

<script>
export default {
	name: 'service-detail',
	data() {
		return {
			currentStatus: 0,
			orderStatus: ['待付款', '待使用', '已使用', '已取消', '已退款', '已过期'],
		};
	},
	created() {},
	methods: {},
};
</script>

<style lang='scss' scoped>
@import '@/styles/var.scss';

$color: var(--thir-color);

.service-detail-wrap {
	display: block;
	padding-bottom: 300px;
}

.order-tips {
	padding: 40px 0 40px 48px;
	margin-top: 50px;
	border: 1px solid var(--cb-color);

	.current-status {
		font-size: 16px;
		font-weight: 600;
	}

	.tips {
		font-size: 12px;
		margin-top: 10px;
		span {
			color: var(--def-backdrop);
		}

		i {
			color: var(--thir-color);
		}
	}

	.remind-delivery {
		margin-top: 10px;
		span {
			width: 70px;
			height: 26px;
			line-height: 26px;
			text-align: center;
			font-size: 12px;
			display: inline-block;
			cursor: pointer;
		}

		.def {
			color: var(--f-color);
			background-color: var(--def-backdrop);
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

.order-detail-info-caption {
	height: 50px;
	border-top: 1px solid var(--cb-color);
	margin-top: 30px;
	align-items: center;
}

.order-detail-info-caption,
.order-detail-info-body {
	display: flex;

	& > span {
		text-align: center;
	}
	& > div {
		display: flex;
	}
}

.service-info {
	flex: 1;
}

.service-time {
	width: 200px;
}

.service-sum {
	width: 176px;
}

.service-price {
	width: 176px;
}

.order-detail-info-body {
	border: 1px solid var(--cb-color);
	padding: 10px 0;
	.service-info {
		flex: 1;
		display: flex;
		.service-info-img {
			width: 100px;
			height: 100px;
			border-radius: 7px;
			overflow: hidden;
			margin: 0 10px;
		}

		.service-info-main {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: flex-start;
			text-align: left;
			padding-right: 10px;
			p {
				@include ellipsis();
			}
		}

		.service-info-main p:not(:first-child) {
			color: var(--thir-color);
		}
	}

	.service-time {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.valid-time {
			color: var(--def-backdrop);
			margin-top: 5px;
		}
	}

	.service-sum,
	.service-price {
		display: flex;
		align-items: center;
		justify-content: center;
	}
}

.service-result {
	height: 60px;
	text-align: right;
	line-height: 60px;
	background-color: #f7f7f7;
	margin-top: 30px;
	padding-right: 20px;
	span {
		font-size: 20px;
		color: var(--def-backdrop);
	}
}
</style>