<template>
	<div class="logon-page">
		<div class="page-upper">
			<div class="inner logo-upper">
				<Logo></Logo>
				<div class="please-log-in">
					已有账号？
					<router-link tag="span" to="/login" class="please btn">
						请登录<span class="iconfont icon-youbian"></span>
					</router-link>
				</div>
			</div>
		</div>

		<!-- 验证手机号 -->
		<div class="page-between">
			<SideSteps :list="['验证手机号','填写账号信息','注册成功']" :step="step"></SideSteps>
			<Step1 v-if="!step" :step.sync="step" @change="updateUserInfo"></Step1>
			<Step2 v-else-if="step == 1" :step.sync="step" :user="user"></Step2>
			<Step3 v-else-if="step == 2" :step.sync="step"></Step3>
		</div>

		<div class="footer">
			<Information white class="information" />
		</div>
	</div>
</template>

<script>
import Step1 from '@/views/Register/Step1';
import Step2 from '@/views/Register/Step2';
import Step3 from '@/views/Register/Step3';

export default {
	name: 'Register',
	components: { Step1, Step2, Step3 },
	data() {
		return {
			step: 0, // 第一步 验证手机   第二步  填写信息  第三步 注册成功
			user: {
				phone: '',
				code: '',
				username: '',
			},
		};
	},
	methods: {
		updateUserInfo(data) {
			this.user.phone = data.phone;
			this.user.code = data.code;
			this.user.username = data.phone;
		},
	},
};
</script>

<style lang="scss" scoped>
.logon-page {
	background: var(--f-color);
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.page-upper {
	width: 100%;
	box-shadow: 0px 2px 12px 2px rgba(0, 0, 0, 0.1);
}
.logo-upper {
	padding: 20px 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.please-log-in {
	font-size: 16px;
}
.please-log-in span {
	color: #15c1bb;
}
.page-between {
	width: 480px;
	height: 480px;
	margin: 0 auto;
	position: relative;
	padding: 20px 0;
}

.footer {
	margin-top: 81px;
}
</style>

<style lang="scss">
// 分步样式
.form-step {
	margin-top: 76px;
	.form-step-item {
		width: 458px;
		margin-bottom: 30px;
		position: relative;
		input {
			height: 50px;
			width: 100%;
			border-radius: 25px;
			border: 1px solid var(--ed-color);
			padding-left: 100px;
			box-sizing: border-box;
		}
		span.before-icon {
			position: absolute;
			width: 90px;
			height: 50px;
			line-height: 50px;
			text-align: center;
			border-radius: 24px;
			background-color: var(--ed-color);
			left: 0;
			top: 50%;
			margin-top: -25px;
			i {
				font-size: 26px;
				color: var(--sec-color);
			}
		}

		.form-item-tips {
			position: absolute;
			bottom: -23px;
			left: 3px;
			font-size: 12px;
			.iconfont {
				color: var(--def-backdrop);
				margin-right: 2px;
				position: relative;
				top: 1px;
			}
		}

		.send-code {
			position: absolute;
			white-space: nowrap;
			right: 25px;
			top: 50%;
			transform: translateY(-50%);
			color: var(--def-backdrop);
			cursor: pointer;
		}
	}

	.form-item-tips.error {
		color: red;
		i.iconfont {
			color: red;
		}
	}
}
</style>