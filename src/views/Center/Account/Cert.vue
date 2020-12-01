 <template>
	<!-- 实名认证 -->
	<div class='account-cert-wrap'>
		<NavBar class="personal-center-left"></NavBar>

		<div class="personal-center-right">
			<h5 class="personal-center-right-title">我的实名认证</h5>
			<div class="tips-wrap">
				<div class="before-icon">
					<Cicon iconClass="icon-horn"></Cicon>
				</div>
				<div class="tips-main">
					<div class="tips-title">根据海关规定，购买跨境商品需要办理清关手续，请您配合进行实名认证，以确保您购买的商品顺利通过海关检查。</div>
					<p class="tips-warring">睐思购海购承诺所传身份证明只用于办理跨境商品的清关手续，不作他途使用，其他任何人均无法查看。</p>
					<div class="tips-rule-title">实名认证规则：</div>
					<p class="tips-rule-main">购买跨境商品需填写睐思购账号注册人的真实姓名及身份证号码，部分商品下单时需提供收货人的实名信息（含身份证照片），具体请以下单时的提示为准。</p>
				</div>
			</div>

			<div v-if="1" class="cert-unauth">
				<div class="cert-unauth-img">
					<img :src="require('@/assets/images/img_cert.png')" alt="">
				</div>
				<p>您还没有实名认证哦</p>
				<div class="btn new-cert" @click="dialogVisible = true">立即认证</div>
			</div>

			<div class="cert-auth" v-if="0">
				<div class="cert-success">
					<div class="cert-info">
						<p>王小二</p>
						<p>360***********4012</p>
					</div>
				</div>
				<p class="cert-success-tips">
					<Cicon iconClass="icon-zhucechenggong"></Cicon>恭喜！您已完成实名认证
				</p>

				<div class="btn re-cert">重新认证</div>
			</div>
		</div>

		<Toast class="common-dialog-wrap" title="新增收货地址" :visible.sync="dialogVisible" @success="certSubmit" @cancel="certCancel">
			<div class="common-dialog-main">
				<div class="site-parag"><span class="must">真实姓名</span><input type="text" placeholder="请填写您的真实姓名"></div>
				<div class="site-parag"><span class="must">身份证号</span><input type="text" placeholder="请填写姓名所对应的身份证号"></div>
				<div class="site-parag"><span class="must">实名手机号</span><input type="text" placeholder="请输入姓名多对应的真实手机号"></div>
				<div class="site-parag">
					<span class="must">上传照片</span>
					<div class="upload-wrap">
						<div class="upload-content">
							<div class="upload-item front">
								<div class="preview">
									<input id="frontUpload" ref="frontUpload" type="file" accept="image/jpeg,image/png" @change="uploadCar('front',$event)">
									<img :src="frontCarFile ? frontCarFile : require('@/assets/images/card_front.png')" alt="">
									<div v-show="frontCarFile" class="upload-btns">
										<label class="re-upload" for="frontUpload">重新上传</label>
										<span @click="frontCarFile = null">删除</span>
									</div>
								</div>
								<div class="sample">
									<p>示例</p>
									<div class="sample-img">
										<img src="@/assets/images/card_front_example.png" alt="">
									</div>
								</div>
							</div>
							<div class="upload-item back">
								<div class="btn preview">
									<input id="backUpload" ref="backUpload" type="file" accept="image/jpeg,image/png" @change="uploadCar('back',$event)">
									<img :src="backCarFile ? backCarFile : require('@/assets/images/card_back.png')" alt="">
									<div v-show="backCarFile" class="upload-btns">
										<label class="re-upload" for="backUpload">重新上传</label>
										<span @click="backCarFile = null">删除</span>
									</div>
								</div>
								<div class="sample">
									<p>示例</p>
									<div class="sample-img">
										<img src="@/assets/images/card_back_example.png" alt="">
									</div>
								</div>
							</div>
						</div>

						<div class="upload-tips">
							<div>注：</div>
							<div>
								1.需上传清晰的身份证正面、反面共2张照片<br />
								2.大小不超过5MB，支持jpg、jpeg、png格式
							</div>
						</div>
					</div>
				</div>
			</div>
		</Toast>
	</div>
</template>

<script>
import NavBar from '../components/NavBar';
import { preview } from '@/utils';

export default {
	name: 'account-cert',
	components: { NavBar },
	data() {
		return {
			dialogVisible: false,
			frontCarFile: null,
			backCarFile: null,
		};
	},
	methods: {
		uploadCar(v, e) {
			const file = e.target.files[0];
			if (!file) return;
			const previewFile = preview(file);
			if (v === 'front') {
				this.frontCarFile = previewFile;
			} else {
				this.backCarFile = previewFile;
			}
		},
		certSubmit() {
			this.dialogVisible = false;
		},
		certCancel() {
			this.dialogVisible = false;
		},
	},
};
</script>

<style lang='scss' scoped>
.tips-wrap {
	height: 134px;
	background-color: #fffbe6;
	border: 1px solid #ffe58f;
	display: flex;
	padding: 16px 30px 0 25px;
}

.before-icon i {
	color: #faad14;
	font-size: 23px;
}
.tips-main {
	flex: 1;
	padding-left: 16px;
}

.tips-title,
.tips-rule-title {
	font-size: 16px;
	line-height: 24px;
	font-weight: 500;
}

.tips-warring {
	color: #f5222d;
	font-size: 12px;
	margin: 2px 0 12px 0;
}

.tips-rule-main {
	margin-top: 2px;
	color: var(--sec-color);
	line-height: 22px;
}

.cert-unauth,
.cert-auth {
	display: flex;
	flex-direction: column;
	align-items: center;
	.cert-unauth-img {
		width: 500px;
		height: 300px;
	}

	& > p {
		color: #b8b8b8;
		font-size: 12px;
		margin: 10px 0 30px 0;
	}
}

.cert-success {
	width: 310px;
	height: 160px;
	background-color: lightblue;
	margin-top: 40px;
	background-image: url('../../../assets/images/cert_suc.png');
	background-size: contain;
	background-position: center;
	position: relative;
}

.cert-info {
	position: absolute;
	bottom: 24px;
	left: 22px;
	p {
		color: var(--f-color);
		margin-top: 10px;
	}
}

p.cert-success-tips {
	color: #52c41a;
	margin: 20px 0 30px 0;
	i {
		font-size: 12px;
		padding-right: 4px;
	}
}

.new-cert,
.re-cert {
	background-color: var(--def-backdrop);
	border-radius: 4px;
	color: var(--f-color);
	padding: 0 14px;
	height: 30px;
	line-height: 30px;
}

.upload-content {
	display: flex;

	.upload-item.front {
		margin-right: 20px;
	}

	.preview {
		width: 160px;
		height: 100px;
		// border: 1px dashed var(--e-color);
		border-radius: 4px;
		position: relative;
		overflow: hidden;

		input {
			position: absolute;
			width: 100%;
			height: 100%;
			opacity: 0;
		}

		img {
			pointer-events: none;
		}
	}

	.upload-btns {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 26px;
		line-height: 26px;
		background-color: rgba(0, 0, 0, 0.4);
		display: flex;
		padding: 0 24px;
		box-sizing: border-box;
		justify-content: space-between;
		opacity: 0;
		transition: all 0.2s;

		span,
		label {
			color: var(--f-color);
			font-size: 12px;
			cursor: pointer;
		}
	}

	.preview:hover .upload-btns {
		opacity: 1;
	}

	.sample {
		display: flex;
		flex-direction: column;
		align-items: center;
		p {
			color: var(--thir-color);
			margin: 10px 0 4px 0;
			font-size: 12px;
		}

		.sample-img {
			width: 58px;
			height: 36px;
			background-color: var(--e-color);
		}
	}
}
.upload-tips {
	display: flex;
	margin-top: 20px;
	color: #b8b8b8;
	font-size: 12px;
	line-height: 18px;
}

.common-dialog-main {
	width: 500px;
}
</style>
