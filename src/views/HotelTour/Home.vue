 <template>
	<!-- 酒店模块 -->
	<div class='hotel-result-wrap'>
		<div class="choose-type-list inner">
			<ChooseType v-for="(item,index) in chooseTypeList" :key="index" :model="item"></ChooseType>
		</div>

		<!-- 商品展示 -->
		<div class="hotel-goods-list inner">
			<Product class="hotel-class-item" v-for="(item,index) in goodsList" :key="index" :model="item"></Product>
		</div>
	</div>
</template>

<script>
import ChooseType from '../components/ChooseType';

export default {
	name: 'Result',
	components: { ChooseType },
	data() {
		return {
			chooseTypeList: [
				{
					title: '城市',
					list: new Array(40).fill('阿迪达斯'),
				},
				{
					title: '星级',
					list: new Array(40).fill('中国'),
				},
			],
			priceMin: '',
			priceMax: '',
			shopAddress: ['北京', '广州市', '武汉市'],
			shopDisplay: false,
			currentPag: 1,
			allPag: 5,
			goodsList: [],
		};
	},
	created() {
		this.getGoodsList();
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
		},
		getGoodsList() {
			const HotelTourType = this.$route.path.slice(1);
			console.log(HotelTourType);
			//酒店数据
			const hotellist = [
				{
					name: '空中花园东大门金斯敦酒店(Hotel Skypark Kingstown Dongdaemun)',
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
					name: '首尔清凉里设计者酒店(Hotel The Designers Cheongnyangni Seoul)',
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
			];

			const tourList = [
				{
					name: '深圳2日半自助游·【茶溪谷大峡谷双园畅玩】东部华侨城主题乐园',
					img: 'https://api.laisigou.com/img/travel-1.jpg',
					price: '312',
				},
				{
					name:
						'深圳2-4日自由行·深圳东部华侨城黑森林酒店1-3晚+可选2日无限次大峡谷/无限次茶溪谷/温泉套票房型|黑森林主题亲子度假|【周边游】',
					img: 'https://api.laisigou.com/img/travel-2.jpg',
					price: '468',
				},
				{
					name: '深圳2日半自助游·【茶溪谷大峡谷双园畅玩】东部华侨城主题乐园',
					img: 'https://api.laisigou.com/img/travel-3.jpg',
					price: '780',
				},
				{
					name: '深圳2-4日自由行·深圳东部华侨城茵特拉根酒店',
					img: 'https://api.laisigou.com/img/travel-4.jpg',
					price: '960',
				},
				{
					name: '深圳较场尾2日1晚跟团游·海滨直通车往返车接送，2人起订',
					img: 'https://api.laisigou.com/img/travel-5.jpg',
					price: '400',
				},
				{
					name:
						'深圳西冲2日1晚跟团游·金沙湾沙滩+大鹏古城+杨梅坑+较场尾+BBQ自助烧烤（2人起订）',
					img: 'https://api.laisigou.com/img/travel-6.jpg',
					price: '465',
				},
			];

			this.goodsList = HotelTourType === 'hotel' ? hotellist : tourList;
		},
	},
};
</script>

<style lang='scss' scoped>
.choose-type-list {
	border-bottom: 1px solid var(--c-color);
	margin-top: 20px;
}

.hotel-goods-list {
	padding: 17px 0 3px 17px;
	background-color: var(--f-color);
	box-sizing: border-box;
	margin: 20px auto 100px;
	.hotel-class-item {
		margin: 0 18px 6px 0;
	}
}
</style>