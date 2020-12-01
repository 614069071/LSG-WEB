 <template>
	<div class="order-steps inner">
		<div class="order-status-item" :class="{active:step >= 0}">
			<p>提交订单</p>
			<span>
				<Cicon iconClass="icon-weibiaoti--"></Cicon>
			</span>
		</div>

		<div class="order-status-item" :class="{active:step >= 1}">
			<p>付款成功</p>
			<span>
				<Cicon iconClass="icon-fukuan"></Cicon>
			</span>
		</div>

		<div class="order-status-item" :class="{active:step >= 2}">
			<p>仓库发货</p>
			<span>
				<Cicon iconClass="icon-feiji2"></Cicon>
			</span>
		</div>

		<div class="order-status-item" :class="{active:step >= 3}">
			<p>确认收货</p>
			<span>
				<Cicon iconClass="icon-duigou"></Cicon>
			</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'order-detail-steps',
	props: {
		step: {
			type: [Number, String],
			default: 0,
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
.order-steps {
	display: flex;
	justify-content: space-between;
	margin-top: 75px;
	padding: 0 60px;
	box-sizing: border-box;

	.order-status-item {
		width: 32px;
		height: 32px;
		text-align: center;
		position: relative;
		line-height: 27px;
		color: $color;
		border-radius: 50%;
		border: 2px solid $color;
		padding-top: 2px;
		box-sizing: border-box;
		p {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			white-space: nowrap;
			top: -34px;
		}
	}

	.order-status-item:not(:first-child)::before {
		content: '';
		position: absolute;
		width: 230px;
		height: 1px;
		background-color: var(--cb-color);
		right: 60px;
		top: 50%;
	}

	.order-status-item.active {
		color: var(--def-backdrop);
		border-color: var(--def-backdrop);
	}

	.order-status-item.active::before {
		background-color: var(--def-backdrop);
	}
}
</style>