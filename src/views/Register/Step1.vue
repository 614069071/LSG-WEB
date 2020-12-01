 <template>
	<div class="form-step step1">
		<div class="form-step-item ">
			<input type="text" v-model.trim="user.phone" placeholder="请输入您的手机号">
			<span class="before-icon">
				<Cicon iconClass="icon-shouji2"></Cicon>
			</span>

			<span v-show="usernameTips.length" class="form-item-tips error">
				<Cicon iconClass="icon-iconfontxiaogantanhao"></Cicon>{{usernameTips}}
			</span>
		</div>

		<div class="form-step-item">
			<input type="text" maxlength="4" v-model.trim="user.code" placeholder="请填写验证码">
			<span class="before-icon">
				<Cicon iconClass="icon-yanzhengma"></Cicon>
			</span>

			<span class="form-item-tips" v-show="smslDisplay">
				<Cicon iconClass="icon-xianshi_xuanze"></Cicon>短信验证码已发送，可能会有延后请耐心等待
			</span>

			<span v-show="codeTips.length" class="form-item-tips error">
				<Cicon iconClass="icon-iconfontxiaogantanhao"></Cicon>{{codeTips}}
			</span>

			<span class="send-code" @click="sendSmsCode">
				<Countdown v-show="smslDisplay" :display.sync="smslDisplay" :start="60" />{{smslDisplay ? 's后重发':'发送验证码'}}
			</span>
		</div>

		<div class="agree_btn btn" @click="handleAgreeNote">
			<Cicon class="not_clicked btn" :class="[agreeNote ? 'icon-yifasong':'icon-yuanquan1']" />
			<span>同意《睐思购用户注册协议和隐私政策》</span>
		</div>

		<Button text="下一步" :disabled="nextDisabled" @click="VerifyMobileSubmit"></Button>
	</div>
</template>

<script>
export default {
	name: 'Step1',
	props: ['step'],
	data() {
		return {
			agreeNote: false,
			smslDisplay: false,
			user: {
				phone: '19865765350',
				code: '',
			},
			usernameTips: '', //请输入正确的手机号
			codeTips: '', //请输入6位数验证码
		};
	},
	computed: {
		nextDisabled() {
			return this.user.phone && this.user.code && this.agreeNote ? false : true;
		},
	},
	methods: {
		handleAgreeNote() {
			this.agreeNote = !this.agreeNote;
		},
		// 获取验证码
		sendSmsCode() {
			if (!this.user.phone) {
				this.usernameTips = '填写手机号';
				return;
			}
			this.usernameTips = '';

			if (this.smslDisplay) return;
			this.codeTips = '';
			this.smslDisplay = true;

			const params = { phone: this.user.phone, type: 'register' };

			this.$axios.getSmsCode(params).then((res) => {
				this.agreeNote = false;
				console.log(res);
			});
		},
		// 验证手机号第一步
		VerifyMobileSubmit() {
			if (!this.user.phone) {
				this.usernameTips = '请输入正确的手机号';
				return;
			}

			this.usernameTips = '';

			if (!this.user.code) {
				this.codeTips = '请输入4位数验证码';
				return;
			}

			this.codeTips = '';

			this.$emit('update:step', 1);
			this.$emit('change', this.user);
		},
	},
};
</script>

<style lang='scss' scoped>
.agree_btn {
	text-align: right;
	margin-bottom: 25px;
	font-size: 12px;
	font-family: 'Source Han Sans CN';
	font-weight: 400;
	color: rgba(51, 51, 51, 1);
	line-height: 25px;
}
.not_clicked {
	position: relative;
	top: 1px;
	margin-right: 3px;
}
.not_clicked.icon-yifasong {
	color: var(--def-backdrop);
}
</style>