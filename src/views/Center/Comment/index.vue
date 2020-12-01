 <template>
	<!-- 评价中心 -->
	<div class='comment-center-wrap'>
		<NavBar class="personal-center-left"></NavBar>

		<div class="personal-center-right">
			<div class="personal-center-right-title">评价中心</div>
			<div class="comment-center-content">
				<TabBar :model="tabBarCollen" :current.sync="currentBar" @submit="switchType"></TabBar>

				<div class="comment-list-wrap">
					<div class="comment-item-wrap" v-for="(item,index) in commentList" :key="index">
						<div class="comment-item-title"><span>商品</span><span>操作</span></div>
						<div class="comment-item-main">
							<div class="comment-main__img">
								<img :src="item.thumbUrl" alt="">
							</div>
							<div class="comment-main__main">
								<div class="title">{{item.name}}</div>
								<div class="specif">{{item.itemName}}</div>
							</div>
							<div class="comment-main__control">
								<span class="def btn" v-if="commentType === '8'" @click="nowPushComment(item)">立即评论</span>
								<span class="def btn" v-if="commentType === '10'" @click="lookCommentHandle(item)">查看评论</span>
							</div>
						</div>
					</div>
				</div>

				<NoData v-if="!commentList.length">暂无相关内容</NoData>

				<div class="pagination-wrap" v-if="commentList.length">
					<el-pagination background layout="prev, pager, next" :total="paginationTotal" prev-text="上一页" next-text="下一页" :current-page.sync="currentPage" @current-change="currentClick" />
				</div>

				<Toast :visible.sync="pushCommentVisible" title="商品评价" @success="pushCommentSubmit">
					<div class="push-comment-toast-wrap">
						<div class="comment-info-wrap">
							<div class="info-img">
								<img :src="checkedInfo.thumbUrl" alt="">
							</div>
							<div class="info-title">
								<div>{{checkedInfo.name}}</div>
								<p>{{checkedInfo.itemName}}</p>
							</div>
						</div>
						<div class="comment-star">
							商品与描述相符 <Cicon class="icon-xingxing" :class="{active:index < pushCommentScore}" v-for="(item,index) in 5" :key="item" @click.native="pushCommentStar(item)"></Cicon>
						</div>
						<div class="comment-text-wrap">
							<textarea class="comment-textarea" maxlength="250" v-model.trim="textareaText" placeholder="请填写评价内容"></textarea>
							<span class="comment-sum">{{mapTextareaTextLen}}/250</span>
						</div>
						<div class="comment-upload-wrap">
							<label v-show="previewList.length !== 8">
								<input ref="uploadFileRef" type="file" multiple accept="image/png, image/jpeg, image/gif, image/jpg" @change="afterUpload($event)">
								<p class="upload-icon"><i class="el-icon-camera"></i></p>
								<p class="txt">上传图片</p>
							</label>
							<!-- <label>
								<input type="file" accept="video/*">
								<p class="upload-icon"><i class="el-icon-video-camera"></i></p>
								<p class="txt">上传视频</p>
							</label> -->

							<div class="push-preview-item" v-for="(item,index) in previewList" :key="index" v-loading="item.state === 'load'">
								<template v-if="item.state !== 'load' && item.state !== 'error'">
									<img :src="item.state " alt="">
								</template>
								<div v-if="item.state  == 'error'" class="re-upload" @click="uploadFile(item.file,index)"><span>上传失败</span><span>重新上传</span></div>
								<div class="del-btn btn" @click.stop="delPreview(index)"><i class="el-icon-close"></i></div>
							</div>
						</div>
					</div>
				</Toast>

				<!-- 查看评论 -->
				<Toast :visible.sync="lookCommentVisible" title="查看评价">
					<div class="look-comment-toast-wrap custom-scroll-bars" v-loading="lookLoading">
						<div class="comment-info-wrap" ref="lookComment">
							<div class="info-img">
								<img :src="lookCheckInfo.thumbUrl" alt="">
							</div>
							<div class="info-title">
								<div>{{lookCheckInfo.name}}</div>
								<p>{{lookCheckInfo.itemName}}</p>
							</div>
						</div>

						<div class="look-comment-list-wrap custom-scroll-bars">
							<div class="comment-item">
								<div class="head">
									<span class="star">评价内容<Cicon :class="['icon-xingxing',{active:idx < lookCommentInfo.reviewScore}]" v-for="(nape,idx) in 5" :key="idx"></Cicon>
									</span>
									<span class="time">{{lookCommentInfo.timeCreated | dealTime(true)}}</span>
								</div>
								<div class="text">{{lookCommentInfo.reviewContent}}</div>

								<div class="preview-list">
									<div class="preview-item" v-for="(na,i) in lookCommentInfo.images" :key="i">
										<img :src="na" alt="">
									</div>
								</div>
							</div>

							<!-- 追加的评论 -->
							<div class="comment-item" v-for="(item,index) in lookCommentInfo.arr" :key="index">
								<div class="head">
									<span class="star">追加评论</span>
									<span class="time">{{lookCommentInfo.timeCreated | dealTime(true)}}</span>
								</div>
								<div class="text">{{lookCommentInfo.reviewContent}}</div>

								<div class="preview-list">
									<div class="preview-item" v-for="(na,i) in lookCommentInfo.images" :key="i">
										<img :src="na" alt="">
									</div>
								</div>
							</div>
						</div>
					</div>

					<div slot="footer"></div>
				</Toast>
			</div>
		</div>
	</div>
</template>

<script>
import NavBar from '../components/NavBar';
import TabBar from '../components/TabBar';
import { getRandom } from '@/utils';

export default {
	name: 'comment-center',
	components: { NavBar, TabBar },
	data() {
		return {
			paginationTotal: 20,
			currentPage: 1,
			pushCommentVisible: false,
			textareaText: '',
			lookCommentVisible: false,
			pushCommentScore: 5,
			tabBarCollen: [
				{ title: '待评价', type: '8' },
				{ title: '已评价', type: '10' },
			],
			currentBar: 0,
			commentType: '8',
			commentList: [],
			checkedInfo: {},
			previewList: [],
			productPage: 1,
			lookCommentInfo: [],
			lookCheckInfo: {},
			lookLoading: true,
			uploadRandomKey: '',
		};
	},
	computed: {
		mapTextareaTextLen() {
			return this.textareaText.length;
		},
	},
	created() {
		this.getCommentList();
	},
	methods: {
		getCommentList() {
			const params = {
				page: this.currentPage,
				size: 10,
				type: this.commentType,
			};
			this.$axios
				.getCommentCenterList(params)
				.then(({ data = {} }) => {
					this.commentList = data.list;
					this.paginationTotal = data.total;
				})
				.catch((err) => {
					console.log(err);
				});
		},
		switchType(v) {
			// 不填：全部订单; 0: 未支付; 1: 待发货; 2: 待收货; 3: 已完成; 4: 已退货; 5: 申请退换货; 6: 正在退换货; 7: 已取消; 8: 待评价; 9: 已退款; 10: 已评价
			this.currentPage = 1;
			this.commentList = [];
			this.commentType = v.type;
			this.getCommentList();
			console.log(v.type);
		},
		currentClick() {
			console.log(1);
		},
		pushCommentStar(index) {
			if (this.pushCommentScore === index) return;
			this.pushCommentScore = index;
		},
		lookCommentHandle(item) {
			this.lookCommentVisible = true;
			if (this.lookCheckInfo.itemId !== item.itemId) {
				this.lookCheckInfo = item;
				this.lookCommentInfo = {};
				this.getProductCommentList();
			}
		},
		nowPushComment(item) {
			if (this.checkedInfo.itemId !== item.itemId) {
				this.clearFrom();
				this.uploadRandomKey = getRandom();
			}
			this.checkedInfo = item;
			this.pushCommentVisible = true;
		},
		pushCommentSubmit() {
			const { orderId, itemId } = this.checkedInfo;
			const {
				pushCommentScore,
				textareaText,
				previewList,
				uploadRandomKey,
			} = this;

			if (!pushCommentScore) {
				this.$layer.msg('请选择评价星级！');
				return;
			}

			if (!textareaText) {
				this.$layer.msg('说几句分享给大家吧(ø_ø)');
				return;
			}

			const previewFilterColle =
				previewList.filter(
					({ state }) => state && state !== 'load' && state !== 'error'
				) || [];

			if (previewFilterColle.length !== previewList.length) {
				this.$layer.msg('你有未上传成功的图片哦 o(╥﹏╥)o');
				return;
			}

			const mapPreArr = previewList.map((e) => e.state);

			const body = {
				orderId,
				itemId,
				reviewScore: pushCommentScore,
				reviewContent: textareaText,
				images: mapPreArr,
				uploadSession: uploadRandomKey,
			};

			this.$axios
				.pushComment(body)
				.then((res) => {
					console.log(res, 'pushComment res');
					this.pushCommentVisible = false;
					this.getCommentList();
					this.clearFrom();
				})
				.catch((err) => {
					this.pushCommentVisible = false;
					this.clearFrom();
					this.$layer.msg('评论失败，请稍后再试');
					console.log(err, 'pushComment err');
				});
		},
		// 图片上传
		afterUpload(e) {
			const { files } = e.target;
			const arr = Array.from(files).map((file) => ({ file, state: 'load' }));
			const list = [...arr, ...this.previewList];

			if (list.length > 8) {
				this.$layer.msg('最多只能上传8张哦！');
				return;
			}
			this.previewList = list;

			files.forEach((file, i) => this.uploadFile(file, i));

			this.$refs.uploadFileRef.value = '';
		},
		delPreview(i) {
			this.previewList.splice(i, 1);
		},
		// 图片上传
		uploadFile(file, index) {
			const formData = new FormData();
			formData.append('file', file);
			formData.append('uploadSession', this.uploadRandomKey);

			this.$axios
				.uploadFile(formData)
				.then(({ data = {} }) => {
					const { fullPath = '' } = data;
					this.$set(this.previewList, index, { file, state: fullPath });
				})
				.catch((err) => {
					console.log(err);
					this.$set(this.previewList, index, { file, state: 'error' });
				});
		},
		// 获取商品评论
		getProductCommentList() {
			const { orderId, itemId } = this.lookCheckInfo;

			this.$axios
				.getCommentInfo(orderId, itemId)
				.then(({ data = {} }) => {
					this.lookLoading = false;
					this.lookCommentInfo = data;
				})
				.catch((err) => {
					this.lookLoading = false;
					console.log(err);
				});
		},
		clearFrom() {
			this.previewList = [];
			this.textareaText = '';
			this.pushCommentScore = 5;
		},
	},
};
</script>

<style lang='scss' scoped>
@import '@/styles/var.scss';

.personal-center-right-title {
	border-color: var(--f-color);
}

.comment-list-wrap {
	margin-top: 5px;
}

.comment-item-wrap {
	border: 1px solid var(--e9-color);
	margin-top: 20px;
	width: 100%;
	overflow: hidden;
	.comment-item-title {
		display: flex;
		justify-content: space-between;
		background-color: #f6f6f6;
		border-bottom: 1px solid var(--e9-color);

		span {
			width: 120px;
			height: 30px;
			line-height: 30px;
			text-align: center;
			color: var(--sec-color);
		}
	}
}

.comment-item-main {
	display: flex;
	padding: 10px 0;
	.comment-main__img {
		width: 100px;
		height: 100px;
		margin-left: 10px;
	}

	.comment-main__main {
		flex: 1;
		padding: 10px 20px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.title {
			@include mut-ellipsis();
		}

		.specif {
			color: var(--thir-color);
			font-size: 12px;
		}
	}

	.comment-main__control {
		width: 120px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		.def {
			display: block;
			padding: 0 10px;
			height: 30px;
			line-height: 30px;
			background-color: var(--def-backdrop);
			color: var(--f-color);
			margin-bottom: 10px;
		}
	}
}

.look-comment-toast-wrap,
.push-comment-toast-wrap {
	width: 647px;
	padding: 20px 24px 0 24px;
	text-align: left;
	margin-bottom: 20px;
}

.look-comment-toast-wrap {
	min-height: 350px;
	max-height: 530px;
	overflow-x: hidden;
	overflow-y: scroll;
}

.comment-info-wrap {
	display: flex;
	padding-bottom: 20px;
	justify-content: space-between;
	border-bottom: 1px solid var(--e9-color);

	.info-img {
		width: 100px;
		height: 100px;
	}

	.info-title {
		width: 532px;
		padding: 10px 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		div {
			@include mut-ellipsis();
			line-height: 20px;
		}

		p {
			color: var(--thir-color);
			font-size: 12px;
		}
	}
}

.comment-star {
	height: 34px;
	line-height: 34px;
	margin-top: 10px;

	i.iconfont {
		color: #e4e4e4;
		margin-left: 8px;
		cursor: pointer;
	}

	i.iconfont.active {
		color: var(--def-backdrop);
	}
}

.comment-text-wrap {
	position: relative;
	.comment-textarea {
		background-color: #f9fafb;
		padding: 10px;
		box-sizing: border-box;
		width: 100%;
		height: 130px;
		border: 1px solid #ecedee;
		border-radius: 4px;
		resize: none;
		line-height: 18px;
	}

	.comment-sum {
		position: absolute;
		right: 10px;
		bottom: 6px;
		color: var(--thir-color);
	}
}

.comment-upload-wrap {
	display: flex;
	color: #ebebeb;
	margin-top: 10px;
	label {
		width: 72px;
		height: 72px;
		border: 1px dashed #d5d6d7;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 4px;
		margin-right: 10px;
		cursor: pointer;
		box-sizing: border-box;
	}

	input {
		display: none;
	}

	.upload-icon {
		font-size: 30px;
	}
	.text {
		font-size: 12px;
	}
}

.push-preview-item {
	width: 72px;
	height: 72px;
	box-sizing: border-box;
	border: 1px solid #d5d6d7;
	border-radius: 4px;
	position: relative;
	.del-btn {
		position: absolute;
		right: 0;
		top: 0;
		width: 12px;
		height: 16px;
		padding-left: 4px;
		border-radius: 0 0 0 16px;
		line-height: 13px;
		font-size: 12px;
		text-align: center;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.re-upload {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: #4c4c4c;
		color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 12px;
		& > span + span {
			margin-top: 4px;
		}
	}
}

.comment-upload-wrap .push-preview-item + .push-preview-item {
	margin-left: 10px;
}

.look-comment-list-wrap {
	width: 100%;
	overflow: hidden;
	.comment-item {
		padding-bottom: 14px;
		.head {
			display: flex;
			justify-content: space-between;
			height: 34px;
			line-height: 34px;
			margin-top: 10px;
			i.iconfont {
				color: #e4e4e4;
				margin-left: 8px;
			}

			i.iconfont.active {
				color: var(--def-backdrop);
			}

			.time {
				color: var(--thir-color);
			}
		}

		.text {
			line-height: 22px;
		}
	}

	.comment-item + .comment-item {
		border-bottom: 1px dashed var(--e9-color);
	}
}

.preview-list {
	// margin-top: 10px;
	overflow: hidden;
	width: 690px;
	.preview-item {
		width: 100px;
		height: 100px;
		border-radius: 4px;
		overflow: hidden;
		float: left;
		margin-right: 37px;
		margin-top: 10px;
	}
}
</style>
