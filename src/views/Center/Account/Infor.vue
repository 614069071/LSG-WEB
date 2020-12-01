 <template>
	<!-- 个人信息 -->
	<div class='account-infor-wrap'>
		<NavBar class="personal-center-left"></NavBar>

		<div class="personal-center-right">
			<div class="personal-center-right-title line">个人信息</div>
			<div class="infor-wrap">
				<div class="infor-item">
					<span class="title">头像</span>
					<div class="main">
						<div class="img">
							<img :src="userinfo.headPic||require('@/assets/images/avator.png')" alt="">
						</div>
					</div>
					<span class="btn" @click="updateAvatorVisivle = true">修改</span>
				</div>

				<div class="infor-item">
					<span class="title">昵称</span>
					<div class="main">{{userinfo.nickName}}</div>
					<span class="btn" @click="updateNicknameVisible = true">修改</span>
				</div>

				<div class="infor-item">
					<span class="title">手机号码</span>
					<div class="main">{{dealPhoned}}</div>
					<span class="btn" @click="updatePhoneVisible = true">修改</span>
				</div>

				<div class="infor-item">
					<span class="title">绑定邮箱</span>
					<div class="main">{{userinfo.email || '未绑定'}}</div>
					<span class="btn" @click="bindEmailVisible = true">{{userinfo.email ? '修改':'绑定'}}</span>
				</div>

				<div class="infor-item">
					<span class="title">登录密码</span>
					<div class="main">******</div>
					<span class="btn" @click="updatePasswordVisible = true">修改</span>
				</div>
			</div>
		</div>

		<!-- 修改头像 -->
		<Toast class="common-dialog-wrap update-avator-dialog" title="修改头像" :visible.sync="updateAvatorVisivle" @success="updateAvatorSubmit" @cancel="updateAvatorCancel">
			<div class="common-dialog-main">
				<div class="tailoring-wrap">
					<input id="avatorfile" ref="uploadImg" accept="image/png, image/jpeg, image/gif, image/jpg" class="avator-file" type="file" @change="uploadImg($event, 1)">
					<VueCropper ref="cropper" :style="{backgroundImage:previews.url ? `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC')`: `url(${require('@/assets/images/img_upload.png')})` }"
						:img="VueCropperSet.img" :outputSize="VueCropperSet.size" :outputType="VueCropperSet.outputType" :mode="VueCropperSet.mode" :autoCropWidth="VueCropperSet.autoCropWidth" :autoCropHeight="VueCropperSet.autoCropHeight" :info="false" :full="VueCropperSet.full" :canMove="VueCropperSet.canMove" :canMoveBox="VueCropperSet.canMoveBox" :fixedBox="VueCropperSet.fixedBox"
						:original="VueCropperSet.original" :autoCrop="VueCropperSet.autoCrop" :centerBox="VueCropperSet.centerBox" :high="VueCropperSet.high" :infoTrue="VueCropperSet.infoTrue" @realTime="realTime" @cropMoving="cropMoving"></VueCropper>
				</div>

				<div class="tailoring-right">
					<div class="preview-wrap" :style="{backgroundImage:previews.url ? '': `url(${require('@/assets/images/img_head.png')})` }">
						<div class="preview-img" :style="previewStyle">
							<div :style="previews.div">
								<img :src="previews.url" :style="previews.img">
							</div>
						</div>
					</div>
					<label class="choose-avator-btn btn" for="avatorfile"><i class="el-icon-picture-outline"></i> 选择图像</label>
				</div>

			</div>
		</Toast>

		<!-- 修改昵称 -->
		<Toast class="common-dialog-wrap" title="修改昵称" :visible.sync="updateNicknameVisible" @success="updateNicknameSubmit" @cancel="updateNicknameCancel">
			<div class="common-dialog-main">
				<p class="site-parag"><span>当前昵称</span>{{userinfo.nickName}}</p>
				<p class="site-parag"><span>新昵称</span><input type="text" ref="nickName" v-model="nickName" placeholder="请输入新的昵称"></p>
			</div>
		</Toast>

		<!-- 修改手机号 -->
		<Toast class="common-dialog-wrap" title="修改手机号" :visible.sync="updatePhoneVisible" @success="updatePhoneSubmit" @cancel="updatePhoneCancel">
			<div class="common-dialog-main">
				<p class="site-parag"><span>当前手机号码</span>{{dealPhoned}}</p>
				<p class="site-parag"><span>新手机号码</span><input type="text" ref="phone" v-model="phone" placeholder="请输入新手机号码"></p>
				<p class="site-tips">{{inputPhoneTips}}</p>
				<p class="site-parag"><span>验证码</span><input type="text" ref="phoneCode" v-model="phoneCode" maxlength="4" placeholder="请输入手机验证码">
					<span class="get-code-btn" @click="sendVerificationPhoneCode">
						<Countdown v-show="phoneDisplay" :display.sync="phoneDisplay" :start="60" />{{phoneDisplay ? 's后重发':'发送验证码'}}
					</span>
				</p>
				<p class="site-tips">{{resetPhoneTips}}</p>
			</div>
		</Toast>

		<!-- 修改绑定邮箱 -->
		<Toast class="common-dialog-wrap" :title="userinfo.email? '修改邮箱': '绑定邮箱'" :visible.sync="bindEmailVisible" @success="updateEmailSubmit" @cancel="updateEmailCancel">
			<div class="common-dialog-main">
				<p class="site-parag" v-if="userinfo.email"><span>当前邮箱</span>{{userinfo.email}}</p>
				<p class="site-parag"><span>邮箱</span><input type="text" ref="email" v-model="email" placeholder="请输入邮箱"></p>
				<p class="site-tips">{{inputEmailTips}}</p>
				<p class="site-parag"><span>验证码</span><input type="text" ref="emailCode" v-model="emailCode" maxlength="4" placeholder="请输入邮箱验证码">
					<span class="get-code-btn" @click="sendVerificationCode">
						<Countdown v-show="emailDisplay" :display.sync="emailDisplay" :start="60" />{{emailDisplay ? 's后重发':'发送验证码'}}
					</span>
				</p>
				<p class="site-tips">{{resetEmailTips}}</p>
			</div>
		</Toast>

		<!-- 修改登录密码 -->
		<Toast class="common-dialog-wrap" title="修改登录密码" :visible.sync="updatePasswordVisible" @success="updatePasswordSubmit" @cancel="updatePasswordCancel">
			<div class="common-dialog-main">
				<p class="site-parag"><span>验证码</span><input type="text" maxlength="4" ref="resetPassCode" v-model="resetPassCode" placeholder="请输入手机验证码">
					<span class="get-code-btn" @click="getPasswordCode">
						<Countdown v-show="passwordDisplay" :display.sync="passwordDisplay" :start="60" />{{passwordDisplay ? 's后重发':'发送验证码'}}
					</span>
				</p>
				<!-- <div class="site-tips">使用手机号{{dealPhoned}}获取验证码并输入</div> -->
				<p class="site-parag"><span>新密码</span><input type="password" ref="password1" v-model="password1" placeholder="请输入新的密码"></p>
				<p class="site-parag"><span>确认密码</span><input type="password" ref="password2" v-model="password2" placeholder="请再次输入密码"></p>
				<p class="site-tips">{{resetPassTips}}</p>
			</div>
		</Toast>
	</div>
</template>

<script>
import NavBar from '../components/NavBar';
import { checkEmail, checkPhone, dealPhone, checkPass } from '@/utils';
import { mapState } from 'vuex';

export default {
	name: 'account-infor',
	components: { NavBar },
	data() {
		return {
			updateAvatorVisivle: false,
			updateNicknameVisible: false,
			updatePhoneVisible: false,
			bindEmailVisible: false,
			updatePasswordVisible: false,
			VueCropperSet: {
				img: '',
				size: 1,
				full: false,
				outputType: 'png',
				canMove: true,
				fixedBox: true,
				original: false,
				canMoveBox: false,
				autoCrop: true,
				// 只有自动截图开启 宽度高度才生效
				autoCropWidth: 350,
				autoCropHeight: 350,
				centerBox: true,
				high: false,
				cropData: {},
				enlarge: 1,
				mode: 'cover',
				maxImgSize: 3000,
				limitMinSize: [122, 122],
				infoTrue: false,
			},
			previews: {},
			previewStyle: {},
			nickName: '',
			phone: '',
			phoneCode: '',
			phoneDisplay: false,
			email: '',
			emailCode: '',
			emailDisplay: false,
			passwordDisplay: false,
			resetPassCode: '',
			password1: '',
			password2: '',
			resetPassTips: '',
			resetEmailTips: '',
			inputEmailTips: '',
			resetPhoneTips: '',
			inputPhoneTips: '',
		};
	},
	computed: {
		...mapState(['userinfo']),
		dealPhoned() {
			return dealPhone(this.userinfo.phone) || '';
		},
	},
	created() {
		console.log(this.userinfo, 'this.userinfo');
	},
	methods: {
		// 修改昵称
		updateNicknameCancel() {
			this.nickName = '';
			this.updateNicknameVisible = false;
		},
		updateNicknameSubmit() {
			if (!this.nickName) {
				this.$refs.nickName.focus();
				return;
			}

			const data = { nickName: this.nickName };
			this.$axios
				.modifyInfo(data)
				.then(() => {
					const userinfo = this.userinfo;
					userinfo.nickName = this.nickName;
					this.updateNicknameCancel();
					this.$store.commit('setUserInfo', userinfo);
					this.$layer.msg('昵称修改成功');
				})
				.catch(() => {
					this.updateNicknameCancel();
					this.$layer.msg('昵称修改失败，请稍后再试');
				});
		},
		// 修改手机号
		updatePhoneCancel() {
			this.phone = '';
			this.phoneCode = '';
			this.resetPhoneTips = '';
			this.inputPhoneTips = '';
			this.updatePhoneVisible = false;
			this.phoneDisplay = false;
		},
		updatePhoneSubmit() {
			if (!checkPhone(this.phone)) {
				this.inputPhoneTips = '请输入正确的手机号';
				this.$refs.phone.focus();
				return;
			} else {
				this.inputPhoneTips = '';
			}

			if (this.phoneCode.length < 4) {
				this.$refs.phoneCode.focus();
				return;
			}

			const data = { phone: this.phone, code: this.phoneCode };

			console.log(data);

			this.$axios
				.modifyPhone(data)
				.then(() => {
					const userinfo = this.userinfo;
					userinfo.phone = this.phone;
					this.$store.commit('setUserInfo', userinfo);
					this.$layer.msg('手机号修改成功');
					this.updatePhoneCancel();
				})
				.catch(() => {
					this.updatePhoneCancel();
				});
		},
		// 修改手机号获取验证码
		sendVerificationPhoneCode() {
			if (this.phoneDisplay) return;
			if (!checkPhone(this.phone)) {
				this.inputPhoneTips = '请输入正确的手机号';
				return this.$refs.phone.focus();
			} else {
				this.inputPhoneTips = '';
			}

			const pramas = { phone: this.phone, type: 'modifyPhone' };

			this.$axios
				.getSmsCode(pramas)
				.then((res) => {
					console.log(res);
					this.phoneDisplay = true;
				})
				.catch((err) => {
					this.resetPhoneTips = err.message || '验证码获取失败，请稍后再试';
				});
		},
		// 修改邮箱
		updateEmailCancel() {
			this.bindEmailVisible = false;
			this.emailDisplay = false;
			this.resetEmailTips = '';
			this.inputEmailTips = '';
			this.email = '';
			this.emailCode = '';
		},
		updateEmailSubmit() {
			const emailDom = this.$refs.email;
			const emailCodeDom = this.$refs.emailCode;
			if (!checkEmail(this.email)) {
				this.inputEmailTips = '请输入正确的邮箱账号！';
				return emailDom.focus();
			} else {
				this.inputEmailTips = '';
			}
			if (this.emailCode.length < 4) return emailCodeDom.focus();

			const data = { email: this.email, code: this.emailCode };

			this.$axios
				.modifyEmail(data)
				.then((res) => {
					console.log(res);
					const userinfo = this.userinfo;
					userinfo.email = this.email;
					this.$store.commit('setUserInfo', userinfo);
					this.$layer.msg('邮箱设置成功');
					this.updateEmailCancel();
				})
				.catch(() => {
					this.$layer.msg('邮箱设置失败，请稍后再试');
					this.updateEmailCancel();
				});
		},
		// 发送邮箱验证码
		sendVerificationCode() {
			if (this.emailDisplay) return;
			if (!checkEmail(this.email)) {
				this.inputEmailTips = '请输入正确的邮箱账号！';
				return this.$refs.email.focus();
			} else {
				this.inputEmailTips = '';
			}

			const pramas = { email: this.email, type: 'modifyEmail' };

			this.$axios
				.getEmailCode(pramas)
				.then((res) => {
					this.emailDisplay = true;
					console.log(res, 'emali');
				})
				.catch((err) => {
					this.resetEmailTips = err.message || '验证码获取失败，请稍后再试';
				});
		},
		//修改密码
		updatePasswordCancel() {
			this.resetPassCode = '';
			this.password1 = '';
			this.password2 = '';
			this.updatePasswordVisible = false;
		},
		updatePasswordSubmit() {
			if (this.resetPassCode < 4) {
				this.$refs.resetPassCode.focus();
				return;
			}

			if (!checkPass(this.password1)) {
				this.$refs.password1.focus();
				return;
			}

			if (this.password1 !== this.password2) {
				this.$refs.password2.focus();
				this.resetPassTips = '两次输入的密码不一致';
				return;
			} else {
				this.resetPassTips = '';
			}

			const data = {
				phone: this.userinfo.phone,
				code: this.resetPassCode,
				newpass: this.password1,
			};

			console.log(data);

			this.$axios
				.resetPass(data)
				.then((res) => {
					console.log(res);
					this.updatePasswordCancel();
					this.$layer.msg('密码修改成功');
				})
				.catch(() => {
					this.updatePasswordCancel();
					this.$layer.msg('密码修改失败，请稍后再试');
				});
		},
		// 修改密码获取验证码
		getPasswordCode() {
			if (this.passwordDisplay) return;
			this.passwordDisplay = true;

			const pramas = {
				phone: this.userinfo.phone,
				type: 'resetPass',
			};

			this.$axios.getSmsCode(pramas).then((res) => {
				console.log(res);
			});
		},
		// 修改头像
		updateAvatorCancel() {
			this.updateAvatorVisivle = false;
			this.$refs.uploadImg.value = '';
			this.VueCropperSet.img = '';
		},
		updateAvatorSubmit() {
			// 待后端完善修改头像接口
			this.$refs.cropper.getCropBlob((data) => {
				const file = new File([data], 'avator.png');
				const formData = new FormData();
				formData.append('file', file);

				this.$axios
					.modifyAvator(formData)
					.then(({ data = {} }) => {
						// 文件上传成功，将返回的fullpath用来修改头像
						const pramas = { headPic: data.fullPath || '' };
						if (data.fullPath) return this.$axios.modifyInfo(pramas);
					})
					.then(({ data = {} }) => {
						const userinfo = this.userinfo;
						userinfo.headPic = data.headPic || '';
						this.$store.commit('setUserInfo', userinfo);
						this.updateAvatorCancel();
						this.$layer.msg('头像修改成功');
						this.updateAvatorVisivle = false;
					})
					.catch(() => {
						this.updateAvatorCancel();
						this.$layer.msg('头像修改失败，请稍后再试');
						this.updateAvatorVisivle = false;
					});
			});
		},
		uploadImg(e, num) {
			//上传图片
			// this.VueCropperSet.img
			var file = e.target.files[0];
			if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
				alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种');
				return false;
			}
			var reader = new FileReader();
			reader.onload = (e) => {
				let data = null;
				if (typeof e.target.result === 'object') {
					// 把Array Buffer转化为blob 如果是base64不需要
					data = window.URL.createObjectURL(new Blob([e.target.result]));
				} else {
					data = e.target.result;
				}
				if (num === 1) {
					this.VueCropperSet.img = data;
				} else if (num === 2) {
					this.example2.img = data;
				}
				this.$refs.uploadImg.value = '';
			};
			// 转化为base64
			// reader.readAsDataURL(file)
			// 转化为blob
			reader.readAsArrayBuffer(file);
		},
		realTime(data) {
			this.previewStyle = {
				width: data.w + 'px',
				height: data.h + 'px',
				zoom: 120 / data.w,
			};

			this.previews = data;
		},
		cropMoving(data) {
			this.VueCropperSet.cropData = data;
		},
	},
};
</script>

<style lang='scss' scoped>
.infor-item {
	padding: 9px 30px;
	border-bottom: 1px dashed var(--e9-color);
	display: flex;
	align-items: center;

	.title {
		width: 114px;
		font-size: 16px;
		font-weight: 500;
	}

	.main {
		width: 686px;
		min-height: 50px;
		display: flex;
		align-items: center;

		.img {
			width: 64px;
			height: 64px;
			border-radius: 50%;
			overflow: hidden;
		}
	}

	.btn {
		width: 63px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		border: 1px solid #d9d9d9;
		border-radius: 4px;
		color: var(--sec-color);
	}

	.btn:hover {
		color: var(--def-backdrop);
		border-color: var(--def-backdrop);
	}
}

.site-parag {
	position: relative;
	.get-code-btn {
		position: absolute;
		right: 40px;
		top: 50%;
		transform: translateY(-50%);
		cursor: pointer;
	}
}
.common-dialog-main {
	width: 533px;
}

.update-avator-dialog {
	.common-dialog-main {
		display: flex;
		// width: 500px;
		justify-content: space-between;
		padding: 24px;
		.tailoring-wrap {
			width: 350px;
			height: 350px;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			background-size: contain;
		}

		.tailoring-right {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
		}

		.preview-wrap {
			width: 120px;
			height: 120px;
			overflow: hidden;
			border-radius: 50%;
			border: 1px solid var(--e-color);
			// background-image: url('../../../assets/images/img_head.png');
			background-size: contain;
		}

		.choose-avator-btn {
			width: 130px;
			text-align: center;
			color: #bbb;
			background-color: var(--def-backdrop);
			color: var(--f-color);
			height: 46px;
			line-height: 46px;
			border-radius: 4px;
		}

		.avator-file {
			position: absolute;
			z-index: -100;
		}
	}
}
</style>
