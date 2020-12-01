<template>
	<!-- 普通商品 -->
	<router-link tag="div" :to="`/product/detail/${model.productId}`" class="btn commodity-wrap">
		<div class="commodity-img">
			<img v-lazy="model.thumbImage" :alt="model.productName">
		</div>
		<div class="commodity-info">
			<p class="ellipsis" :title="model.productName">{{model.productName}}</p>
			<div class="commodity-price-info">
				<span class="commodity-info-price">{{model.priceCurrent}} <i>{{model.price}}元</i></span>
				<span>销量{{model.soldAmount}}</span>
			</div>
		</div>

		<div class="bottom">
			<span class="address" v-if="model.address">韩国</span>
			<div class="other" v-if="model.other"><span class="proprietary">自营</span> <span class="tax">包税</span></div>
		</div>
	</router-link>
</template>

<script>
export default {
	name: 'Commodity',
	props: {
		model: {
			type: Object,
			default: () => ({}),
		},
	},
};
</script>

<style scoped lang="scss">
.commodity-wrap {
	display: inline-block;
	width: 260px;
	height: 390px;
	padding: 8px 8px 0 8px;
	box-sizing: border-box;
	background-color: #fff;
	transition: all 0.2s;

	.commodity-img {
		width: 244px;
		height: 244px;
	}

	.commodity-info {
		p {
			height: 50px;
			line-height: 50px;
			font-size: 16px;
			text-align: center;
		}

		.commodity-price-info {
			display: flex;
			// padding: 0 20px;
			justify-content: space-between;
			align-items: baseline;

			.commodity-info-price {
				color: var(--def-backdrop);
				font-size: 18px;
				i {
					font-size: 14px;
					color: var(--thir-color);
					text-decoration: line-through;
				}

				&::before {
					content: '￥';
					font-size: 15px;
				}
			}
			span {
				color: var(--thir-color);
			}
		}
	}

	&:hover {
		transform: translate(-2px, -2px);
		box-shadow: 0px 3px 13px 2px rgba(0, 0, 0, 0.1);
	}

	.bottom {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
		padding-bottom: 26px;
		.adress {
			color: var(--thir-color);
		}
		.other {
			display: flex;
			span {
				height: 18px;
				line-height: 16px;
				padding: 0 5px;
				box-sizing: border-box;
				font-size: 12px;
				margin-left: 5px;
			}

			.proprietary {
				border: 1px solid var(--def-backdrop);
				color: var(--def-backdrop);
			}

			.tax {
				background-color: var(--def-backdrop);
				color: #fff;
			}
		}
	}
}
</style>