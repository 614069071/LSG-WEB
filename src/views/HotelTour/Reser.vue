 <template>
	<!-- 立即预定 -->
	<div class='reser-now-page-wrap inner'>
		<div class="reser-detail-info">
			<div class="reser-detail-img">
				<img src="@/assets/images/hotel3.jpg" alt="">
			</div>

			<div class="reser-detail-intro">
				<h5>三亚北京路希尔顿酒店 赠送早餐 一间/晚</h5>
				<p><span>大床房一间/晚</span></p>
			</div>
		</div>

		<div class="reser-in-info">
			<h4>入住信息</h4>
			<p><span>入住日期</span>线下预约，有效期截止至：2020年10月1日 共1晚</p>
			<p><span>入住人</span><input type="text" placeholder="1间填写1人姓名" /></p>
			<p><span>联系电话</span><input type="text" placeholder="预定成功会发送短信通知" /></p>
			<p><span>订单留言</span><textarea placeholder="请输入留言"></textarea></p>
		</div>

		<div class="reser-order-wrap">
			<div class="reser-order-left">
				<p>订单金额 <span>￥198.00</span></p>
				<p>订单金额不包含押金，您需要到店消费时按实际缴纳押金哦！</p>
			</div>
			<div class="submit-btn btn" @click="submitOrderHandle">提交订单</div>
		</div>

	</div>
</template>

<script>
export default {
	name: '',
	data() {
		return {};
	},
	methods: {
		submitOrderHandle() {
			this.$layer.msg('该功能尚未开放，敬请期待');
		},
	},
};
</script>

<style lang='scss' scoped>
@mixin radius {
	border-radius: 10px;
	overflow: hidden;
}

.reser-now-page-wrap > div {
	background-color: var(--f-color);
	margin-top: 20px;
	@include radius;
	padding: 0 32px;
}

div.reser-detail-info {
	display: flex;
	padding: 32px;

	.reser-detail-img {
		width: 260px;
		height: 160px;
		border-radius: 9px;
		overflow: hidden;
	}

	.reser-detail-intro {
		padding: 30px 20px;
		h5 {
			font-size: 24px;
			font-weight: 500;
		}

		p {
			margin-top: 20px;
		}
		p span {
			display: inline-block;
			height: 26px;
			padding: 0 10px;
			line-height: 26px;
			color: var(--def-backdrop);
			border: 1px solid var(--def-backdrop);
			border-radius: 4px;
		}
	}
}

div.reser-in-info {
	h4 {
		font-size: 20px;
		font-weight: 500;
		line-height: 60px;
	}

	p {
		display: flex;
		margin-bottom: 20px;
		line-height: 34px;
		span {
			width: 76px;
			height: 34px;
			line-height: 34px;
		}

		input,
		textarea {
			border-radius: 4px;
			border: 1px solid rgba(0, 0, 0, 0.15);
			padding: 0 12px;
		}

		input {
			height: 32px;
			line-height: 32px;
			width: 244px;
		}

		textarea {
			width: 450px;
			height: 64px;
			resize: none;
			line-height: 24px;
		}
	}
}

div.reser-order-wrap {
	display: flex;
	justify-content: space-between;
	padding: 20px 32px;
	margin-bottom: 20px;

	.reser-order-left {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.reser-order-left p:last-child {
		color: var(--thir-color);
	}

	.reser-order-left p span {
		color: var(--def-backdrop);
		font-size: 20px;
		padding-left: 20px;
	}

	.submit-btn {
		width: 120px;
		height: 40px;
		text-align: center;
		line-height: 40px;
		background-color: var(--def-backdrop);
		color: var(--f-color);
		font-size: 20px;
		border-radius: 4px;
	}
}
</style>