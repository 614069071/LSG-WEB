 <template>
	<!-- 收货地址 -->
	<div class='account-address-wrap'>
		<NavBar class="personal-center-left"></NavBar>

		<div class="personal-center-right">
			<div class="personal-center-right-title line">我的收货地址</div>
			<div class="account-address-add">
				<span @click="addAddressHandle"><i>+</i>新增地址</span>
			</div>

			<div class="user-address-wrap">
				<div class="user-address-caption">
					<span class="user-address-name">收货人</span>
					<span class="user-address-map">收货地址</span>
					<span class="user-address-phone">联系电话</span>
					<span class="user-address-control">操作</span>
				</div>

				<div class="user-address-list">
					<template v-if="addressList.length">
						<div class="user-address-item" v-for="(item,index) in addressList" :key="index">
							<div class="user-address-name">{{item.username}}</div>
							<div class="user-address-map">{{item | dealProvinces}}{{item.address}}</div>
							<div class="user-address-phone">{{item.phone}}</div>
							<div class="user-address-control">
								<div class="control">
									<span class="btn editor" @click="editorAddress(item)">编辑</span>
									<i></i>
									<span class="btn delete" @click="removeAddress(item)">删除</span>
								</div>
								<span class="setting-btn" v-if="item.isDefault === '0'" @click="defaultAddress(item)">设为默认地址</span>
								<span class="default-address" v-if="item.isDefault === '1'">默认地址</span>
							</div>
						</div>
					</template>

					<NoData v-else>
						<p class="no-address-wrap">您还没有收货地址哦，赶紧 <span @click="addAddressHandle">添加一个吧!</span></p>
					</NoData>
				</div>
			</div>
		</div>

		<!-- 删除地址 -->
		<Toast class="common-dialog-wrap remove-address-dialog" title="删除收货地址" :visible.sync="removeVisible" @success="removeAddressSubmit">
			<div class="remove-address-title">确定要删除该地址吗？</div>
		</Toast>

		<!-- 新增or修改 -->
		<Toast :visible.sync="dialogVisible" :title="isAddAddrss ? '新增收货地址' : '修改收货地址'" class="common-dialog-wrap" @success="addAddressSubmit" @cancel="addAddressCancel">
			<div class="common-main">
				<p class="site-parag"><span>收件人</span><input type="text" ref="username" v-model.trim="addressInfo.username" placeholder="请填写收件人姓名，务必填写真实姓名"></p>
				<!-- <div class="site-tips">请填写收件人姓名</div> -->
				<p class="site-parag"><span>联系电话</span><input type="text" ref="phone" v-model.trim="addressInfo.phone" placeholder="请填写收件人联系电话"></p>
				<p class="site-parag">
					<span>所在地区</span>
					<Distpicker class="address-choose" ref="addressPro" :address.sync="mapAddressPro" :display.sync="addressProDisplay"></Distpicker>
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
import NavBar from '../components/NavBar';

export default {
	name: 'account-address',
	components: { NavBar },
	data() {
		return {
			dialogVisible: false,
			settingDefault: false,
			addressList: [],
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
			addressProDisplay: false,
			mapAddressPro: [],
			removeVisible: false,
			checkedItem: {},
			isAddAddrss: false,
		};
	},
	computed: {},
	watch: {
		mapAddressPro() {
			this.addressInfo.province = this.mapAddressPro[0];
			this.addressInfo.city = this.mapAddressPro[1];
			this.addressInfo.area = this.mapAddressPro[2];
			// this.addressInfo.addressPro = this.mapAddressPro.join('');
		},
	},
	created() {
		this.getAddressList();
	},
	methods: {
		addAddressHandle() {
			this.dialogVisible = true;
			this.isAddAddrss = true;
		},
		getAddressList() {
			this.loadeing(true);
			this.$axios.addressList().then(({ data = [] }) => {
				let arr = data;
				arr.some((e, i) => {
					if (e.isDefault === '1') {
						let temp = data[0];
						data[0] = e;
						data[i] = temp;
					}
					return e.isDefault === '1';
				});

				this.addressList = arr;
			});
		},
		removeAddress(item) {
			this.removeVisible = true;
			this.checkedItem = item;
		},
		removeAddressSubmit() {
			const id = this.checkedItem.id;
			this.$axios.addressDelete(id).then((res) => {
				console.log(res, 'remove');
				this.getAddressList();
			});
			this.removeVisible = false;
		},
		editorAddress(item) {
			// console.log(item);
			this.checkedItem = item;
			this.addressInfo = {
				username: item.username,
				phone: item.phone,
				address: item.address,
				isDefault: item.isDefault,
				province: item.province,
				city: item.city,
				area: item.area,
				// addressPro: item.addressPro,
			};

			this.mapAddressPro = [
				this.addressInfo.province,
				this.addressInfo.city,
				this.addressInfo.area,
			];
			this.dialogVisible = true;
			this.isAddAddrss = false;
		},
		addAddressCancel() {
			this.addressInfo = {};
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
			if (this.isAddAddrss) {
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
			} else {
				const data = this.addressInfo;
				data.id = this.checkedItem.id;
				console.log(data);
				this.$axios.addressModify(data).then(() => {
					this.dialogVisible = false;
					this.$layer.msg('修改成功');
					this.getAddressList();
				});
			}
		},
		defaultAddress(item) {
			console.log(item);
			this.$axios.addressSetDefault(item.id).then(() => {
				this.getAddressList();
			});
		},
	},
};
</script>

<style lang='scss' scoped>
.account-address-wrap {
	display: flex;
	justify-content: space-between;
}

.account-address-add {
	padding: 20px 24px 20px 0;
	display: flex;
	justify-content: flex-end;
	span {
		display: flex;
		height: 32px;
		width: 106px;
		background-color: var(--def-backdrop);
		color: var(--f-color);
		border-radius: 4px;
		justify-content: center;
		align-items: center;
		cursor: pointer;

		i {
			font-size: 22px;
			display: inline-block;
			height: 32px;
			line-height: 30px;
		}
	}
}

.user-address-wrap {
	border: 1px solid var(--e9-color);
}

.user-address-caption {
	height: 46px;
	line-height: 46px;
	display: flex;
	background-color: #f6f6f6;
}

.user-address-name {
	width: 102px;
	padding-left: 24px;
}

.user-address-map {
	width: 390px;
	padding-right: 21px;
	display: flex;
	align-items: center;
	line-height: 24px;
}

.user-address-phone {
	width: 145px;
}

.user-address-control {
	flex: 1;
	display: flex;
	justify-content: space-between;
	padding-right: 24px;
	.control {
		display: flex;
		align-items: center;
		.btn {
			color: #1890ff;
		}

		i {
			width: 1px;
			height: 14px;
			background-color: var(--e9-color);
			margin: 0 8px;
			display: inline-block;
		}
	}
	.setting-btn:hover {
		color: var(--def-backdrop);
		cursor: pointer;
	}

	.default-address {
		height: 30px;
		line-height: 30px;
		width: 80px;
		text-align: center;
		border-radius: 4px;
		color: var(--def-backdrop);
		border: 1px solid var(--def-backdrop);
	}
}

.user-address-item {
	display: flex;
	height: 60px;
	align-items: center;
	border-top: 1px solid var(--e9-color);
	color: var(--sec-color);
}

.address-choose {
	width: 330px;
	border: 1px solid var(--e-color);
	border-radius: 4px;
	height: 34px;
	/deep/.distpicker-wrap {
		top: 34px !important;
	}
}

.remove-address-dialog {
	.remove-address-title {
		width: 400px;
		text-align: center;
		padding: 10px 0;
	}
}

.no-address-wrap {
	span {
		color: var(--def-backdrop);
		cursor: pointer;
	}
}
</style>