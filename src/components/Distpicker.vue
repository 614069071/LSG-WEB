 <template>
	<!-- 地址选择 -->
	<div class="distpicker-wrapper" @click.stop="() => {}">
		<div class="text-content" @click="toggle">
			{{playback || '选择省/市/区'}}
			<Cicon iconClass="icon-webicon215" />
		</div>
		<div class='distpicker-wrap' v-show="display" @click.stop="() => {}">
			<div class="select-type">
				<div class="select">
					<span :class="{active:distpickerType === 'province'}" @click="distpickerTypeChange('province')">省份</span>
					<span v-show="currentProvince" :class="{active:distpickerType === 'city'}" @click="distpickerTypeChange('city')">城市</span>
					<span v-show="currentCity" :class="{active:distpickerType === 'area'}" @click="distpickerTypeChange('area')">县区</span>
				</div>

				<span class="close-distpicker" @click="closeDistpicker"><i class="el-icon-close"></i></span>
			</div>

			<!-- 省份 -->
			<div class="distpicker-nape province-wrap" v-show="distpickerType === 'province'">
				<span class="nape-item" :class="{active:currentProvince === key}" v-for="(nape,key) in provinceList" :key="key" @click="distpickerTypeItemChange('province',nape,key)"><i>{{key}}</i></span>
			</div>
			<!-- 市区 -->
			<div class="distpicker-nape city-wrap" v-show="distpickerType === 'city'">
				<span class="nape-item" :class="{active:currentCity === key}" v-for="(nape,key) in cityList" :key="key" @click="distpickerTypeItemChange('city',nape,key)"><i>{{key}}</i></span>
			</div>
			<!-- 县区 -->
			<div class="distpicker-nape area-wrap" v-show="distpickerType === 'area'">
				<span class="nape-item" :class="{active:currentArea === nape}" v-for="(nape,key) in areaList" :key="key" @click="distpickerTypeItemChange('area',nape,key)"><i>{{nape}}</i></span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Distpicker',
	props: {
		display: {
			type: Boolean,
		},
		address: {
			type: Array,
		},
	},
	data() {
		return {
			distpickerType: 'province',
			provinceList: {},
			cityList: {},
			areaList: [],
			currentProvince: '',
			currentCity: '',
			currentArea: '',
			playback: '',
		};
	},
	computed: {},
	watch: {
		address: {
			handler() {
				let provice = this.address[0] || '';
				let city = this.address[1] || '';
				let area = this.address[2] || '';
				this.currentProvince = provice;
				this.currentCity = city;
				this.currentArea = area;
				this.cityList = this.provinceList[provice] || {};
				this.areaList = this.cityList[city] || {};

				if (provice) {
					if (provice && provice === city) {
						city = city + '市';
					} else {
						provice = provice + '省';
					}
				}

				this.playback = provice + city + area;
			},
		},
	},
	created() {
		this.getProvinces();
	},
	mounted() {
		document.addEventListener('click', this.updateDisplay);
		this.$once('hook:beforeDestroy', () => {
			document.removeEventListener('click', this.updateDisplay);
		});
	},
	methods: {
		distpickerTypeChange(type) {
			this.distpickerType = type;
		},
		distpickerTypeItemChange(type, data, key) {
			// console.log(type, data, key);
			if (type === 'province') {
				this.currentProvince = key;
				this.distpickerType = 'city';
				this.cityList = data;

				if (this.areaList.length) {
					this.areaList = [];
					this.currentCity = '';
				}
			} else if (type === 'city') {
				this.currentCity = key;
				this.areaList = data;
				this.distpickerType = 'area';
			} else {
				this.currentArea = data;
				const provice = this.currentProvince;
				const city = this.currentCity;
				const area = this.currentArea;
				const address = [provice, city, area];

				this.distpickerType = 'province';
				this.$emit('update:address', address);
				this.updateDisplay();
				// console.log(address);
			}
		},
		closeDistpicker() {
			this.updateDisplay();
		},
		toggle() {
			this.$emit('update:display', !this.display);
		},
		updateDisplay() {
			this.$emit('update:display', false);
			// this.currentProvince = '';
			// this.currentCity = '';
			// this.currentArea = '';
			this.distpickerType = 'province';
		},
		getProvinces() {
			this.$axios.addressMain().then((res) => {
				this.provinceList = res.data;
			});
		},
	},
};
</script>

<style lang='scss' scoped>
.distpicker-wrapper {
	position: relative;
	display: inline-block;
}

.text-content {
	white-space: nowrap;
	padding: 0 12px;
	display: flex;
	justify-content: space-between;
	font-size: 13px;
	color: #777;
	cursor: pointer;
}

.distpicker-wrap {
	background-color: #fff;
	position: absolute;
	width: 394px;
	padding: 0 6px 35px 6px;
	left: -1px;
	top: 20px;
	border: 1px solid #eee;
	z-index: 100;
}

.select-type {
	padding: 7px 0 3px 0;
	margin-bottom: 18px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.select {
		display: flex;
		span {
			height: 30px;
			line-height: 30px;
			width: 80px;
			text-align: center;
			display: block;
			border: 1px solid #ededed;
			box-sizing: border-box;
			cursor: pointer;

			&.active {
				background-color: var(--def-backdrop);
				color: white;
			}
		}

		span:not(:last-child) {
			border-right: none;
		}
	}

	.close-distpicker {
		width: 30px;
		height: 30px;
		line-height: 30px;
		font-size: 18px;
		text-align: center;
		cursor: pointer;
	}
}

.distpicker-nape {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	.nape-item {
		display: inline-block;
		height: 20px;
		line-height: 20px;
		width: 96px;
		margin-bottom: 11px;
		font-size: 13px;
		cursor: pointer;

		&.active i {
			background-color: var(--def-backdrop);
			border: 1px solid var(--def-backdrop);
			color: white;
		}
		i {
			display: inline-block;
			box-sizing: border-box;
			border: 1px solid #fff;
			padding: 0 8px;
			transition: all 0.2s;
		}
	}

	.nape-item:hover i {
		border: 1px solid var(--def-backdrop);
		color: var(--def-backdrop);
	}

	.nape-item.active:hover i {
		color: white;
	}
}
</style>
