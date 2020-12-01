 <template>
	<!-- 扫码支付 -->
	<div class='submit-scan-wrap'>
		<div class="submit-scan-head inner">
			<div class="head-title">请您及时付款，以便睐思购为您尽快处理哦！订单号：{{orderInfo.orderId}} <span>￥{{orderInfo.amountPaid}}</span></div>
			<p>请您在提交订单后<span>
					<mv-count-down v-if="endTime" class="order-count-down" @endCallback="getOrderInfo" :startTime="startTime" endText="已取消" :endTime="endTime" :dayTxt="'天'" :hourTxt="'小时'" :minutesTxt="'分钟'" :secondsTxt="'秒'" :isStart="true" />
				</span>内完成支付，否则订单会自动取消。</p>
		</div>

		<div class="scan-content inner">
			<div class="scan-content-before">
				<div class="before-title">微信支付</div>
				<div class="scan-img" ref="qrcode" id="qrcode" v-loading="wxLoading">
					<img ref="scanImages" v-if="scanImage" :src="scanImage" alt="">
					<div v-if="!wxLoading && !scanImage" class="scan-err">二维码异常，请稍后再试</div>
					<div class="re-get-scan" v-if="reGetScan">
						<p>二维码已失效</p>
						<p class="re-get-scan-btn btn" @click="reGetScanHandle">重新获取</p>
					</div>
				</div>
				<div class="scan-tips">
					<div class="scan-icon">
						<Cicon iconClass="icon-saoyisao"></Cicon>
					</div>

					<p>请使用微信扫一扫扫描二维码支付</p>
				</div>
			</div>

			<div class="scan-content-after">
				<img :src="require('@/assets/images/weixin_pay.png')" alt="">
			</div>
		</div>

		<div class="other-payment inner">
			<span @click="$router.go(-1)">
				<i class="el-icon-arrow-left"></i>选择其他支付方式
			</span>
		</div>
	</div>
</template>

<script>
import QrCode from 'qrcodejs2';
import MvCountDown from 'mv-count-down';
import { storages } from '@/utils';

export default {
	name: '',
	components: { MvCountDown },
	data() {
		return {
			qrcode: null,
			orderInfo: {},
			startTime: 0,
			endTime: 0,
			scanImage: '',
			scanImageCache: '',
			timer: null,
			timerCount: 0,
			wxLoading: true,
			reGetScan: false,
			reTimer: null,
		};
	},
	created() {
		this.getOrderInfo();
	},
	mounted() {
		// this.createQrcode();
	},
	beforeDestroy() {
		this.qrcode && this.qrcode.clear();
		this.timer && clearInterval(this.timer);
	},
	methods: {
		createQrcode() {
			if (this.qrcode) {
				this.qrcode.clear();
				// qrcode.makeCode('new content');
				this.qrcode = null;
			} else {
				this.qrcode = new QrCode('qrcode', {
					width: 200,
					height: 200,
					text: '我是测试二维码',
					correctLevel: QrCode.CorrectLevel.L, //容错级别，LMQH(低到高)
					// image: '',
					// render: 'canvas', // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
					// background: '#f0f',
					// foreground: '#ff0'
				});
			}
		},
		getOrderInfo() {
			const ls__settleColle_order = storages.get('ls__settleColle_order');

			this.$axios.orderGetInfo(ls__settleColle_order).then(({ data = {} }) => {
				if (data.orderStatus === '7') {
					this.$router.back();
					console.log(11111);
					return;
				}
				if (data.paymentStatus === '1') {
					//支付完成
					this.$router.replace('/submit/pay');
					return;
				}
				this.orderInfo = data;
				const time = data.timeCreated;
				const date = new Date(time);
				let nTime = new Date(date.setSeconds(date.getSeconds() + 60 * 60 * 2));

				this.startTime = new Date().getTime();
				this.endTime = nTime.getTime();
				this.getScanInfo(data);
			});
		},
		getScanInfo(data) {
			// out_trade_no 类型 String  （单号）
			// total_amount 类型 String  （金额）
			// body 类型 String  （订单描述）
			// ip 类型 String  （用户ip地址）

			// https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=
			const { token, sessionId } = this.$store.state.userinfo;
			const params = { token, sessionId };

			this.$axios
				.getWxPay(data.orderId, params)
				.then(({ data = {} }) => {
					const base =
						'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=';
					const url = data.code_url ? base + data.code_url : '';
					this.scanImage = url;
					this.scanImageCache = url;
					this.$nextTick(() => {
						const image = this.$refs.scanImages;
						image.onload = () => {
							this.wxLoading = false;
							this.inquireOrderStatus();
						};
					});
				})
				.catch(() => {
					this.wxLoading = false;
				});
		},
		inquireOrderStatus() {
			this.timerCount = 0;
			this.timer && clearInterval(this.timer);
			this.timer = setInterval(() => {
				const ls__settleColle_order = storages.get('ls__settleColle_order');
				this.timerCount += 1;

				if (this.timerCount >= 20) {
					this.timerCount = 0;
					this.scanImage = '';
					this.reGetScan = true;
					clearInterval(this.timer);
					return;
				}

				this.$axios
					.orderGetInfo(ls__settleColle_order)
					.then(({ data = {} }) => {
						if (data.orderStatus === '7') {
							this.$router.back();
							return;
						}

						if (`${data.paymentStatus}` === '0') return;
						//支付完成
						this.timerCount = 0;
						this.$router.replace('/submit/pay');
						this.$router.back();
						clearInterval(this.timer);
					});
			}, 3000);
		},
		reGetScanHandle() {
			this.reGetScan = false;
			this.wxLoading = true;
			clearTimeout(this.reTimer);
			this.reTimer = setTimeout(() => {
				this.wxLoading = false;
				this.scanImage = this.scanImageCache;
				this.inquireOrderStatus();
			}, 3000);
		},
	},
};
</script>

<style lang='scss' scoped>
.submit-scan-wrap {
	margin-bottom: 100px;
}

.submit-scan-head {
	padding: 22px 0 30px 0;
	.head-title {
		font-size: 18px;
		font-weight: 700;
		color: #000;
		display: flex;
		justify-content: space-between;
		span {
			color: var(--def-backdrop);
		}
	}

	p {
		margin-top: 17px;
		span {
			color: var(--def-backdrop);
		}
	}
}

.scan-content {
	display: flex;
	justify-content: space-around;
	padding: 0 105px 0 165px;
	box-sizing: border-box;
	background-color: var(--f-color);
	border-radius: 10px;
	height: 380px;
	align-items: center;
	position: relative;
}

.scan-content::before {
	content: '';
	position: absolute;
	height: 300px;
	border-right: 1px solid var(--d-color);
	left: 50%;
	top: 50%;
	transform: translateY(-50%);
}

.scan-content-before {
	.before-title {
		text-align: center;
		font-size: 20px;
		font-weight: 500;
		padding-bottom: 20px;
	}

	.scan-img {
		width: 200px;
		height: 200px;
		padding: 10px;
		border: 1px solid #eaeaea;
		// text-align: center;
		// line-height: 200px;
		color: var(--c-color);
		position: relative;
	}

	.scan-err {
		text-align: center;
		line-height: 200px;
		height: 100%;
	}

	.re-get-scan {
		position: absolute;
		top: 0;
		left: 0;
		width: 220px;
		height: 220px;
		background-color: hsla(0, 0%, 100%, 0.95);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.re-get-scan-btn {
			padding: 0 8px;
			height: 26px;
			line-height: 26px;
			background-color: var(--def-backdrop);
			color: var(--f-color);
			margin-top: 10px;
		}
	}

	.scan-tips {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 6px;

		.scan-icon {
			width: 30px;
			height: 30px;
			line-height: 33px;
			text-align: center;
			margin-right: 14px;

			i {
				font-size: 28px;
				color: var(--def-backdrop);
			}
		}

		p {
			width: 96px;
			font-size: 12px;
			color: var(--sec-color);
		}
	}
}

.scan-content-after {
	width: 340px;
	height: 340px;
}

.other-payment {
	color: var(--sec-color);
	margin-top: 20px;
	margin-bottom: 100px;
	span {
		cursor: pointer;
	}
}

.order-count-down {
	display: inline-block;
	font-size: 14px;
	color: var(--def-backdrop);
}
</style> 