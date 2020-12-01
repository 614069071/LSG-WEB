 <template>
	<div class='coupon-item-wrap' :class="{overdue:overdue}">
		<div class="coupon-title">
			<div class="amount"><i>￥</i>50</div>
			<div class="info-des">
				<p class="ellipsis">券名称（这是一条很长的标题）</p>
				<p>无金额门槛</p>
			</div>
		</div>
		<div class="coupon-main">
			<div class="main-item">
				<span>适用范围：</span>
				<div>自营商品适用</div>
			</div>
			<div class="main-item">
				<span>有效期限：</span>
				<div>2020.09.10-2020.10.11</div>
			</div>
			<div class="main-item">
				<span>使用说明：</span>
				<div class="des">
					<span class="ellipsis">同一用户限领1张，仅限部分自营商品可用</span>
					<i class="el-icon-arrow-up"></i>
				</div>
				<div class="des-content">同一用户限领1张，仅限部分自营商品可用同一用户限领1张，仅限部分自营商品可用</div>
			</div>

			<div class="btn-use btn" v-if="!overdue">立即使用</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Coupon',
	props: {
		overdue: {
			type: Boolean,
		},
	},
	data() {
		return {};
	},
	methods: {},
};
</script>

<style lang='scss' scoped>
.coupon-item-wrap {
	width: 300px;
	border-radius: 6px;
	overflow: hidden;
}

.coupon-title {
	display: flex;
	height: 70px;
	align-items: center;
	color: var(--f-color);
	background-color: var(--def-backdrop);
	padding: 0 20px;
	position: relative;
	&:before {
		content: ' ';
		width: 100%;
		position: absolute;
		/* 小球形状 */
		border-bottom: 6px dotted #f9f9f9;
		left: 0px;
		bottom: -3px;
	}
	.amount {
		font-size: 28px;
		margin-right: 20px;
		i {
			font-size: 14px;
		}
	}

	.info-des p:last-child {
		font-size: 12px;
		margin-top: 6px;
	}
}

.coupon-main {
	padding: 10px 20px 20px 20px;
	font-size: 12px;
	background-color: #f9f9f9;
	.main-item {
		color: var(--thir-color);
		line-height: 24px;
		display: flex;
		position: relative;
	}
	.main-item span {
		width: 70px;
		color: var(--sec-color);
	}

	.main-item div.des {
		// height: 48px;
		flex: 1;
		display: flex;
		align-items: center;
		cursor: pointer;

		span {
			width: 170px;
			display: inline-block;
			color: var(--thir-color);
		}
		i {
			width: 20px;
			height: 20px;
			line-height: 20px;
			text-align: center;
			font-size: 18px;
			color: var(--thir-color);
			// transition: all 0.1s;
		}
	}

	.main-item div.des:hover {
		& + .des-content {
			display: block;
		}

		i {
			transform: rotate(180deg);
		}
	}

	.main-item .des-content {
		position: absolute;
		left: 50%;
		top: 24px;
		transform: translateX(-50%);
		z-index: 100;
		width: 100%;
		padding: 4px 10px;
		background-color: var(--f-color);
		box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
		display: none;
	}

	.main-item .des-content:after {
		content: '';
		position: absolute;
		width: 0;
		height: 0;
		border-style: solid;
		border-color: transparent transparent var(--f-color) transparent;
		border-width: 9px;
		right: 10px;
		top: -18px;
	}

	.btn-use {
		border-radius: 26px;
		height: 26px;
		width: 100px;
		line-height: 26px;
		text-align: center;
		color: var(--def-backdrop);
		border: 1px solid var(--def-backdrop);
		margin: 14px auto 0;
		background-color: var(--f-color);
		transition: all 0.1s;
	}

	.btn-use:hover {
		color: var(--f-color);
		background-color: var(--def-backdrop);
	}
}

.coupon-item-wrap.overdue {
	.coupon-title {
		background-color: #b9b9b9;
	}
}
</style>