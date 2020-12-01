 <template>
	<div class="login-type-content user">
		<div class="login-type-content-item">
			<input type="text" v-model.trim="user.username" maxlength="20" autocomplete="off" placeholder="会员名/手机号/账号" @keyup.enter="userLogin">
			<div class="item-icon">
				<Cicon iconClass="icon-zhanghu"></Cicon>
			</div>
			<p v-show="psPhoneTips" class="tips">{{psPhoneTips}}</p>
		</div>
		<div class="login-type-content-item">
			<input type="password" maxlength="20" autocomplete="off" v-model.trim="user.password" placeholder="请输入登录密码" @keyup.enter="userLogin">
			<div class="item-icon">
				<Cicon iconClass="icon-mima2"></Cicon>
			</div>
			<p v-show="psPasswordTips" class="tips">{{psPasswordTips}}</p>
		</div>

		<Button class="login" size="mini" round :disabled="userDisabled" text="登录/注册" @click="userLogin"></Button>

		<div class="login-auxiliary">
			<router-link tag="span" to="/retrieve" class="retrieve-password">忘记密码</router-link>
			<!-- <a href="#/retrieve" target="_blank" class="retrieve-password">忘记密码</a> -->
		</div>

		<p class="privacy">注册/登录代表同意 <router-link to="/common/privacy">隐私政策</router-link> 和 <router-link to="/common/privacy">服务条款</router-link>
		</p>

	</div>
</template>

<script>
import { checkPhone, checkPass, checkEmail } from '@/utils';

export default {
	name: '',
	data() {
		return {
			user: {
				username: '',
				password: '',
			},
			psPhoneTips: '',
			psPasswordTips: '',
		};
	},
	computed: {
		userDisabled() {
			const f = this.user.username && this.user.password ? false : true;

			return f;
		},
	},
	watch: {
		'$store.state.loginToast'() {
			this.clearForm();
		},
	},
	methods: {
		// 密码登录
		userLogin() {
			if (this.user.username) {
				this.psPhoneTips = '';
			} else {
				this.psPhoneTips = '请填写正确的用户名';
				return;
			}

			const phonef = checkPhone(this.user.username);
			const emailf = checkEmail(this.user.username);
			// const usernf = checkUsername(this.user.username);
			const data = { password: this.user.password, useLongSession: 1 };
			const npassf = checkPass(this.user.password);

			if (npassf) {
				this.psPasswordTips = '';
			} else {
				this.psPasswordTips = '请输入5-20位数字字母密码';
				return;
			}

			if (emailf) {
				data.email = this.user.username;
			} else if (phonef) {
				data.phone = this.user.username;
			} else {
				data.username = this.user.username;
			}

			if (this.psPhoneTips) return;

			this.loadeing();

			this.$axios
				.loginPass(data)
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
		clearForm() {
			this.user = { username: '', password: '' };
			this.psPhoneTips = '';
			this.psPasswordTips = '';
		},
	},
};
</script>