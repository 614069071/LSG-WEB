 <template>
	<router-link tag="div" to="/hotel/detail/1" class='hotel-region-wrap'>
		<div class="region-img">
			<img v-lazy="model.img" alt="">
		</div>
		<div class="region-main">
			<p class="title">{{model.name}}</p>
			<p class="type-des">
				<span>大床房1间/晚</span>
				<span>北京路128号</span>
			</p>
			<p class="price"><i>￥</i>{{model.price}}</p>
		</div>
	</router-link>
</template>

<script>
export default {
	name: 'hotel-region',
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
.hotel-region-wrap {
	width: 343px;
	height: 310px;
	color: var(--def-color);
	background-color: #fff;
	display: inline-block;
}

.region-img {
	width: 100%;
	height: 180px;
	border-radius: 2px 2px 0 0;
	overflow: hidden;
}

.region-main {
	.title {
		font-size: 16px;
		font-weight: 600;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		margin-top: 20px;
	}

	.type-des {
		margin-top: 10px;
		span {
			display: inline-block;
			height: 22px;
			line-height: 22px;
			position: relative;
		}
	}

	.type-des span:not(:first-child) {
		padding-left: 16px;
		&::before {
			content: '';
			position: absolute;
			width: 1px;
			height: 8px;
			background-color: #d8d8d8;
			left: 8px;
			top: 4px;
		}
	}

	.price {
		color: var(--def-backdrop);
		font-size: 28px;
		margin-top: 20px;
		i {
			font-size: 18px;
		}
	}
}
</style>