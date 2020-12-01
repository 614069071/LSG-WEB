 <template>
	<div class='order-footer-info'>
		<div class="order-list">
			<div class="order-caption">
				<span class="goods-detail">商品信息</span>
				<span class="goods-price">售价（元）</span>
				<span class="goods-sum">数量（件）</span>
				<span class="goods-weight">重量</span>
				<span class="goods-prefer">优惠</span>
			</div>
			<div class="order-list-title">睐思购自营保税仓发货</div>
			<div class="order-list-item" v-for="(item,index) in model.itemList" :key="index">
				<div class="order-detail">
					<div class="img">
						<img :src="item.thumbUrl" alt="">
					</div>
					<div class="order-detail-info">
						<p>{{item.name}}</p>
						<p>
							<span>包装:豪华版</span>
							<span>净含量：50g</span>
						</p>
					</div>
				</div>
				<div class="order-price">{{item.price}}</div>
				<div class="order-sum">{{item.num}}</div>
				<div class="order-weight">20kg</div>
				<div class="order-prefer">包税</div>
			</div>
		</div>

		<div class="order-result">
			<p><span>商品总价：</span> <span> ￥{{model.amountPaid}}</span></p>
			<p><span>优惠：</span> <span>￥{{model.discountedAmount}}</span> </p>
			<p><span>运费：</span> <span>￥{{model.shippingFee}}</span></p>
			<p><span>税费：</span> <span>￥{{model.taxFee}}</span> </p>
			<p><span>订单金额：</span> <span class="total-amount">{{model.amountPaid}}</span></p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'order-footer',
	props: {
		model: {
			type: Object,
			default: () => ({}),
		},
	},
	data() {
		return {};
	},
	methods: {},
};
</script>

<style lang='scss' scoped>
$color: var(--thir-color);

.order-footer-info {
	margin-top: 30px;
	border-top: 1px solid var(--cb-color);
}
.order-caption,
.order-list-item {
	display: flex;
	border: 1px solid var(--cb-color);
	border-top: none;
	& > div,
	& > span {
		text-align: center;
	}
}

.order-caption {
	border: none !important;
}

.goods-detail,
.order-detail {
	flex: 1;
}

.goods-price,
.order-price {
	width: 176px;
}
.goods-sum,
.order-sum {
	width: 176px;
}
.goods-weight,
.order-weight {
	width: 148px;
}
.goods-prefer,
.order-prefer {
	width: 148px;
}

.order-caption {
	height: 50px;
	line-height: 50px;
	color: $color;
}

.order-list-title {
	height: 30px;
	line-height: 30px;
	background-color: var(--ed-color);
	color: $color;
	font-size: 12px;
	padding-left: 48px;
}

.order-list-item {
	height: 100px;
	padding: 10px 0;
}

.order-list-item > div {
	display: flex;
	align-items: center;
	justify-content: center;
}

.order-list-item .order-detail {
	display: flex;
	padding-left: 50px;
	.img {
		width: 100px;
		height: 100px;
		border-radius: 7px;
		overflow: hidden;
	}

	.order-detail-info {
		display: flex;
		height: 100px;
		flex: 1;
		flex-direction: column;
		justify-content: space-between;
		text-align: left;
		padding-left: 10px;
		font-size: 12px;
		p {
			line-height: 22px;
		}

		p:first-child {
			margin-top: 10px;
		}
		p:last-child {
			color: $color;
			margin-bottom: 10px;
		}
	}
}

.order-result {
	padding: 20px 30px 20px 0;
	margin-top: 20px;
	background-color: var(--ed-color);
	p {
		height: 32px;
		line-height: 32px;
		text-align: right;
		span {
			width: 84px;
			display: inline-block;
			text-align: right;
		}
		.total-amount {
			color: var(--def-backdrop);
			font-size: 16px;
			&::before {
				content: '￥';
				font-size: 12px;
			}
		}
	}
}
</style>