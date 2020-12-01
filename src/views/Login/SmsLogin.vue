 <template>
	<!-- 短信登录 -->
	<div class="login-type-content sms">
		<div class="login-type-content-item">
			<input type="text" maxlength="11" v-model.trim="sms.phone" autocomplete="off" placeholder="请输入手机号" @keyup.enter="smsLogin">
			<div class="item-icon">
				<Cicon iconClass="icon-shouji4"></Cicon>
			</div>
			<p v-show="smsPhoneTips" class="tips">{{smsPhoneTips}}</p>
		</div>
		<div class="login-type-content-item">
			<input maxlength="4" v-model.trim="sms.code" type="text" autocomplete="off" placeholder="请输入验证码" @keyup.enter="smsLogin">
			<div class="item-icon">
				<Cicon iconClass="icon-yanzheng"></Cicon>
			</div>

			<div class="verification-code-btn" @click="sendVerificationCode">
				<Countdown v-show="display" :display.sync="display" :start="60" />{{display ? 's后重发':'发送验证码'}}
			</div>

			<p v-show="smsCodeTips" class="tips">{{smsCodeTips}}</p>
		</div>

		<Button class="login" size="mini" round text="登录/注册" :disabled="smsDisabled" @click="smsLogin"></Button>

		<p class="privacy">注册/登录代表同意 <router-link to="/common/privacy">隐私政策</router-link> 和 <router-link to="/common/privacy">服务条款</router-link>
		</p>
	</div>
</template>

<script>
import { checkPhone } from '@/utils';

export default {
	name: '',
	data() {
		return {
			sms: {
				phone: '',
				code: '',
				useLongSession: 1,
			},
			display: false,

			smsPhoneTips: '',
			smsCodeTips: '',
		};
	},
	computed: {
		smsDisabled() {
			const p = checkPhone(this.sms.phone);
			const c = this.sms.code.length === 4;
			const f = p & c ? false : true;

			return f;
		},
	},
	watch: {
		'$store.state.loginToast'() {
			this.clearForm();
		},
	},
	methods: {
		// 短信登陆
		smsLogin() {
			console.log(111);
			const phone = this.sms.phone;
			if (!phone) {
				this.smsPhoneTips = '请填写手机号';
				return;
			} else if (!checkPhone(phone)) {
				this.smsPhoneTips = '请填写正确的手机号';
				return;
			} else {
				this.smsPhoneTips = '';
			}

			if (this.sms.code.length < 4) {
				this.smsCodeTips = '请填写4位数验证码';
				return;
			} else {
				this.smsCodeTips = '';
			}

			const data = this.sms;
			this.loadeing();

			this.$axios
				.loginCode(data)
				.then((res) => {
					let {
						extra: { token, sessionId },
						data: { username, phone, nickName, email, headPic },
					} = res;
					nickName = nickName || username;
					const userinfo = {
						username,
						phone,
						token,
						sessionId,
						nickName,
						email,
						headPic,
					};
					this.$store.commit('setUserInfo', userinfo);
					this.$store.dispatch('getGoodsToCart');
					this.$emit('success');
				})
				.catch(() => {
					this.$emit('error');
				});
		},
		// 发送验证码
		sendVerificationCode() {
			if (this.display) return;
			const phone = this.sms.phone;
			console.log('发送验证码');
			if (!phone) {
				this.smsPhoneTips = '请填写手机号';
				return;
			} else {
				this.smsPhoneTips = '';
			}

			if (!checkPhone(phone)) {
				this.smsPhoneTips = '请填写正确的手机号';
				return;
			}

			this.display = true;

			const pramas = { phone: this.sms.phone, type: 'login' };

			this.$axios
				.getSmsCode(pramas)
				.then((res) => {
					console.log(res);
				})
				.catch((err) => {
					this.$layer.msg(err.message || '验证码异常');
				});
		},
		clearForm() {
			this.sms = { phone: '', code: '' };
			this.smsPhoneTips = '';
			this.smsCodeTips = '';
		},
	},
};
</script>
