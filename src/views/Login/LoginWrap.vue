 <template>
	<div class="login-main-content">
		<div v-if="false" class="login-type-scan btn" @click="toogleLoginScan">
			<img src="@/assets/images/scan.png" alt="">
			<span>{{isLoginScan ? '账号登录':'扫码更安全'}}</span>
		</div>

		<div class="login-type-scan-main" v-show="isLoginScan">
			<p>手机扫码 安全登录</p>
			<div class="login-type-scan-img"><img src="@/assets/images/qr-code.png" alt=""></div>
			<div class="login-type-scan-tips">
				<div class="img">
					<Cicon iconClass="icon-saoyisao"></Cicon>
				</div>
				<div class="text">
					打开睐思购app<br />
					扫一扫登录
				</div>
			</div>
		</div>

		<div class="login-type" v-show="!isLoginScan">
			<div class="login-type-item btn" :class="{active:loginType === 'sms'}" @click="toogleLoginType('sms')">短信登录</div>
			<div class="login-type-item btn" :class="{active:loginType === 'user'}" @click="toogleLoginType('user')">密码登录</div>
		</div>

		<!-- 密码登录 -->
		<UserLogin v-show="!isLoginScan && loginType === 'user'" @success="$emit('success')" @error="$emit('error')"></UserLogin>
		<!-- 短信登录 -->
		<SmsLogin v-show="!isLoginScan && loginType === 'sms'" @success="$emit('success')" @error="$emit('error')"></SmsLogin>

		<!-- 其他登录方式 -->
		<div class="login-type-list" v-if="false">
			<div>
				<Cicon iconClass="icon-weixin1"></Cicon>
			</div>
			<div>
				<Cicon iconClass="icon-qq"></Cicon>
			</div>
			<div>
				<Cicon iconClass="icon-weibo"></Cicon>
			</div>
			<div>
				<Cicon iconClass="icon-jianzhuanquan"></Cicon>
			</div>
			<div>
				<Cicon iconClass="icon-Alipay"></Cicon>
			</div>
		</div>
	</div>
</template>

<script>
import UserLogin from './UserLogin';
import SmsLogin from './SmsLogin';
export default {
	name: '',
	components: { UserLogin, SmsLogin },
	data() {
		return {
			isLoginScan: false,
			loginType: 'sms',
		};
	},
	methods: {
		// 扫码切换
		toogleLoginScan() {
			this.isLoginScan = !this.isLoginScan;
		},
		toogleLoginType(type) {
			this.loginType = type;
		},
	},
};
</script>

<style lang='scss'>
@import '@/styles/var.scss';
$ab-color: #ababab;

.login-main-content {
	width: 364px;
	height: 385px;
	box-sizing: border-box;
	position: relative;
	background-color: var(--f-color);
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	.login-type-scan {
		position: absolute;
		width: 40px;
		height: 40px;
		right: 10px;
		top: 10px;
		z-index: 10;

		& > span {
			position: absolute;
			right: 40px;
			top: 5px;
			white-space: nowrap;
			background-color: #ffcccc;
			color: #ff0000;
			height: 20px;
			line-height: 20px;
			font-size: 12px;
			padding: 0 5px;

			&:before {
				content: '';
				position: absolute;
				right: -9px;
				top: 4px;
				@include arrow(left, 5px, #ffcccc);
			}
		}
	}

	.login-type {
		height: 89px;
		display: flex;
		padding: 0 30px;
		align-items: center;
		position: relative;
		font-size: 16px;

		.login-type-item {
			position: relative;
			margin-right: 20px;

			&.active::after {
				content: '';
				width: 100%;
				height: 2px;
				background-color: var(--def-backdrop);
				position: absolute;
				bottom: -5px;
				border-radius: 2px;
				left: 50%;
				transform: translateX(-50%);
			}
			&.active {
				color: var(--def-backdrop);
			}
		}
	}
}

.login-type-content {
	padding: 0 32px;
	flex: 1;
	.login-type-content-item {
		height: 40px;
		position: relative;

		& > .item-icon {
			position: absolute;
			top: 0;
			left: 0;
			width: 55px;
			height: 40px;
			border-radius: 20px;
			background-color: var(--ed-color);
			display: flex;
			align-items: center;
			justify-content: center;
		}
		input {
			width: 100%;
			height: 40px;
			border: 1px solid var(--e-color);
			border-radius: 20px;
			padding-left: 70px;
			box-sizing: border-box;
			font-size: 14px;
			color: var(--sec-color);
		}
		.iconfont {
			color: var(--sec-color);
			font-size: 20px;
		}

		& > p.tips {
			font-size: 12px;
			color: red;
			margin-top: 2px;
			margin-left: 2px;
			text-align: left;
		}

		input:focus {
			border-color: var(--def-backdrop);
		}
		input:focus + div {
			background-color: var(--def-backdrop);
			i {
				color: var(--f-color);
			}
		}

		input::-webkit-input-placeholder {
			color: $ab-color;
		}
		input:-moz-placeholder {
			color: $ab-color;
		}
		input::-moz-placeholder {
			color: $ab-color;
		}
		input:-ms-input-placeholder {
			color: $ab-color;
		}
	}

	.verification-code-btn {
		position: absolute;
		white-space: nowrap;
		right: 10px;
		top: 12px;
		z-index: 20;
		font-size: 12px;
		color: var(--sec-color);
		cursor: pointer;
		&:hover {
			color: var(--def-backdrop);
		}
	}

	.login {
		margin-top: 20px;
	}

	.login-auxiliary {
		text-align: right;
		margin-top: 20px;
		span {
			display: inline-block;
			cursor: pointer;
			color: var(--def-color);
		}
		.retrieve-password {
			height: 12px;
			line-height: 12px;
			font-size: 12px;
		}

		.retrieve-password:hover {
			color: var(--def-backdrop);
		}
	}

	.privacy {
		margin-top: 20px;
		text-align: center;
		color: var(--thir-color);
		font-size: 12px;
		a {
			color: var(--thir-color);
			text-decoration: underline;
		}
	}
}
.login-type-content .login-type-content-item:nth-of-type(2) {
	margin-top: 20px;
}

.login-type-content .login-type-content-item:nth-of-type(2) {
	margin-top: 20px;
}
</style>