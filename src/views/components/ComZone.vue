<template>
	<!-- home首页专区 -->
	<div class='region-wrap btn inner'>
		<h2 class="region-head-wrap">
			{{model.title}}
			<span @click="dealink({linkType:model.sectionLinkType,link:model.sectionLink})">更多好货<i class="el-icon-arrow-right"></i></span>
		</h2>
		<div class="region-wrap-top">
			<div class="region-wrap-top-left">
				<div @click="dealink(model.mainPromo)">
					<img v-lazy="model.mainPromo.imageSource" :alt="model.mainPromo.title">
				</div>
			</div>

			<div class="region-wrap-top-center">
				<div class="region-wrap-top-center-item" v-for="(item,index) in model.sectionPromo" :key="index" @click="dealink(item)">
					<div class="region-wrap-top-center-item-img">
						<img v-lazy="item.imageSource" :alt="item.productName">
					</div>
					<p>{{item.title}}</p>
					<p>{{item.description}}</p>
				</div>
			</div>

			<div class="region-wrap-top-right">
				<p>热门品牌</p>
				<div class="region-wrap-top-right-hot-list">
					<router-link tag="div" :to="`/brand/${item.brandId}`" class="region-wrap-top-right-hot-item" v-for="(item,index) in model.sectionBrand" :key="index">
						<img v-lazy="item.brandImage" :alt="item.label">
					</router-link>
				</div>
			</div>
		</div>

		<GoodsColle class="region-wrap-bottom" :model="model.content"></GoodsColle>
	</div>
</template>

<script>
import GoodsColle from '../components/GoodsColle';
export default {
	name: 'ComZone',
	components: { GoodsColle },
	props: {
		model: {
			type: Object,
			default: () => ({}),
		},
	},
	data() {
		return {
			list: [],
		};
	},
	created() {},
	mounted() {},
	methods: {},
};
</script>

<style lang='scss' scoped>
.region-head-wrap {
	height: 62px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: var(--def-color);

	span {
		font-size: 14px;
		color: var(--sec-color);
		font-weight: 500;
	}
}
.region-wrap-top {
	display: flex;
	justify-content: space-between;
	.region-wrap-top-left {
		width: 278px;
		height: 537px;
		img {
			object-fit: contain !important;
		}
	}
}

.region-wrap-top-center {
	width: 542px;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;

	.region-wrap-top-center-item {
		width: 270px;
		height: 268px;
		text-align: center;
		box-sizing: border-box;
		background-color: var(--f-color);

		.region-wrap-top-center-item-img {
			width: 140px;
			height: 140px;
			margin-top: 20px;
			display: inline-block;

			img {
				width: 140px;
				height: 140px;
			}
		}

		p:nth-of-type(1) {
			font-size: 16px;
			color: var(--def-color);
			margin: 24px 0 10px 0;
		}

		p:nth-of-type(2) {
			color: var(--sec-color);
		}
	}
}

.region-wrap-top-right {
	width: 278px;
	height: 537px;
	padding: 0 30px;
	box-sizing: border-box;
	background-color: var(--f-color);
	& > p {
		height: 36px;
		line-height: 36px;
		font-size: 16px;
		color: var(--sec-color);
	}

	.region-wrap-top-right-hot-list {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-top: 30px;

		.region-wrap-top-right-hot-item {
			width: 100px;
			height: 108px;
			border: 1px solid var(--e-color);
			margin-bottom: 50px;
		}
	}
}
.region-wrap-bottom {
	margin-top: 20px;
}
</style>