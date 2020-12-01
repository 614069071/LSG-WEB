 <template>
	<!-- 看了又看 -->
	<div v-if="model.length" class='relook-wrap'>
		<div class="relook-title">看了又看</div>
		<div class="relook-goods-list">
			<router-link :to="`/product/detail/${item.productId}`" tag="div" class="relook-goods-item btn" v-for="(item,index) in model" :key="index">
				<div class="img">
					<img :src="item.thumbImage" alt="">
				</div>
				<p class="title ellipsis" :title="item.productName">{{item.productName}}</p>
				<p class="price"><i>￥</i><span class="current-price">{{item.priceCurrent}}</span><span class="original-price">{{item.price}}元</span></p>
			</router-link>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Relook',
	props: {
		title: {
			type: String,
			default: '看了又看',
		},
		model: {
			type: Array,
			default: () => [],
		},
	},
};
</script>

<style lang='scss' scoped>
.relook-wrap {
	width: 234px;
	background-color: #eafafa;
}

.relook-title {
	height: 62px;
	line-height: 62px;
	padding-left: 17px;
	font-size: 24px;
}

.relook-goods-list {
	padding: 0 17px 20px;
	.relook-goods-item {
		background-color: var(--f-color);
		padding-bottom: 32px;

		.img {
			height: 200px;
		}

		.title {
			font-size: 18px;
			text-align: center;
			margin: 10px 0 20px;
			padding: 0 10px;
		}

		.price {
			text-align: center;
			color: var(--def-backdrop);
			.current-price {
				font-size: 18px;
				margin-right: 10px;
			}

			.original-price {
				color: var(--thir-color);
				text-decoration: line-through;
			}
		}
	}

	.relook-goods-item:not(:last-child) {
		margin-bottom: 20px;
	}
}
</style>