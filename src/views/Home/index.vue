<template>
	<div id="header-anchor" class="home-wrap">
		<!-- 顶部导航 -->
		<HeadBar></HeadBar>
		<!-- 搜索购物车 -->
		<header class="all-header">
			<div class="all-header-main inner">
				<Logo></Logo>
				<SearchCart @search="goToSearch"></SearchCart>
			</div>
		</header>
		<!-- 导航栏 -->
		<SideNav></SideNav>
		<!-- 轮播 -->
		<div class="carousel">
			<Carousel :list="carouselList"></Carousel>
		</div>
		<!-- 快速通道 -->
		<div class="sellpoint-wrap">
			<div class="sellpoint-main inner">
				<ul>
					<router-link tag="li" to="/">
						<Cicon class='icon-ziying1' /><span>睐思购自营</span>
					</router-link>
					<router-link tag="li" to="/">
						<Cicon class='icon-quanqiuglobal25' /><span>全球直采</span>
					</router-link>
					<router-link tag="li" to="/">
						<Cicon class='icon-baozhang' /><span>假一赔十</span>
					</router-link>
					<router-link tag="li" to="/">
						<Cicon class='icon-tubiaolunkuo-' /><span>售后无忧</span>
					</router-link>
				</ul>
				<!-- <ul class="sellpoint-main-right">
					<router-link tag="li" to="">
						<Cicon iconClass="icon-huiyuan"></Cicon><span>注册会员,领取优惠券</span>
					</router-link>
				</ul> -->
			</div>
		</div>

		<!-- 侧边滚动导航 -->
		<div class="home-scroll-bar-wrap inner">
			<div class="scroll-bar-left" v-if="false">
				<h3>新用户包邮</h3>
				<p>除部分商品外</p>
				<div class="scroll-bar-hot">热门品牌</div>

				<div class="scroll-bar-list">
					<ul>
						<li v-for="(item,index) in menuTypeList" :key="index">
							<a href="/">{{item.name}}</a>
						</li>
					</ul>
				</div>

				<div class="app-scan-wrap">
					<img src="../../assets/images/qr-code.png" alt="">
				</div>

				<h3>新用户包邮</h3>
				<p>除部分商品外</p>
			</div>

			<ScrollRightBar class="scroll-bar-right"></ScrollRightBar>
		</div>

		<template v-for="(item,index) in homepageSection">
			<GoodsCarousel v-if="item.type === 'newcomer-recommend'" :title="item.title" :list="item.content" :key="index"></GoodsCarousel>
			<Banner v-else-if="item.type === 'advertise-wide'" :model="item" :key="index"></Banner>
			<ProductColle v-else-if="item.type === 'newcomer-sss'" :key="index"></ProductColle>
			<ComZone v-else-if="item.type === 'standard-section'" :model="item" :key="index"></ComZone>
		</template>

		<!-- 专属推荐 -->
		<GoodsChange class="home-recom" title="专属推荐" :list="newZoneList"></GoodsChange>

		<SideFooter></SideFooter>
		<Information></Information>
	</div>
</template>

<script>
import ComZone from '../components/ComZone';
import Banner from '../components/banner';
import ProductColle from '../components/ProductColle';
import { storage } from '@/utils';

export default {
	name: 'Home',
	components: { ComZone, Banner, ProductColle },
	data() {
		return {
			searchRecomList: [],
			carouselList: [],
			homepageSection: [],
			newZoneList: [],
			menuTypeList: [],
		};
	},
	created() {
		this.loadeing(true);
		// 基本数据
		this.$axios.homePage().then(({ data = {} }) => {
			this.carouselList = data.banner || [];
			this.homepageSection = data.homepageSection || [];
			// const brand = data.configuration.brandList;
			// const menu = data.category;
			// menu.forEach((e, i) => (e.brand = brand[i] || [])) || [];
			// this.menuTypeList = menu;
			// storage.set('menuTypeList');
			storage.set('searchRecommend', data.configuration.searchRecommend || []);
		});

		//专属推荐
		this.$axios.homeRecom().then(({ data: { list = [] } }) => {
			this.newZoneList = Object.freeze(list);
		});
	},
	mounted() {},
	methods: {
		goToSearch(data) {
			console.log(data);
			// this.$router.push('/result');
		},
	},
};
</script>

<style lang="scss">
@import './index.scss';
</style>
