 <template>
	<!-- 品牌专题页 -->
	<div class='brand-page-wrap'>
		<!-- 顶部导航 -->
		<HeadBar></HeadBar>
		<!-- 搜索购物车 -->
		<header class="all-header">
			<div class="all-header-main inner">
				<Logo></Logo>
				<SearchCart></SearchCart>
			</div>
		</header>
		<SideNav default-status></SideNav>

		<!-- <div class="brand-pagination inner">美容彩妆>护肤 共<i>200</i>个商品</div> -->

		<template v-if="isHave">
			<div class="brand-header-wrap inner">
				<div class="brand-header-img">
					<img :src="brandInfo.preview || require('@/assets/images/brand_blank.png')" alt="">
				</div>

				<div class="brand-header-des">
					<div class="brand-logo">
						<div class="img">
							<img :src="brandInfo.image" alt="">
						</div>
						<div class="title">
							<span>{{brandInfo.name}}</span>
							<span>在售商品<i>{{brandInfo.sales}}</i>件</span>
						</div>
					</div>

					<p class="brand-intro">{{brandInfo.details}}</p>
				</div>
			</div>

			<!-- 综合分类 -->

			<div class="choose-type-tab inner">
				<div class="before">
					<div class="def-item" :class="{active:chooseTypeKey ==='all'}">综合</div>
					<!-- <div class="def-item" :class="{active:chooseTypeKey ==='sales'}" @click="chooseTypeKeyChange('sales')">销量</div>
					<div class="def-item" :class="{active:chooseTypeKey ==='new'}" @click="chooseTypeKeyChange('new')">新品</div> -->
					<!-- <div class="price">
					<span>价格</span>
					<input type="text" v-model="priceMin" placeholder="￥" />
					<span>-</span>
					<input type="text" v-model="priceMax" placeholder="￥" />
				</div>
				<div class="address">
					收货地址
					<span class="address-wrap">
						<Distpicker :address.sync="shopAddress" :display.sync="shopDisplay"></Distpicker>
					</span>
				</div> -->
				</div>

				<div class="after">
					<span class="page-display"><i>{{currentPag}}</i>/{{allPag}} </span>
					<span class="btn" @click="pagingToggle('left')"><i class="el-icon-arrow-left"></i></span>
					<span class="btn" @click="pagingToggle('right')"><i class="el-icon-arrow-right"></i></span>
				</div>
			</div>
			<!-- 商品展示 -->
			<GoodsColle :model="goodsList"></GoodsColle>

			<NoData v-if="!goodsList.length">暂无相关品牌商品</NoData>
		</template>

		<NoData v-else>暂无该品牌数据</NoData>

		<SideFooter></SideFooter>
		<Information></Information>
	</div>
</template>

<script>
import GoodsColle from '../components/GoodsColle';
export default {
	name: 'Brand',
	components: { GoodsColle },
	data() {
		return {
			priceMin: '',
			priceMax: '',
			shopAddress: [],
			brandInfo: {},
			shopDisplay: false,
			currentPag: 1,
			allPag: 1,
			pageSize: 12,
			goodsList: [],
			chooseTypeKey: 'all',
			isHave: true,
		};
	},
	watch: {
		'$route.params.id': {
			handler(v) {
				this.getBrandInfo();
			},
			immediate: true,
		},
	},
	methods: {
		pagingToggle(dir) {
			if (dir === 'left') {
				if (this.currentPag <= 1) return;
				this.currentPag--;
			} else {
				if (this.currentPag >= this.allPag) return;
				this.currentPag++;
			}
			this.getBrandList();
		},
		getBrandInfo() {
			const { id } = this.$route.params;

			this.$axios
				.getBrandInfo(id)
				.then(({ data = {} }) => {
					this.brandInfo = data;
					this.isHave = true;
					this.getBrandList();
				})
				.catch(() => {
					this.isHave = false;
				});
		},
		getBrandList() {
			const { id } = this.$route.params;
			const params = {
				size: this.pageSize,
				page: this.currentPag,
			};
			//专属推荐
			this.$axios.getBrandList(id, params).then(({ data }) => {
				const { total = 0, list = [] } = data;
				const num = Math.ceil(total / this.pageSize); //计算分页数量
				this.allPag = num;
				this.goodsList = Object.freeze(list);
			});
		},
		chooseTypeKeyChange(v) {
			// 模拟
			this.chooseTypeKey = v;
		},
	},
};
</script>

<style lang='scss' scoped>
.brand-pagination {
	height: 54px;
	line-height: 54px;
	color: var(--sec-color);
	i {
		color: var(--def-backdrop);
	}
}

.brand-header-wrap {
	display: flex;
	height: 300px;
	justify-content: space-between;
	background-color: var(--f-color);
	margin-top: 20px;

	& > div {
		height: 100%;
	}
}

.brand-header-img {
	width: 550px;
}

.brand-header-des {
	width: 500px;
	margin-right: 20px;
}

.brand-logo {
	height: 80px;
	margin: 20px 0 30px 0;
	display: flex;
	.img {
		width: 80px;
		height: 80px;

		border: 1px solid var(--e-color);
	}

	.title {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin-left: 10px;
		span {
			display: block;
		}

		span:first-child {
			font-size: 18px;
		}

		span:last-child {
			font-size: 12px;
			i {
				color: var(--def-backdrop);
			}
		}
	}
}

.brand-intro {
	font-size: 12px;
	line-height: 18px;
}

// 综合分类
.choose-type-tab {
	height: 40px;
	display: flex;
	justify-content: space-between;
	align-content: center;
	background-color: var(--f-color);
	color: var(--sec-color);
	margin: 20px auto;

	.before {
		display: flex;
		& > div.def-item {
			display: inline-block;
			height: 100%;
			width: 100px;
			text-align: center;
			line-height: 40px;
		}
		> div.active {
			color: var(--f-color);
			background-color: var(--def-backdrop);
		}
		div.price {
			width: 170px;
			display: flex;
			align-items: center;
			justify-content: center;

			> span {
				margin: 0 5px;
			}

			input {
				width: 50px;
				height: 18px;
				background-color: var(--e-color);
				// background-color: red;
				border: 0 !important;
				outline: none;
				box-sizing: border-box;
			}
		}

		.address {
			display: flex;
			padding-left: 20px;
			align-items: center;
			span {
				position: relative;
			}
		}

		.address-wrap {
			border: 1px solid var(--e-color);
			height: 20px;
			line-height: 20px;
			margin-left: 12px;
		}
	}

	.before > div:not(:last-child) {
		border-right: 1px solid var(--e-color);
	}

	.after {
		display: flex;
		align-items: center;
		.page-display {
			i {
				color: var(--def-backdrop);
			}
		}

		span {
			margin-right: 8px;
		}

		.btn {
			width: 16px;
			height: 16px;
			background-color: var(--e-color);
		}
	}
}

// .goods-show-wrap {
// 	overflow: hidden;
// 	padding-bottom: 20px;
// 	.goods-show-list-inner {
// 		width: 1130px;
// 	}
// }

// .goods-list-item {
// 	display: inline-block;
// 	margin-bottom: 10px;
// 	margin-right: 20px;
// }
</style>
