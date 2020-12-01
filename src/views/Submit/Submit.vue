 <template>
	<!-- 提交订单 -->
	<div class='submit-order-wrap'>
		<div class="submit-order-main inner">
			<div class="submit-order-title">收货地址</div>

			<div class="address-choose">
				<div class="address-list">
					<div :class="{active:chooseAddressIndex === index}" class="address-item btn" v-for="(item,index) in addressList" :key="index" @click="chooseAddress(index)">
						<div class="title"><span>{{item.username}} 收</span><span v-if="item.isDefault === '1'" class="def-address">默认地址</span></div>
						<p>{{item | dealProvinces}}</p>
						<p>{{item.address}}</p>
						<p>{{item.phone}}</p>
					</div>
				</div>
				<div class="add-address btn" @click="addAddressHandle">+ 新增收货地址</div>
			</div>

			<div class="submit-order-title">确认商品信息</div>
			<div class="order-detail-caption">
				<span class="def-address">默认地址</span>
				<!-- <span class="weight">重量（千克）</span> -->
				<span class="price">单价（元）</span>
				<span class="sum">数量</span>
				<span class="amount">金额（元）</span>
			</div>

			<div class="order-detail-title">自营保税区仓库</div>
			<!-- <div class="order-detail-time">
				<i class="el-icon-time"></i> 预计送达时间：2020-08-25
			</div> -->

			<div class="order-detail-info" v-for="(item,index) in lsOrderList" :key="index">
				<div class="def-address">
					<div class="img"><img :src="item.thumbUrl" alt=""></div>
					<div class="title ellipsis">{{item.name}}</div>
					<div class="color ellipsis">{{item.itemName}}</div>
				</div>
				<!-- <div class="weight">0.02</div> -->
				<div class="price">{{item.price}}</div>
				<div class="sum">{{item.num}}</div>
				<div class="amount">{{item.price * item.num}}</div>
			</div>

			<!-- <div class="volume-choose">
				商品券（0）<Select v-model="volume" :model="[{title:'近三三个月三个月个月'},{title:2222},{title:3333}]" height="20px"></Select>
			</div> -->

			<div class="result-invoice-wrap">
				<div class="invoice-wrap">
					<p class="invoice-title">发票信息：订单中所有商品均不支持开具发票</p>
					<div class="invoice-main">
						发票须知：<br />
						1.保税仓发货商品与海外仓发货商品属跨境海外商品，无法开具国内增值税发票<br />
						2.自2017年7月1日起，发票抬头选择公司(企业、有税号的非企业性单位和个体工商户)需提供纳税人识别号<br />
						3.自营国内仓商品支持开具电子普通发票，电子普通发票在确认收货后48小时内开具<br />
						4.其他自营国内仓商品，若开具纸质普通发票，发票在确认收货后3个工作日内单独寄出<br />
						5.第三方商家若无法开具电子发票， 则自动开纸质发票，商家发票以实际收到为准<br />
						6.如需增值税专用发票，请在下单时填写增值税专用发票信息，核对无误后提交，发票在确认收货后3个工作日内单独寄出<br />
						7.礼品卡支付金额不支持开发票
					</div>
					<p class="invoice-link btn">发票相关问题 ></p>
				</div>

				<div class="result-wrap">
					<p><span>商品应付总计：</span><span>￥{{settleColleInfo.totalAmount}}</span></p>
					<p><span>运费：</span><span>￥0.00</span></p>
					<p><span>税费：</span><span>￥0.00</span></p>
					<p><span>应付金额：</span><span>￥{{settleColleInfo.totalAmount}}</span></p>
					<div class="result-order-submit btn" @click="submitOrderClick">提交订单</div>
					<!-- {{addressList[chooseAddressIndex] | dealProvinces}} -->
					<p class="ellipsis">{{mapChekedAdress}}</p>
				</div>
			</div>

			<div class="order-submit-tips"><i class="el-icon-circle-check"></i>提交订单则表示您同意《睐思购》、《进口个人申报委托》和 <span>《消费者告知书》</span></div>
		</div>

		<!-- 新增 -->
		<Toast class="common-dialog-wrap" title="新增收货地址" :visible.sync="dialogVisible" @success="addAddressSubmit" @cancel="addAddressCancel">
			<div class="common-main">
				<p class="site-parag"><span>收件人</span><input type="text" ref="username" v-model.trim="addressInfo.username" placeholder="请填写收件人姓名，务必填写真实姓名"></p>
				<!-- <div class="site-tips">请填写收件人姓名</div> -->
				<p class="site-parag"><span>联系电话</span><input type="text" ref="phone" v-model.trim="addressInfo.phone" placeholder="请填写收件人联系电话"></p>
				<p class="site-parag">
					<span>所在地区</span>
					<Distpicker class="address-choose-add" ref="addressPro" :address.sync="mapAddressPro" :display.sync="addressProDisplay"></Distpicker>
				</p>
				<p class="site-parag"><span></span><input type="text" ref="address" v-model.trim="addressInfo.address" placeholder="请填写详细地址"></p>
				<p class="site-parag">
					<span>设为默认</span>
					<el-switch class="default-switch" active-value="1" inactive-value="0" v-model.trim="addressInfo.isDefault" active-color="#16c1bc" inactive-color="#eee" />
				</p>
			</div>
		</Toast>

	</div>
</template>

<script>
// import Select from '@/views/components/Select';
import { storages } from '@/utils';
export default {
	name: '',
	// components: { Select },
	data() {
		return {
			volume: '',
			dialogVisible: false,
			settingDefault: false,
			chooseAddressIndex: 0,
			addressList: [],
			lsOrderList: [],
			mapChekedAdress: '',
			addressInfo: {
				username: '',
				phone: '',
				address: '',
				isDefault: '0',
				addressPro: '',
				province: '',
				city: '',
				area: '',
			},
			mapAddressPro: [],
			addressProDisplay: false,
			settleColleInfo: {},
		};
	},
	beforeRouteEnter(to, from, next) {
		// 拦截 防止通过url来访问该页面
		const settleColle_catch = storages.get('ls__settleColle_cache');
		settleColle_catch ? next() : next(from);
	},
	created() {
		const settleColle_catch = storages.get('ls__settleColle_cache');
		console.log(settleColle_catch, 'settleColle_catch');
		// 获取预览订单信息
		settleColle_catch &&
			this.$axios.orderGetCache(settleColle_catch).then(({ data = {} }) => {
				console.log(data);
				this.lsOrderList = data.itemList || [];
				this.settleColleInfo = data;
			});

		this.getAddressList();
	},
	beforeDestroy() {
		console.log('submit beforeDestroy');
		storages.del('ls__settleColle_cache');
	},
	watch: {
		mapAddressPro() {
			this.addressInfo.province = this.mapAddressPro[0];
			this.addressInfo.city = this.mapAddressPro[1];
			this.addressInfo.area = this.mapAddressPro[2];
		},
	},
	methods: {
		getAddressList() {
			this.$axios.addressList().then(({ data = [] }) => {
				this.addressList = data;
				const isHave = data.some((e, index) => {
					if (e.isDefault === '1') {
						this.chooseAddressIndex = index;
						this.updateCheckedAddress();
					}
					return e.isDefault === '1';
				});

				if (!isHave) this.chooseAddressIndex = 0;
			});
		},
		chooseAddress(v) {
			this.chooseAddressIndex = v;
			this.updateCheckedAddress();
		},
		dealAddressDetail(item) {
			let province = '';
			let city = '';

			if (item.province === item.city) {
				province = item.province;
				city = item.city + '市';
			} else {
				province = item.province + '省';
				city = item.city;
			}

			const provinces = province + city + item.area;
			const address = `${item.username}收 ${provinces} ${item.address} ${item.phone}`;

			return address;
		},
		updateCheckedAddress() {
			const data = this.addressList[this.chooseAddressIndex];
			const checkedAddress = this.dealAddressDetail(data);
			const settleColle = storages.get('ls__settleColle') || {};
			settleColle.address = data;
			storages.set('ls__settleColle', settleColle);
			this.mapChekedAdress = checkedAddress;
		},
		addAddressHandle() {
			this.dialogVisible = true;
		},
		addAddressCancel() {
			this.dialogVisible = false;
			this.mapAddressPro = [];
		},
		addAddressSubmit() {
			if (!this.addressInfo.username) {
				this.$refs.username.focus();
				return;
			}

			if (!this.addressInfo.phone) {
				this.$refs.phone.focus();
				return;
			}

			if (
				this.addressInfo.province &&
				this.addressInfo.city &&
				this.addressInfo.area
			) {
				this.$refs.addressPro.$el.style.borderColor = '#eee';
			} else {
				this.$refs.addressPro.$el.style.borderColor = '#16c1bc';
				return;
			}

			if (!this.addressInfo.address) {
				this.$refs.address.focus();
				return;
			}

			console.log(this.addressInfo);

			this.loadeing();
			this.$axios.addressAdd(this.addressInfo).then((res) => {
				console.log(res, 'add');
				this.getAddressList();
				this.mapAddressPro = [];
				this.dialogVisible = false;
				this.addressInfo = {
					username: '',
					phone: '',
					address: '',
					isDefault: false,
					addressPro: '',
				};
			});
		},
		submitOrderClick() {
			const id = this.settleColleInfo.cacheId;
			console.log(id);
			if (!id) {
				this.$layer.msg('当前订单异常，请稍后再试');
				return;
			}

			if (!this.addressList.length) {
				this.$layer.msg('你还没有收货地址哦，快新建一个吧！');
				return;
			}

			const address = this.addressList[this.chooseAddressIndex];

			this.$axios
				.orderConfirm(id, { addressId: address.id })
				.then(({ data = {} }) => {
					console.log(data.orderId);
					storages.set('ls__settleColle_order', data.orderId);
					this.$store.dispatch('getGoodsToCart');
					this.$router.replace('/submit/pay');
				})
				.catch((err) => {
					this.$layer.msg(err.message || '订单提交失败');
				});
		},
	},
};
</script>

<style lang='scss' scoped>
.submit-order-wrap {
	background-color: var(--f-color);
}

.submit-order-title {
	padding: 13px 0 10px 0;
	font-size: 16px;
	font-weight: 500;
	border-bottom: 1px solid var(--c-color);
}

.address-list {
	overflow: hidden;
}

.address-item {
	width: 300px;
	height: 150px;
	border: 2px solid var(--c-color);
	margin-right: 64px;
	margin-top: 20px;
	padding: 0 10px;
	position: relative;
	float: left;

	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 36px;
		border-bottom: 1px solid var(--c-color);
		margin-bottom: 12px;

		span:first-child {
			font-size: 16px;
		}

		span.def-address {
			font-size: 12px;
			color: #9a9a9a;
		}
	}

	p {
		margin-bottom: 10px;
		font-weight: 400;
	}
}

.address-item.active {
	border-color: var(--def-backdrop);
}

.address-item.active::after {
	content: '√';
	font-size: 16px;
	width: 0;
	height: 0;
	display: block;
	position: absolute;
	border-width: 16px;
	border-style: solid;
	line-height: 16px;
	color: var(--f-color);
	border-color: transparent var(--def-backdrop) var(--def-backdrop) transparent;
	bottom: 0;
	right: 0;
}

.address-list .address-item:nth-child(3n) {
	margin-right: 0;
}

.add-address {
	border: 1px solid var(--sec-color);
	height: 30px;
	padding: 0 8px;
	line-height: 30px;
	display: inline-block;
	margin: 18px 0 34px 0;
}

.order-detail-caption {
	display: flex;
	height: 30px;
	line-height: 30px;
	color: #9a9a9a;
	font-size: 12px;
}

.order-detail-caption,
.order-detail-info {
	.def-address {
		flex: 1;
		display: flex;
		align-items: center;
	}
}

.weight,
.amount,
.price,
.sum {
	width: 135px;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
}

.order-detail-title {
	height: 30px;
	line-height: 30px;
	font-weight: 500;
	padding-left: 10px;
	background-color: var(--e-color);
}

.order-detail-time {
	height: 30px;
	line-height: 30px;
	padding-left: 10px;
	font-size: 12px;
	border: 1px solid var(--e-color);
}

.order-detail-info {
	display: flex;
	padding: 10px 0;
	border: 1px solid var(--e-color);
	border-top: 0;

	.def-address {
		display: flex;
		padding-left: 20px;
		.img {
			width: 40px;
			height: 40px;
		}

		.title {
			width: 260px;
			padding: 0 20px;
		}

		.color {
			width: 200px;
		}
	}
}

.volume-choose {
	padding: 20px;
	border: 1px solid var(--e-color);
	margin-top: 20px;
	display: flex;
	align-items: center;
	& > .select-wrap {
		width: 150px;
	}
}

.result-invoice-wrap {
	display: flex;
	padding: 25px 20px;
	justify-content: space-between;
	background-color: var(--e-color);
	margin-top: 20px;
	font-size: 12px;
}

.invoice-wrap {
	width: 650px;
}

.invoice-title {
	margin-bottom: 30px;
}

.invoice-main {
	line-height: 22px;
	color: var(--sec-color);
}

.invoice-link {
	color: var(--def-backdrop);
	margin-top: 10px;
}

.result-wrap {
	width: 400px;
	text-align: right;
	font-size: 14px;
	p {
		margin-bottom: 20px;
		span {
			display: inline-block;
			width: 100px;
			text-align: right;
		}
	}
}

.result-order-submit {
	width: 100px;
	height: 30px;
	line-height: 30px;
	text-align: center;
	color: var(--f-color);
	display: inline-block;
	margin-right: 10px;
	font-size: 14px;
	background-color: var(--def-backdrop);
	margin-bottom: 10px;
}

.order-submit-tips {
	color: var(--sec-color);
	font-size: 12px;
	text-align: right;
	padding: 10px 0 60px 0;
	i,
	span {
		color: var(--def-backdrop);
		padding-right: 5px;
	}
}

.address-choose-add {
	width: 330px;
	border: 1px solid var(--e-color);
	border-radius: 4px;
	height: 34px;
	/deep/.distpicker-wrap {
		top: 34px !important;
	}
}
</style>