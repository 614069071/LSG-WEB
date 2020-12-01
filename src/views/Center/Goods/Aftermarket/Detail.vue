 <template>
	<div class='aftermarket-detail-wrap'>
		<div class="inner">
			<div class="aftermarket-tiltle">当前位置：睐思购海购 > 个人中心 > 退款售后 > 售后详情</div>

			<div class="section-item">
				<div class="section-title">
					<span class="title-info">商品信息</span>
					<span class="title-price">售价（元）</span>
					<span class="title-num">申请数量</span>
				</div>

				<div class="section-main goods-detail-wrap">
					<div class="goods-detail-info">
						<div class="previe-img"><img src="https://api.laisigou.com/images/sksxs2.png" alt=""></div>
						<div class="preview-info">
							<div class="mut-ellipsis">祛斑好帮手】修正茜妃祛斑霜30g 除斑美白修正茜妃祛斑霜30g 除斑美白修正茜妃祛斑霜30g 除斑美白修正茜妃祛</div>
							<div class="specif">包装 : 豪华版</div>
						</div>
					</div>
					<div class="info-price">39.99</div>
					<div class="info-num">2</div>
				</div>
			</div>

			<div class="section-item">
				<div class="section-title">
					<span class="title-info">售后详情</span>
				</div>

				<div class="section-main goods-order-wrap">
					<div class="order-coll"><span>售后单号：</span>2020082612032376</div>
					<div class="order-coll"><span>申请时间：</span>2020082612032376</div>
					<div class="order-coll"><span>售后类型：</span>2020082612032376</div>
					<div class="order-coll"><span>售后状态：</span>2020082612032376</div>
					<div class="order-coll"><span>退款金额：</span>2020082612032376</div>
					<div class="order-coll"><span>退款说明：</span>2020082612032376</div>
					<div class="order-coll">
						<span>图片凭证：</span>
						<div class="order-item"><img src="https://api.laisigou.com/images/sksxs2.png" alt=""></div>
						<div class="order-item"><img src="https://api.laisigou.com/images/sksxs2.png" alt=""></div>
						<div class="order-item"><img src="https://api.laisigou.com/images/sksxs2.png" alt=""></div>
					</div>
				</div>
			</div>

			<div class="section-item">
				<div class="section-title">
					<span class="title-info">商品寄回地址<i>请将商品寄回以下退货地址信息</i></span>
				</div>
				<div class="section-main">
					<div class="order-coll"><span>收货人：</span>2020082612032376</div>
					<div class="order-coll"><span>联系电话：</span>2020082612032376</div>
					<div class="order-coll"><span>收货地址：</span>2020082612032376</div>
				</div>
			</div>

			<div class="section-item">
				<div class="section-title">
					<span class="title-info">商品寄回地址</span>
				</div>
				<div class="section-main">
					<p class="sec-text">商品寄回地址将在审核通过后以短信形式告知</p>
					<p class="sec-text warning-text">请在申请通过后填写商品寄回物流单号</p>
				</div>
			</div>

			<div class="section-item">
				<div class="section-title">
					<span class="title-info">驳回信息</span>
				</div>

				<div class="section-main">
					<div class="order-coll"><span>处理时间：</span>2020082612032376</div>
					<div class="order-coll"><span>驳回原因：</span>用户自己收到货摔坏的，不予退款</div>
				</div>
			</div>

			<div class="section-item">
				<div class="section-title">
					<span class="title-info">退款信息</span>
				</div>

				<div class="section-main">
					<div class="order-coll"><span>退款时间：</span>2020-09-20 17:23:34</div>
					<div class="order-coll"><span>实退金额：</span>￥192.00</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
export default {
	name: '',
	data() {
		return {};
	},
	methods: {},
};
</script>

<style lang='scss' scoped>
.aftermarket-detail-wrap {
	background-color: #eee;
	width: 100%;
	padding-bottom: 20px;
}

.aftermarket-tiltle {
	height: 54px;
	line-height: 54px;
	color: var(--thir-color);
}

.section-item {
	background-color: var(--f-color);
	padding: 0 32px;
	border-radius: 10px;
	margin-bottom: 20px;
	color: var(--def-color);
}

.section-title {
	height: 54px;
	display: flex;
	align-items: center;
	font-size: 16px;
	border-bottom: 1px solid var(--e9-color);
}
.title-info,
.goods-detail-info {
	flex: 1;
}

.title-info i {
	color: var(--def-backdrop);
	margin-left: 20px;
}

.title-num,
.title-price,
.info-price,
.info-num {
	width: 120px;
	text-align: center;
}

.section-main {
	padding: 20px 0;
	.order-coll {
		margin-bottom: 16px;
		display: flex;
		& > span {
			color: var(--thir-color);
		}
	}

	& .order-coll:last-child {
		margin-bottom: 0;
	}

	.order-coll > span {
		width: 75px;
	}
	.order-item {
		width: 104px;
		height: 104px;
		padding: 8px;
		box-sizing: border-box;
		border: 1px solid #d5d6d7;
		margin-right: 10px;
		margin-bottom: 10px;
		border-radius: 4px;
	}

	.sec-text {
		margin-bottom: 16px;
	}

	.warning-text {
		color: var(--def-backdrop);
	}
}

.goods-detail-wrap {
	display: flex;
}

.goods-detail-info {
	display: flex;

	.preview-info {
		display: flex;
		width: 530px;
		flex-direction: column;
		justify-content: space-between;
		padding: 5px 0;
		line-height: 22px;
		margin-left: 20px;
	}

	.specif {
		color: var(--thir-color);
		font-size: 12px;
	}

	.previe-img {
		width: 100px;
		height: 100px;
	}
}
</style>