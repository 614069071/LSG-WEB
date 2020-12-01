 <template>
	<!-- 我的收藏 -->
	<div class='personal-favorite-info'>
		<NavBar class="personal-center-left"></NavBar>

		<div class="personal-center-right">
			<div class="personal-center-right-title line">收藏的商品</div>
			<template v-if="favoriteList.length">
				<div class="favorite-list">
					<router-link class="favorite-item commodity-wrap btn" tag="div" :to="`/product/detail/${model.productId}`" v-for="(model,index) in favoriteList" :key="index">
						<div class="commodity-img">
							<img v-lazy="model.thumbImage" :alt="model.productName">
							<div class="del-btn-wrap" @click.stop="() => {}">
								<div class="del-btn" @click.stop="delFavoriteItem(model.productId)"><i class="el-icon-delete"></i></div>
							</div>
						</div>
						<div class="commodity-info">
							<p :title="model.productName">{{model.productName}}</p>
							<div class="commodity-price-info">
								<span class="commodity-info-price">{{model.priceCurrent}} <i>{{model.price}}元</i></span>
								<span>销量{{model.soldAmount}}</span>
							</div>
						</div>
					</router-link>
				</div>
				<div class="pagination-wrap">
					<el-pagination background layout="prev, pager, next" :total="paginationTotal" prev-text="上一页" next-text="下一页" :current-page.sync="currentPage" @current-change="currentClick" />
				</div>
			</template>

			<div class="no-favorite-wrap" v-else>
				<div class="no-favorite-img"><img :src="require('@/assets/images/favorite.png')" alt=""></div>
				<p>
					还没有收藏商品哦，<router-link to="/">去逛逛</router-link>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import NavBar from '../components/NavBar';

export default {
	name: 'Favorite',
	components: { NavBar },
	data() {
		return {
			favoriteList: [],
			paginationTotal: 1,
			currentPage: 1,
		};
	},
	created() {
		this.getFavoriteList();
	},
	methods: {
		getFavoriteList() {
			this.loadeing(true);
			const params = { page: this.currentPage, size: 10 };
			this.$axios.getFavList(params).then(({ data = {} }) => {
				this.favoriteList = data.list;
				this.paginationTotal = data.total;
			});
		},
		delFavoriteItem(v) {
			const params = { productId: v };
			this.$axios.delFavItem(params).then(() => {
				this.getFavoriteList();
			});
		},
		currentClick() {
			this.getFavoriteList();
		},
	},
};
</script>

<style lang='scss' scoped>
.no-favorite-wrap {
	width: 432px;
	padding-top: 55px;
	margin: 0 auto;
	p {
		text-align: center;
		margin-top: 30px;
		color: #b8b8b8;
		a {
			color: var(--def-backdrop);
			font-weight: 500;
		}
	}
}

.favorite-list {
	width: 970px;
	overflow: hidden;
}

.favorite-item {
	float: left;

	margin-top: 20px;
	margin-right: 28px;
}

@import '@/styles/var.scss';

.commodity-wrap {
	display: inline-block;
	width: 214px;
	height: 330px;
	box-sizing: border-box;
	background-color: var(--f-color);
	transition: all 0.2s;
	border: 1px solid var(--e9-color);
	overflow: hidden;
	position: relative;

	.commodity-img {
		width: 214px;
		height: 214px;
	}

	.commodity-info {
		padding: 0 10px 10px 10px;
		height: 106px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		p {
			line-height: 24px;
			font-size: 14px;
			margin-top: 15px;
			@include mut-ellipsis();
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

	.del-btn-wrap {
		width: 100%;
		height: 214px;
		background-color: rgba(255, 255, 255, 0.5);
		position: absolute;
		z-index: 10;
		top: 0;
		left: 0;
		transition: all 0.2s;
		opacity: 0;
	}

	.del-btn {
		position: absolute;
		right: 0;
		top: 0;
		width: 26px;
		height: 26px;
		background-color: rgba(0, 0, 0, 0.5);
		color: var(--f-color);
		text-align: center;
		line-height: 26px;
		font-size: 16px;
	}

	&:hover .del-btn-wrap {
		opacity: 1;
	}
}
</style>