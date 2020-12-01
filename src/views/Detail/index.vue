 <template>
	<!-- 商品概览选择 -->
	<div class="goods-detail-main-wrap">
		<div class="goods-detail-header-wrap">
			<!-- 顶部导航 -->
			<HeadBar></HeadBar>
			<!-- 搜索购物车 -->
			<header class="all-header">
				<div class="all-header-main inner">
					<Logo></Logo>
					<SearchCart></SearchCart>
				</div>
			</header>
			<!-- 导航栏 -->
			<SideNav default-status></SideNav>
		</div>

		<template v-if="isHave">
			<!-- 右侧滚动 -->
			<div class="goods-scroll-right-bar inner">
				<ScrollRightBar class="scroll"></ScrollRightBar>
			</div>

			<div class="goods-detail-paging-nav inner">
				<div class="goods-paging-left">
					<router-link v-for="item in mapBreadRoutes" :to="item.path" :key="item.path">{{item.meta.title}}<i class="el-icon-arrow-right"></i></router-link>
					<span class="goods-paging-left-title ellipsis">{{goodsInfo.productName}}</span>
				</div>
				<div class="goods-marks" v-if="1">
					<span>
						<Cicon iconClass="icon-laisigou-logo-04"></Cicon>自营
					</span>
					<span>
						<Cicon iconClass="icon-quanqiuglobal25"></Cicon>跨境
					</span>
				</div>
			</div>

			<!-- 商品展示 -->
			<div class="goods-detail-content inner">
				<!-- 商品预览 -->
				<div class="goods-detail-previwe">
					<VuePiczoom class="goods-detail-previwe-big" :url="goodsPreviewList[currrntGoosdsPreviewIndex] || ''"></VuePiczoom>

					<div class="goods-detail-previwe-list">
						<div class="left-btn" @click="slideToggle('left')"><i class="el-icon-arrow-left"></i></div>
						<div class="previwe-small-list">
							<ul :style="{left:currrntGoosdsPreviewListPosition * 82 + 'px'}">
								<li v-for="(item,index) in goodsPreviewList" :class="{active:currrntGoosdsPreviewIndex === index}" :key="index" @click="previewBigImage(index)">
									<img :src="item" alt="">
								</li>
							</ul>
						</div>
						<div class="right-btn" @click="slideToggle('right')"><i class="el-icon-arrow-right"></i></div>
					</div>
				</div>

				<!-- 商品导购 -->
				<div class="goods-detail-chooose">
					<h2 class="title">{{goodsInfo.productName}}</h2>
					<p class="des">{{goodsInfo.caption}}</p>
					<div class="price-wrap">
						<div class="price">
							<div class="before">售价</div>
							<div class="after">
								<span class="price-begin">￥{{unstablePrice || goodsInfo.priceCurrent}}</span> <span class="special-price">特价</span><span class="price-reference">参考价 ￥{{goodsInfo.price}}元</span>
							</div>
						</div>
						<div v-if="false" class="goods-more-combination">
							<div class="before">更多组合</div>
							<div class="after">
								<div class="choose-type" :class="{active:chooseType === index}" v-for="(item,index) in 5" :key="item" @click="chooseTypeChange(index)">
									显白脏橘色{{index}}<i>|</i>99元
								</div>
							</div>
						</div>
					</div>

					<div class="choose-type-item activity" v-if="goodsInfo.promoTag">
						<div class="before">活动</div>
						<!-- <div class="after"><span>新人专享</span>{{goodsInfo.promoTag}}</div> -->
						<div class="after">{{goodsInfo.promoTag}}</div>
					</div>

					<!-- 待后端完善 -->
					<div class="choose-type-item fees" v-if="0">
						<div class="before">税费</div>
						<div class="after">预估19.91,实际税费请以提交订单时为准<span>税费收取规则<Cicon iconClass="icon-webicon215"></Cicon></span></div>
					</div>

					<div class="choose-type-item freight" v-if="0">
						<div class="before">运费</div>
						<div class="after">至
							<div class="address">
								<Distpicker :display.sync="distpickerDisplay" :address.sync="distpickerValue"></Distpicker>
							</div>
							<span>包邮 <Cicon iconClass="icon-webicon215"></Cicon></span>
						</div>
					</div>

					<!-- 待后端完善 -->
					<div class="choose-type-item service" v-if="0">
						<div class="before">服务</div>
						<div class="after">
							<p>本商品由自营保税仓 发货</p>

							<div class="process">
								<div>
									<span>
										<Cicon iconClass="icon-feiji"></Cicon>
									</span>
									<span>正品货源</span>
								</div>
								<div class="active">
									<span>
										<Cicon iconClass="icon-feiji"></Cicon>
									</span>
									<span>自营保税区发货</span>
								</div>
								<div>
									<span>
										<Cicon iconClass="icon-dingwei"></Cicon>
									</span>
									<span>{{distpickerValue.length === 2 ? distpickerValue[0]:distpickerValue[1]}}</span>
								</div>
							</div>

							<div>19:30前完成支付,预计:8月20(周二)送达</div>
						</div>
					</div>

					<!-- <div class="choose-type-item color">
					<RecChoose :model="chooseTypeColle"></RecChoose>
					<p class="choose-type-checked">已选择：#Studded Kiss 梅子色{{chooseColorSure}}</p>
				</div> -->

					<!-- 规格选择 -->
					<div class="choose-type-item specif">
						<div class="before">{{chooseTypeColle.label}}</div>
						<div class="after">
							<div class="after-left">
								<div class="specif-content" :key="index" v-for="(item,index) in chooseTypeColle.children" @click="specifChange(index)">
									<div class="specif-content-item specif-type-item-img" :class="{active:specifChecked === index}">
										<img :src="item.previewImage" alt="">
									</div>
								</div>

								<div class="after-choose-tips">
									<p>已选择</p>
									<p>{{chooseTypeColle.children && chooseTypeColle.children.length && chooseTypeColle.children[specifChecked].label}}</p>
								</div>
							</div>
						</div>
					</div>

					<div class="choose-type-item specif specif-type">
						<div class="before">{{chooseTypeColle.childrenLabel}}</div>
						<div class="after">
							<div class="specif-content" :key="index" v-for="(item,index) in chooseTypeColleChild" @click="specifChildChange(index,item)">
								<div class="specif-content-item" :class="{active:specifChildChecked === index,unchoose:(!item.itemId || item.soldOut)}">
									<span class="specif-type-item-label">{{item.label}}</span>
								</div>
							</div>
						</div>
					</div>

					<div class="choose-type-item pack" v-if="0">
						<div class="before">包装</div>
						<div class="after">
							<div :class="{active:chooosePickSure === index}" @click="choosePickChange(index)" :key="index" v-for="(item,index) in goodsPickList">{{item}}
								<span v-show="chooosePickSure === index">
									<Cicon iconClass="icon-duigou"></Cicon>
								</span>
							</div>
						</div>
					</div>

					<div class="choose-type-item sum">
						<div class="before">数量</div>
						<div class="after">
							<span class="buy-btn" @click="buySumChange('-')">-</span>
							<span class="buy-sum">{{buySum}}</span>
							<span class="buy-btn" @click="buySumChange('+')">+</span>
						</div>
					</div>

					<div class="choose-type-item instruction">
						<div class="before">说明</div>
						<div class="after">
							{{goodsInfo.saleService}}
						</div>
					</div>

					<div class="buy-operation">
						<div class="buy-operation-now" @click="buyNowClick">立即购买</div>
						<div class="buy-operation-add" @click="addCartHandle(goodsInfo.productId)">加入购物车</div>
						<div class="buy-operation-coll" @click="favoriteClick(goodsInfo.isFav)">
							<Cicon v-if="goodsInfo.isFav" iconClass="icon-ziyuan3" color="#16c1bc" />
							<Cicon v-else iconClass="icon-icon_fuben" />
							收藏
							<!-- <span class="operation-state">{{goodsInfo.isFav ? '已收藏':'收藏'}}</span>
						<span class="operation-hover">{{goodsInfo.isFav ? '取消收藏':'收藏'}}</span> -->
						</div>
					</div>

					<div class="buy-score">
						<div>
							<span :class="{active: index <= dealScorePercent}" v-for="(item,index) in 5" :key="index">
								<Cicon iconClass="icon-star"></Cicon>
							</span>
							{{dealScore}}
						</div>
						<span>{{goodsInfo.soldAmount || 0}}人购买 {{goodsInfo.reviewAmount || 0}}人评价</span>
					</div>
				</div>
			</div>

			<!-- 相关推荐 -->
			<GoodsChange class="goods-recom" title="相关推荐" :list="recomList"></GoodsChange>

			<!-- 评论部分 -->
			<section class="goods-detail-wrap inner">
				<!-- 看了又看 -->
				<div class="goods-more">
					<Relook :model="recomList.slice(0,5)"></Relook>
				</div>

				<!-- 商品详情 评论 -->
				<div class="goods-detail-main--bottom">
					<div class="goods-tab top">
						<div class="goods-tab-wrap">
							<span :class="{active:goodsToggleType === 'detail'}" @click="toggleTab('detail')">商品详情</span>
							<span :class="{active:goodsToggleType === 'comment'}" @click="toggleTab('comment')">{{`评价（${goodsInfo.reviewAmount || 0}人）`}}</span>
						</div>
						<div class="add-shop" @click="addCartHandle(goodsInfo.productId)">加入购物车</div>
					</div>

					<div class="goods-info">
						<div class="info-title">产品信息</div>

						<template v-for="(item,index) in propertyList">
							<div class="table-wrap" v-if="index && index % 2" :key="index">
								<div class="table-row">
									<span class="title">{{propertyList[index -1].name}}</span>
									<span class="val">{{propertyList[index -1].value}}</span>
								</div>

								<div class="table-row">
									<span class="title">{{item.name}}</span>
									<span class="val">{{item.value}}</span>
								</div>
							</div>
						</template>
					</div>

					<div class="goods-video" v-if="false">
						<video class="goods-video-inner" controls preload src="//cloud.video.taobao.com/play/u/534d636b315a526462384c742f754b33575275684a513d3d/p/1/d/ld/e/6/t/1/272509085558.mp4"></video>
						<!-- 视频交互 待写 -->
					</div>

					<div class="commend-detail-wrap" v-for="(item,index) in introduction" :key="index">
						<img :src="item" alt="">
					</div>

					<!--评论 -->
					<div>
						<div class="comment-intro">
							<div class="comment-intro-star">
								<Cicon :class="{active:index <= dealScorePercent}" iconClass="icon-star" v-for="(item,index) in 5" :key="index"></Cicon>
								<span class="scale">{{dealScore}}</span> 好评
							</div>
							<div v-if="false" class="published-comment" @click="publishedComment">发表评论</div>
						</div>
						<CommentList class="comment-model"></CommentList>
					</div>
				</div>
			</section>
			<!-- 最近浏览 -->
			<GoodsCarousel v-if="recentList.length" class="recent-browse" title="最近浏览" :list="recentList"></GoodsCarousel>
		</template>

		<NoData v-else>该商品尚不存在，请稍后再试</NoData>

		<SideFooter class="side-footer-detail"></SideFooter>
		<Information></Information>
	</div>
</template>

<script>
import VuePiczoom from 'vue-piczoom';
import Relook from './Relook';
import CommentList from './CommentList';
import { throttle, storages } from '@/utils';

export default {
	name: '',
	components: { VuePiczoom, Relook, CommentList },
	data() {
		return {
			goodsPreviewList: [],
			recomList: [],
			currrntGoosdsPreviewIndex: 0,
			currrntGoosdsPreviewListPosition: 0,
			distpickerValue: [],
			distpickerDisplay: false,
			chooseColorSure: 0,
			goodsPickList: [],
			chooosePickSure: 0,
			buySum: 1,
			startSum: 3,
			goodsInfo: {},
			goodsToggleType: 'detail',
			introduction: [], //详情预览图
			chooseTypeColle: {},
			chooseTypeColleChild: [],
			chooseTypeCurrent: 0,
			propertyList: [],
			specifChecked: 0,
			specifChildChecked: '',
			favoriteControlTimer: null,
			recentList: [],
			isHave: false,
			unstablePrice: 9999999,
			currentGoods: {},
		};
	},
	watch: {
		'$route.params.id': {
			handler(v) {
				const { token } = this.$store.state.userinfo;
				this.getGoodsInfo();
				token && this.getRecentList(); //最近浏览
			},
			immediate: true,
		},
	},
	computed: {
		// 评分比
		dealScore() {
			const scale = this.goodsInfo.likesNums / this.goodsInfo.reviewAmount;
			const score = (scale && parseInt(scale * 100)) || 100;
			return score + '%';
		},
		// 评分星
		dealScorePercent() {
			const scale = this.goodsInfo.likesNums / this.goodsInfo.reviewAmount;
			const num = parseInt(scale * 100) % 5;

			return num || 4;
		},
		mapBreadRoutes() {
			return this.$store.state.breadRoutes
				.filter((e) => e.name !== 'detail')
				.slice(-2);
		},
	},
	mounted() {
		// const detail = document.querySelector('.goods-detail-wrap');
		const comment = document.querySelector('.comment-wrap');
		if (!comment) return;
		const el = document.documentElement || document.body;
		const scrollHandle = throttle(() => {
			const scrollTop = el.scrollTop;
			const commentScroll = comment.offsetTop;
			const isType = scrollTop >= commentScroll - 110 ? 'comment' : 'detail';
			this.goodsToggleType = isType;
		});

		document.addEventListener('scroll', scrollHandle);

		this.$once('hook:beforeDestroy', () => {
			document.removeEventListener('scroll', scrollHandle);
		});
	},
	methods: {
		getGoodsInfo() {
			const { id } = this.$route.params;
			// 1155693897771384800
			this.loadeing(true);
			this.$axios
				.productGetItem(id)
				.then(({ data }) => {
					const {
						previewImages = [],
						introduction = [],
						itemCategories = {},
					} = data;
					this.goodsPreviewList = previewImages;
					this.introduction = introduction;
					this.goodsInfo = data;
					this.chooseTypeColle = itemCategories;
					this.chooseTypeColleChild = itemCategories.children[0].children;
					this.propertyList = data.propertyList || [];
					this.unstablePrice = data.priceCurrent;
					this.isHave = true;
					this.getRecommendList();
				})
				.catch(() => {
					this.isHave = false;
				});
		},
		getRecommendList() {
			//专属推荐
			this.$axios.homeRecom().then(({ data: { list = [] } }) => {
				this.recomList = Object.freeze(list);
			});
		},
		toggleAddress() {
			this.distpickerDisplay = !this.distpickerDisplay;
		},
		previewBigImage(index) {
			if (this.currrntGoosdsPreviewIndex === index) return;
			console.log(index);
			this.currrntGoosdsPreviewIndex = index;
		},
		slideToggle(dire) {
			const len = this.goodsPreviewList.length;
			const differ = 4 - len;

			if (dire === 'left') {
				if (this.currrntGoosdsPreviewListPosition >= 0) return;
				this.currrntGoosdsPreviewListPosition++;
			} else {
				if (this.currrntGoosdsPreviewListPosition <= differ) return;
				this.currrntGoosdsPreviewListPosition--;
			}
		},
		chooseTypeChange(i) {
			this.chooseType = i;
		},
		chooseColorSureChange(i) {
			this.chooseColorSure = i;
		},
		choosePickChange(i) {
			this.chooosePickSure = i;
		},

		buySumChange(type) {
			if (type === '+') {
				const { stockAmount, soldAmount } = this.currentGoods;

				const sum = stockAmount - soldAmount;
				console.log(sum, 'sum');

				if (this.buySum >= (sum || 100)) {
					this.$layer.msg('不能添加更多了哦！');
					return;
				}
				this.buySum++;
			} else {
				this.buySum > 1 && this.buySum--;
			}
		},
		// 添加购物车
		addCartHandle() {
			const { token = '', sessionId = '' } = this.$store.state.userinfo;
			if (!token || !sessionId) {
				this.$store.commit('updateLoginToast', true);
				return;
			}

			const goods = this.chooseTypeColle.children;
			const pi = this.specifChecked;
			const ci = this.specifChildChecked;

			if (ci === '') {
				this.$layer.msg(`请选择商品${this.chooseTypeColle.childrenLabel}`);
				return;
			}

			const item = goods[pi].children[ci];

			if (!item.itemId) {
				this.$layer.msg('商品异常，请稍后再试');
				return;
			}

			this.$store.dispatch('addGoodsToCart', {
				itemId: item.itemId,
				num: this.buySum,
			});
		},
		toggleTab(type) {
			const detail = document.querySelector('.goods-detail-wrap');
			const comment = document.querySelector('.comment-wrap');
			const detailScroll = detail.offsetTop;
			const commentScroll = comment.offsetTop;

			this.goodsToggleType = type;

			if (detailScroll && commentScroll) {
				type == 'detail'
					? window.scroll(0, detailScroll)
					: window.scroll(0, commentScroll - 60);
			} else {
				type == 'detail' ? detail.scrollIntoView() : comment.scrollIntoView();
			}
		},
		specifChange(v) {
			this.specifChecked = v;
			this.specifChildChecked = '';
			this.chooseTypeColleChild = this.chooseTypeColle.children[v].children;
		},
		specifChildChange(v, item) {
			this.buySum = 1;

			if (item.itemId && !item.soldOut) {
				this.$axios.itemGetInfo(item.itemId).then(({ data = {} }) => {
					this.unstablePrice = data.price || 9999999;
					this.currentGoods = data;
				});
			} else {
				this.$layer.msg('抱歉，当前商品已售完！');
				return;
			}

			this.specifChildChecked = v;
		},
		favoriteClick(v) {
			console.log(v);
			const { token, sessionId } = this.$store.state.userinfo;
			const isHave = token && sessionId;
			if (isHave) {
				const params = { productId: this.goodsInfo.productId };

				this.$axios
					.favProduct(params)
					.then(({ data = {} }) => {
						this.favoriteControlCancel(data.isFav ? '收藏成功' : '已取消收藏');
						this.goodsInfo.isFav = data.isFav;
					})
					.catch(() => {
						// this.favoriteControlCancel('收藏失败');
					});
			} else {
				this.$store.commit('updateLoginToast', true);
			}
		},
		favoriteControlCancel(text = '收藏成功') {
			const tip = document.querySelector('.favorite-tips');
			const el = document.createElement('div');
			const wrap = document.querySelector('.buy-operation-coll');
			el.className = 'favorite-tips';
			el.innerHTML = text;
			tip && wrap.removeChild(tip);
			wrap.appendChild(el);
		},
		// 立即购买
		buyNowClick() {
			const { token, sessionId } = this.$store.state.userinfo;
			if (token && sessionId) {
				const goods = this.chooseTypeColle.children;
				const pi = this.specifChecked;
				const ci = this.specifChildChecked;

				if (ci === '') {
					this.$layer.msg(`请选择商品${this.chooseTypeColle.childrenLabel}`);
					return;
				}

				const item = goods[pi].children[ci];
				const itemCo = { itemId: item.itemId, num: this.buySum };

				// 生成预览订单
				this.$axios
					.orderPreview([itemCo])
					.then(({ data = {} }) => {
						console.log(data.cacheId);
						storages.set('ls__settleColle_cache', data.cacheId);
						this.$router.push('/submit');
					})
					.catch(() => {
						this.$layer.msg('出错了，请稍后再试');
					});
			} else {
				this.$store.commit('updateLoginToast', true);
			}
		},
		// 最近浏览
		getRecentList() {
			const params = { size: 10, page: 1 };
			this.$axios.getBrowseList(params).then(({ data: { list } }) => {
				// console.log(list);
				this.recentList = list;
			});
		},
	},
};
</script>

<style lang='scss' scoped>
@import './index.scss';
</style>

<style>
.favorite-tips {
	position: absolute;
	left: 21px;
	top: 40%;
	z-index: 1000;
	white-space: nowrap;
	top: -17px;
	opacity: 0;
	animation: move 0.7s linear;
	animation-fill-mode: forwards;
}

@keyframes move {
	0% {
		opacity: 0;
		top: 17px;
	}

	47% {
		opacity: 1;
		top: 0;
	}

	100% {
		opacity: 0;
		top: -19px;
	}
}
</style>
