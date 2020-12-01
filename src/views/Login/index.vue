<template>
	<div class='login-wrap'>
		<div class="login-head">
			<div class="login-head-main inner">
				<Logo></Logo>
				<div class="login-head-right-list">
					<div class="login-head-right-item">
						<div class="img"><img src="@/assets/images/zheng.png" alt=""></div>
						<div class="text">
							<p>正品保障</p>
							<p>正品承诺 精致服务</p>
						</div>
					</div>
					<div class="login-head-right-item">
						<div class="img"><img src="@/assets/images/quan.png" alt=""></div>
						<div class="text">
							<p>全球精选</p>
							<p>品类齐全 轻松购物</p>
						</div>
					</div>
					<div class="login-head-right-item">
						<div class="img"><img src="@/assets/images/tui.png" alt=""></div>
						<div class="text">
							<p>无忧退货</p>
							<p>国内退货 售后无忧</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 登录主体 -->
		<div class="login-main inner">
			<div class="login-main-title"><img src="@/assets/images/login-banner.png" alt=""></div>
			<LoginWrap @success="$router.back()"></LoginWrap>
		</div>

		<div>
			<div class="blank"></div>
			<Information white></Information>
		</div>

	</div>
</template>

<script>
import LoginWrap from './LoginWrap';

export default {
	name: 'Login',
	components: { LoginWrap },
	data() {
		return {
			isLoginScan: false,
			loginType: 'sms',
		};
	},
	computed: {},
	created() {
		this.$store.commit('setUserInfo', {});
	},
	mounted() {},
	beforeDestroy() {},
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
.login-wrap {
	height: 100vh;
	min-width: 1090px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	.blank {
		height: 150px;
		background-color: var(--f-color);
	}
}
.login-head {
	padding: 20px 0;
	background-color: var(--f-color);
}

.login-head-main {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.login-head-right-list {
	display: flex;
}

.login-head-right-item {
	display: flex;
	.img {
		width: 40px;
		height: 40px;
	}

	.text {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin-left: 8px;
		p:first-child {
			font-size: 16px;
			font-weight: 700;
			color: var(--def-color);
		}

		p:last-child {
			font-size: 12px;
			color: var(--sec-color);
		}
	}
}

.login-head-right-item:not(:last-child) {
	margin-right: 40px;
}

.login-main {
	display: flex;
	justify-content: space-between;
	align-items: center;
	min-height: 425px;
}

.login-main-title {
	width: 400px;
	height: 203px;
}

.login-type-scan-main {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 53px;
	& > p {
		font-size: 16px;
		margin-bottom: 19px;
		font-weight: 500px;
	}

	.login-type-scan-img {
		width: 140px;
		height: 140px;

		img {
			box-shadow: 0px 2px 12px 2px rgba(0, 0, 0, 0.1);
		}
	}

	.login-type-scan-tips {
		margin-top: 10px;
		.img {
			margin-right: 3px;
			.iconfont {
				font-size: 28px;
				color: var(--def-backdrop);
			}
		}

		.text {
			font-size: 12px;
			line-height: 14px;
		}
		display: flex;
	}
}

.login-type-list {
	padding: 10px 27px;
	display: flex;
	justify-content: space-between;
	border-top: 1px solid var(--e-color);
	& > div {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		background-color: var(--def-backdrop);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 19px;
		color: var(--f-color);
		cursor: pointer;
	}
}
</style>