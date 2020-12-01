 <template>
	<div class='hotelTour-detail-page-wrap'>
		<div class="hotelTour-nav inner"><span>酒店</span>>三亚北京路希尔顿酒店 赠送早餐 一间/晚...</div>

		<!-- 预览 -->
		<div class="hotelTour-preview inner">
			<div class="preview-am">
				<img :src="previewPath" alt="">
			</div>
			<div class="preview-list">
				<div class="preview-small-item" :class="{active:checkedItem === index}" v-for="(item,index) in previewList" :key="index" @click="checkPreviewItem(item,index)">
					<img :src="item" alt="">
				</div>
			</div>
		</div>

		<!-- 选择 -->
		<div class="hotelTour-choose inner">
			<div class="hotelTour-choose-left">
				<h5>三亚北京路希尔顿酒店 赠送早餐 一间/晚</h5>
				<p class="vice-title">竞品时尚酒店 享受轻松假期</p>
				<p class="hotelTour-intro">
					<span>
						<Cicon iconClass="icon-dingwei1"></Cicon>海南省三亚市上水区北京录1009号
					</span>
					<span>
						<Cicon iconClass="icon-dianhua"></Cicon>0755-88887777
					</span>
				</p>
				<div class="hotelTour-type">
					<div class="type-title">房型</div>
					<div class="type-list">
						<span :class="{active:hotelTourType === index}" v-for="(item,index) in 3" :key="index" @click="hotelTourType = index">商务房一间/晚</span>
					</div>
				</div>

				<div class="hotelTour-equip">
					<div class="equip-title">酒店设施</div>
					<div class="type-cond-list">
						<span>
							<Cicon iconClass="icon-Wi-Fi"></Cicon>WiFi服务
						</span>
						<span>
							<Cicon iconClass="icon-dianti1"></Cicon>电梯
						</span>
						<span>
							<Cicon iconClass="icon-tingche1"></Cicon>停车
						</span>
						<span>
							<Cicon iconClass="icon-hangli"></Cicon>行李寄存
						</span>
						<span>
							<Cicon iconClass="icon-20xiaoshifuwurexian"></Cicon>24小时服务
						</span>
						<span>
							<Cicon iconClass="icon-chuifengtong"></Cicon>吹风机
						</span>
						<span>
							<Cicon iconClass="icon-canting1"></Cicon>餐厅
						</span>
					</div>
				</div>
			</div>

			<div class="hotelTour-choose-right">
				<h5>入住预定</h5>
				<div class="price-main">
					<span class="price-before"><i>￥</i>788<i> /晚</i></span>
					<span class="price-after">原价：￥800</span>
				</div>
				<div class="choose-time">
					<span class="choose-time-icon">
						<Cicon iconClass="icon-calendar_icon"></Cicon>{{chooseAccomTime}}
					</span>
					<!-- 请选择入住离店时间 -->
					<el-date-picker class="choose-date-picker-time" prefix-icon="el-icon-date" v-model="accomTime" type="daterange" range-separator="" start-placeholder="" value-format="yyyy-MM-dd" />
				</div>
				<div class="reservations-now-btn" @click="reserNowBtn">立即预定</div>
				<div class="direct-purchase-btn" @click="dialogVisible = true">直接购买</div>
			</div>
		</div>

		<!-- 地图 -->
		<div class="hotelTour-map-wrap inner">
			<div class="map-title">酒店位置</div>
			<!-- 地图 -->
			<div class="map-main">
				<div class="map-content">
					<baidu-map class="baidu-map" ak='O3EoPurHdC7eUhGTpEzRm9MwnRtpGHEI' :center="mapCurrentPosition" :zoom="zoom" @ready="mapReadyhandler" :scroll-wheel-zoom="false">
						<!-- 定位 -->
						<bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
						<!-- 标记点 -->
						<bm-marker :position="mapCurrentPosition"></bm-marker>
					</baidu-map>
				</div>

				<!-- 周边 -->
				<div v-if="false" class="map-other">
					<div class="map-other-type">
						<span class="active traffic">
							<Cicon iconClass="icon-jiaotong"></Cicon>交通
						</span>
						<span class="attra">
							<Cicon iconClass="icon-scenery"></Cicon>景点
						</span>
						<span class="foot">
							<Cicon iconClass="icon-canting"></Cicon>餐饮
						</span>
					</div>

					<div class="map-line-item">
						<div class="line-item" v-for="(item,index) in 5" :key="index">
							<p class="position"><span>{{index+1}}</span>广州白云国际机场</p>
							<p class="distance">距离26.3km</p>
						</div>
					</div>

					<div class="map-line-item">
						<div class="line-item" v-for="(item,index) in 5" :key="index">
							<p class="position"><span>{{index+1}}</span>广州白云国际机场</p>
							<p class="distance">距离26.3km</p>
						</div>
					</div>

					<div class="map-line-item">
						<div class="line-item" v-for="(item,index) in 5" :key="index">
							<p class="position"><span>{{index+1}}</span>广州白云国际机场</p>
							<p class="distance">距离26.3km</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 酒店详情和评论 -->
		<div class="hotelTour-com-detail-wrap inner">
			<div class="hotelTour-tab-toggle">
				<span :class="{active:isTabDetal}" @click="toggleTab(true)">酒店详情</span>
				<span :class="{active:!isTabDetal}" @click="toggleTab(false)">评价（0）</span>
			</div>
			<!-- 详情 -->
			<div v-show="isTabDetal" class="hotelTour-detai-img-list">
				<div class="hotelTour-img-item" v-for="(item,index) in 1" :key="index">
					<img src="@/assets/images/detail.jpg" alt="">
				</div>
			</div>

			<!-- 评论 -->
			<div v-show="!isTabDetal" class="hotelTour-detai-com-list">
				<Comment v-for="(item,index) in commentImagesList" :key="index" :data="item" />
				<div class="pagination-wrap" v-if="commentImagesList.length">
					<el-pagination background layout="prev, pager, next" :total="100" prev-text="上一页" next-text="下一页" :current-page.sync="currentPage" @current-change="currentClick" />
				</div>
			</div>

		</div>

		<Toast class="directly-buy-dialog" title="选择购买份数" :visible.sync="dialogVisible" @success="orderSubmit" @cancel="orderCancel">
			<div class="directly-buy-wrap">
				<div class="directly-buy-sum">
					<span @click="chooseBuySum('left')">-</span>
					<span class="buy-sum">{{buySum}}</span>
					<span @click="chooseBuySum('right')">+</span>
				</div>
				<p>
					注意：本商品仅接受30天内入住预定（截止至2020年10月1日），请确认好您的入住日期并提前与酒店联系预定。
				</p>
			</div>
		</Toast>
	</div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map'; // 局部注册
import BmGeolocation from 'vue-baidu-map/components/controls/Geolocation.vue'; //定位
import BmMarker from 'vue-baidu-map/components/overlays/Marker.vue'; //标记点
import Comment from '@/views/components/Comment';

export default {
	name: 'HotelTourDetail',
	components: { BaiduMap, BmGeolocation, BmMarker, Comment },
	data() {
		return {
			previewPath: require('@/assets/images/hotel3.jpg'),
			previewList: [
				require('@/assets/images/hotel3.jpg'),
				require('@/assets/images/hotel2.jpg'),
				require('@/assets/images/hotel4.jpg'),
				require('@/assets/images/hotel3.jpg'),
				require('@/assets/images/hotel2.jpg'),
				require('@/assets/images/hotel4.jpg'),
			],
			hotelTourType: 0,
			// 地图相关
			baiduBMap: null,
			baiduSMap: null,
			mapCurrentPosition: { lng: 114.02597366, lat: 22.54605355 }, //经纬度
			zoom: 15, //地图展示级别
			isTabDetal: true,
			commentImagesList: [],
			accomTime: [],
			dialogVisible: false,
			buySum: 1,
			currentPage: 1,
			checkedItem: 0,
		};
	},
	computed: {
		chooseAccomTime() {
			console.log(this.accomTime);
			if (this.accomTime.length) {
				const arr = this.accomTime.map((e) => {
					const formatArr = e.split('-');
					const formatStr = `${formatArr[1]}月${formatArr[2]}日`;
					return formatStr;
				});

				return arr.join('入住,') + '退房';
			}
			return '请选择入住离店时间';
		},
	},
	created() {},
	methods: {
		mapReadyhandler({ BMap, map }) {
			const that = this;
			that.baiduBMap = BMap;
			that.baiduSMap = map;

			var geolocation = new BMap.Geolocation();
			geolocation.getCurrentPosition(function (res) {
				// eslint-disable-next-line
				if (this.getStatus() == BMAP_STATUS_SUCCESS) {
					that.mapCurrentPosition.lng = res.longitude;
					that.mapCurrentPosition.lat = res.latitude;

					// 获取周边
					// that.getMapSurr(BMap, map, res);
				} else {
					console.log('failed' + this.getStatus());
				}
			});
		},
		// 获取周边
		getMapSurr(BMap, map, res) {
			map.centerAndZoom(new BMap.Point(res.longitude, res.latitude), 3);
			var local = new BMap.LocalSearch(map, {
				renderOptions: {
					// map: map,
					// panel: 'results',
				},
				onSearchComplete(results) {
					const arr = results.Hr.map((e) => ({
						title: e.title,
						address: e.address,
					}));
					console.log(results.Hr, arr);
				},
			});
			local.search('景点');
		},
		toggleTab(v) {
			this.isTabDetal = v;
		},
		reserNowBtn() {
			console.log('立即预定');
			this.$router.push('/tour/reser');
		},
		chooseBuySum(dir) {
			if (dir === 'left') {
				this.buySum > 1 && this.buySum--;
			} else {
				this.buySum++;
			}
		},
		currentClick(v) {
			console.log(v);
		},
		checkPreviewItem(item, index) {
			this.previewPath = item;
			this.checkedItem = index;
		},
		orderSubmit() {
			this.dialogVisible = false;
		},
		orderCancel() {
			this.dialogVisible = false;
		},
	},
};
</script>

<style lang='scss' scoped>
@import './index.scss';

.baidu-map {
	width: 100%;
	height: 100%;
}
</style>