 <template>
	<!-- 搜索商品列表 -->
	<div class='search-result-wrap'>
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
		<SideNav defaultStatus></SideNav>

		<div class="result-pagination inner" v-if="0">美容彩妆>护肤 共<i>200</i>个商品</div>

		<!-- 品牌 -->
		<div class="brand-header-wrap inner" v-if="0">
			<div class="brand-header-img">
				<img src="https://kaola-haitao.oss.kaolacdn.com/ie9wevvj80.jpg" alt="">
			</div>

			<div class="brand-header-des">
				<h5>ESTĒE LAUDER 雅诗兰黛</h5>

				<p class="brand-intro">
					雅诗兰黛(ESTĒE LAUDER)， 知名护肤、化妆品和香水公司，与其创始人同名。美国高端护肤品牌，以延缓衰老修护护肤品闻名。1946年雅诗兰黛公司成立于美国纽约，拥有护肤品品牌Clinique（倩碧）、La Mer（海蓝之谜）、LAB SERIES（朗仕）、Prescriptives、Origins（悦木之源），以及化妆品品牌Bobbi Brown、M·A·C，和男性香水品牌Aramis等等。
				</p>
			</div>
		</div>

		<div class="choose-type-list inner" v-if="0">
			<ChooseType v-for="(item,index) in chooseTypeList" :key="index" :model="item"></ChooseType>
		</div>

		<!-- 综合分类 -->
		<div class="choose-type-tab inner">
			<div class="before">
				<!-- 0：综合 1：销量 2：价格降序 3：价格升序 4：最新 -->
				<div class="def-item" :class="{active:chooseTypeKey ==='0'}" @click="chooseTypeKeyChange('0')">综合</div>
				<div class="def-item" :class="{active:chooseTypeKey ==='1'}" @click="chooseTypeKeyChange('1')">销量</div>
				<div class="def-item" :class="{active:chooseTypeKey ==='4'}" @click="chooseTypeKeyChange('4')">新品</div>
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

			<div class="after" v-show="allPag">
				<span class="page-display"><i>{{currentPag}}</i>/{{mapTotal}} </span>
				<span class="btn" @click="pagingToggle('left')"><i class="el-icon-arrow-left"></i></span>
				<span class="btn" @click="pagingToggle('right')"><i class="el-icon-arrow-right"></i></span>
			</div>
		</div>

		<!-- 商品展示 -->
		<GoodsColle :model="goodsList"></GoodsColle>

		<NoData v-if="!goodsList.length"></NoData>

		<!-- 酒店旅游产品 -->
		<ProductColle :model="hotelColle" v-if="0"></ProductColle>

		<SideFooter class="site-footer-result"></SideFooter>
		<Information></Information>
	</div>
</template>

<script>
import ChooseType from '../components/ChooseType';
import GoodsColle from '../components/GoodsColle';
import ProductColle from '../components/ProductColle';

export default {
	name: 'Result',
	components: { ChooseType, GoodsColle, ProductColle },
	data() {
		return {
			chooseTypeList: [
				{
					title: '品牌',
					list: new Array(40).fill('阿迪达斯'),
				},
				{
					title: '国家/地区',
					list: new Array(40).fill('中国'),
				},
				{
					title: '分类',
					list: new Array(40).fill('洁面乳'),
				},
			],
			chooseTypeKey: '0',
			priceMin: '',
			priceMax: '',
			shopAddress: [],
			shopDisplay: false,
			currentPag: 1,
			allPag: 1,
			goodsList: [],
			hotelColle: {
				list: [
					{
						name:
							'空中花园东大门金斯敦酒店(Hotel Skypark Kingstown Dongdaemun)',
						img: 'https://api.laisigou.com/img/hotel-1.jpg',
						price: '508',
					},
					{
						name:
							'诺富特首尔龙山全套房大使酒店(Novotel Suites Ambassador Seoul Yongsan)',
						img: 'https://api.laisigou.com/img/hotel-2.jpg',
						price: '406',
					},
					{
						name:
							'首尔清凉里设计者酒店(Hotel The Designers Cheongnyangni Seoul)',
						img: 'https://api.laisigou.com/img/hotel-4.jpg',
						price: '899',
					},
					{
						name: '仁川机场世界旅馆(World Guesthouse, Incheon Airport)',
						img: 'https://api.laisigou.com/img/hotel-5.jpg',
						price: '308',
					},
					{
						name: '科莫明洞旅馆(Myeongdong Guesthouse Como)',
						img: 'https://api.laisigou.com/img/hotel-6.jpg',
						price: '603',
					},
					{
						name: '东大门格鲁酒店(Glue Hotel Dongdaemun)',
						img: 'https://api.laisigou.com/img/hotel-3.jpg',
						price: '478',
					},
				],
			},
		};
	},
	computed: {
		mapTotal() {
			return Math.ceil(this.allPag / 16);
		},
	},
	watch: {
		'$route.query.keyword'() {
			this.getProductList();
		},
	},
	created() {
		this.loadeing(true);
		this.getProductList();
	},
	methods: {
		pagingToggle(dir) {
			if (dir === 'left') {
				if (this.currentPag <= 1) return;
				this.currentPag--;
			} else {
				if (this.currentPag >= this.mapTotal) return;
				this.currentPag++;
			}
			this.getProductList();
		},
		getProductList() {
			// 类型type 0：综合 1：销量 2：价格降序 3：价格升序 4：最新
			const { keyword } = this.$route.query;
			if (!keyword) return;
			const pramas = {
				size: 16,
				page: this.currentPag,
				keyword,
				type: this.chooseTypeKey,
			};
			this.$axios.productSearchFilter(pramas).then(({ data = [] }) => {
				this.goodsList = data.list;
				this.allPag = data.total;
			});
		},
		chooseTypeKeyChange(v) {
			// 模拟
			this.chooseTypeKey = v;
			this.currentPag = 1;
			this.getProductList();
		},
	},
};
</script>

<style lang='scss' scoped>
.result-pagination {
	height: 54px;
	line-height: 54px;
	color: var(--sec-color);
	i {
		color: var(--def-backdrop);
	}
}

.brand-header-wrap {
	display: flex;
	padding: 32px;
	justify-content: space-between;
	background-color: var(--f-color);
	box-sizing: border-box;
}

.brand-header-img {
	width: 100px;
	height: 100px;
	border: 1px solid var(--e-color);
}

.brand-header-des {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding-left: 20px;

	h5 {
		font-size: 18px;
		font-weight: 500;
	}

	.brand-intro {
		line-height: 18px;
		color: var(--sec-color);
	}
}

.choose-type-list {
	border-bottom: 1px solid var(--c-color);
	margin-top: 10px;
}

.choose-type-tab {
	height: 40px;
	display: flex;
	justify-content: space-between;
	align-content: center;
	background-color: var(--f-color);
	color: var(--sec-color);
	margin-top: 10px;
	margin-bottom: 23px;

	.before {
		display: flex;
		& > div.def-item {
			display: inline-block;
			height: 100%;
			width: 100px;
			text-align: center;
			line-height: 40px;
			cursor: pointer;
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
			// background-color: var(--e-color);
			cursor: pointer;
		}
	}
}

.site-footer-result {
	margin-top: 20px;
}
</style>
