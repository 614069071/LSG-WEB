<template>
	<div class='retrieve-wrap'>
		<div class="retrieve-head">
			<div class="retrieve-head-main inner">
				<Logo></Logo>
				<div class="title">找回密码</div>
			</div>
		</div>

		<div class="retrieve-main">
			<div class="retrieve-main-content">
				<SideSteps :list="['身份认证','设置操作','完成']" :step="currentSteps"></SideSteps>

				<!-- 身份认证 -->
				<div class="retrieve-step1" v-show="currentSteps === 0">
					<div class="validation-tips">
						<div class="validation-tips-icon">
							<Cicon iconClass="icon-anquan"></Cicon>
						</div>
						<div class="validation-tips-text">为确认是您本人操作，请选择以下任一方式完成身份验证</div>
					</div>

					<div class="validation-type">
						<Button :type="validationType === 'sms' ? 'default':'info'" text="手机短信验证" @click="validationChange('sms')"></Button>
						<Button :type="validationType === 'email' ? 'default':'info'" text="邮箱验证" @click="validationChange('email')"></Button>
					</div>
				</div>

				<!-- 设置操作 -->
				<div class="retrieve-step2" v-show="currentSteps === 1">
					<p>设置登录密码</p>
					<div class="retrieve-reset">
						<input maxlength="10" :type="showPassword ? 'text':'password'" v-model.trim="newpass" autocomplete="off" placeholder="请输入10位新的密码">
						<span @click="showPassword = !showPassword">
							<Cicon :iconClass="showPassword ? 'icon-view' : 'icon-biyan'"></Cicon>
						</span>
						<p v-show="newPassTips.length">{{newPassTips}}</p>
					</div>
					<Button class="reset-btn" text="提交" @click="resetPasswordSubmit"></Button>
				</div>

				<!-- 设置操作 -->
				<div class="retrieve-step3" v-show="currentSteps === 2">
					<div class="retrieve-success">
						<span><i class="el-icon-check"></i></span>
						<span>登陆密码更新成功</span>
					</div>
					<Button class="re-btn" text="重新登录" @click="$router.push('/login')"></Button>
				</div>
			</div>
		</div>

		<!-- 短信验证 -->
		<Toast class="sms-validation-dialog validation-dialog-item" :visible.sync="smsVisible" title="手机号验证">
			<div class="validation-dialog-content">
				<div class="dialog-validation-icon">
					<Cicon class="icon-shouji2"></Cicon>
				</div>
				<p class="dialog-validation-type">使用手机短信验证</p>

				<div class="dialog-validation-input">
					<input type="text" maxlength="11" v-model.trim="userSms.phone" placeholder="请填写手机号">
					<p v-show="userSmsPhoneTips.length"><i class="el-icon-circle-check"></i>{{userSmsPhoneTips}}</p>
				</div>

				<div class="dialog-validation-input">
					<input type="text" maxlength="4" v-model.trim="userSms.code" placeholder="请输入手机验证码">
					<span :class="{active:smslDisplay}" @click="getSmsCode">
						<Countdown v-show="smslDisplay" :display.sync="smslDisplay" :start="60" />{{smslDisplay ? 's后获取':'发送验证码'}}
					</span>
					<p v-show="userSmsCodeTips.length"><i class="el-icon-circle-check"></i>{{userSmsCodeTips}}</p>
				</div>

				<Button class="dialog-validation-submit" text="提交认证" @click="smsCodeSubmit"></Button>
			</div>
			<div slot="footer"></div>
		</Toast>

		<!-- 邮箱验证 -->
		<Toast class="email-validation-dialog validation-dialog-item" :visible.sync="emailVisible" title="邮箱验证">
			<div class="validation-dialog-content">
				<div class="dialog-validation-icon">
					<Cicon class="icon-jianzhuanquan"></Cicon>
				</div>
				<p class="dialog-validation-type">使用邮箱验证</p>
				<div class="dialog-validation-input">
					<input type="text" v-model.trim="userEmail.email" placeholder="请填写邮箱">
					<p v-show="emailUserTips"><i class="el-icon-circle-check"></i>{{emailUserTips}}</p>
				</div>
				<div class="dialog-validation-input">
					<input type="text" maxlength="4" v-model.trim="userEmail.code" placeholder="请输入邮箱验证码">
					<span :class="{active:emailDisplay}" @click="getEmailCode">
						<Countdown v-show="emailDisplay" :display.sync="emailDisplay" :start="60" />{{emailDisplay ? 's后获取':'发送验证码'}}
					</span>
					<p v-show="emailCodeTips"><i class="el-icon-circle-check"></i>{{emailCodeTips}}</p>
				</div>
				<Button class="dialog-validation-submit" text="提交认证" @click="emailCodeSubmit"></Button>
			</div>
			<div slot="footer"></div>
		</Toast>

		<Information></Information>
	</div>
</template>

<script>
import { checkPhone, checkPass, checkEmail } from '@/utils';

function checkPhoneNumber(phone) {
	if (!phone) {
		return '请填写手机号';
	} else if (!checkPhone(phone)) {
		return '请填写正确的手机号';
	} else {
		return '';
	}
}

export default {
	name: 'Retrieve',
	data() {
		return {
			currentSteps: 0,
			// 身份认证
			validationType: 'sms',
			smsVisible: false,
			userSms: {
				phone: '',
				code: '',
			},
			smslDisplay: false,
			userSmsPhoneTips: '',
			userSmsCodeTips: '',
			userEmail: {
				email: '',
				code: '',
			},
			emailUserTips: '',
			emailDisplay: false,
			emailVisible: false,
			newpass: '',
			showPassword: false,
			newPassTips: '',
			emailCodeTips: '',
		};
	},

	created() {
		this.smsTimer && clearInterval(this.smsTimer);
	},
	mounted() {},
	beforeDestroy() {
		this.smsTimer && clearInterval(this.smsTimer);
	},
	methods: {
		validationChange(type) {
			this.validationType = type;
			if (type === 'sms') {
				this.smsVisible = true;
			} else {
				this.emailVisible = true;
			}
		},
		// 短信验证
		getSmsCode() {
			this.userSmsPhoneTips = checkPhoneNumber(this.userSms.phone);

			if (this.userSmsPhoneTips) return;

			const pramas = { phone: this.userSms.phone, type: 'resetPass' };

			this.smslDisplay = true;

			this.$axios
				.getSmsCode(pramas)
				.then(() => {
					this.userSmsCodeTips = '验证码已发送至您的邮箱，请注意查收';
				})
				.catch((err) => {
					this.userSmsCodeTips = err.message || '获取验证码错误，请稍后再试';
					console.log(err.message);
				});
		},
		smsCodeSubmit() {
			this.userSmsPhoneTips = checkPhoneNumber(this.userSms.phone);

			if (this.userSmsPhoneTips) return;

			if (this.userSms.code.length < 4) {
				this.userSmsCodeTips = '请填写4位数验证码';
			} else {
				this.userSmsCodeTips = '';
			}
			this.smsVisible = false;
			this.currentSteps = 1;
		},
		// 邮箱验证
		getEmailCode() {
			if (this.emailDisplay) return;

			if (checkEmail(this.userEmail.email)) {
				this.emailUserTips = '';
			} else {
				this.emailUserTips = '请输入正确的邮箱账号';
				return;
			}

			const pramas = { email: this.userEmail.email, type: 'resetPass' };

			this.emailDisplay = true;
			this.$axios
				.getEmailCode(pramas)
				.then(() => {
					this.emailCodeTips = '验证码已发送至您的邮箱，请注意查收';
				})
				.catch((err) => {
					console.log(err, 'getEmailCode');
					this.emailCodeTips = err.message || '获取验证码错误，请稍后再试';
				});
		},
		emailCodeSubmit() {
			if (checkEmail(this.userEmail.email)) {
				this.emailUserTips = '';
			} else {
				this.emailUserTips = '请输入正确的邮箱账号';
				return;
			}

			if (this.userEmail.code.length < 4) {
				this.emailCodeTips = '请输入4位数验证码';
				return;
			}
			this.emailVisible = false;
			this.currentSteps = 1;
		},
		resetPasswordSubmit() {
			const f = checkPass(this.newpass);
			let data = {};

			if (!f) {
				this.newPassTips = '请输入5-20位数字字母组合密码';
				return;
			} else {
				this.newPassTips = '';
			}

			if (this.validationType === 'sms') {
				data = { ...this.userSms, newpass: this.newpass };
			} else {
				data = { ...this.userEmail, newpass: this.newpass };
			}

			this.$axios
				.resetPass(data)
				.then(() => {
					this.currentSteps = 2;
				})
				.catch(() => {
					this.newPassTips = '修改失败，请稍后再试';
				});
		},
	},
};
</script>

<style lang='scss'>
@import './index.scss';
</style>

