 <template>
	<div class='guide-wrap'>
		<HeadBar></HeadBar>
		<!-- 搜索购物车 -->
		<header class="all-header">
			<div class="all-header-main inner">
				<Logo></Logo>
				<SearchCart></SearchCart>
			</div>
		</header>
		<!-- 导航栏 -->
		<SideNav default-status line></SideNav>

		<div class="guide-main inner">
			<div class="guide-nav-list">
				<div class="guide-item" v-for="(item,index) in mapNavColle" :key="index">
					<div class="guide-item-title btn" ref="el" @click="collspanMenu($refs.el[index])">{{item.title}} <i class="el-icon-arrow-down"></i></div>
					<div class="guide-item-content">
						<router-link :to="`/guide/${nape.url}`" class="guide-item-link" v-for="(nape,idx) in item.list" :key="idx">{{nape.title}}</router-link>
					</div>
				</div>
			</div>

			<div class="guide-content">
				<div class="guide-content-title">{{mapGuideContext.title}}</div>

				<!-- <div class="guide-content-main" v-html="mapGuideContext.context"> -->
				<div class="guide-content-main" v-if="mapGuideContext.type === '17'">
					<div class="feedback-wrap">
						<div class="feedback-item">
							<span class="feedback-item-title">反馈类型</span>
							<el-select v-model="feedbackType" size="medium">
								<el-option label="问题反馈" value="0"></el-option>
								<el-option label="我要投诉" value="1"></el-option>
								<el-option label="修改意见" value="2"></el-option>
							</el-select>
						</div>

						<div class="feedback-item">
							<span class="feedback-item-title">反馈内容</span>
							<div class="feedback-context">
								<textarea placeholder="请输入您的宝贵意见" maxlength="300" v-model="feedbackContent"></textarea>
								<span class="feedback-context-len">{{mapFeedbackContent}} / 300</span>
							</div>
						</div>

						<div class="feedback-item">
							<span class="feedback-item-title"></span>
							<div class="feedback-context">
								<span class="btn btn-submit">提交反馈</span>
							</div>
						</div>
					</div>
				</div>

				<div v-else class="guide-content-main" v-html="mapGuideContext.context"></div>

			</div>
		</div>

		<SideFooter></SideFooter>
		<Information></Information>
	</div>
</template>

<script>
import guide from 'lib/guide';
import guideContext from 'lib/guideContext';

export default {
	name: 'Guide',
	data() {
		return {
			feedbackType: '0',
			feedbackContent: '',
		};
	},
	computed: {
		mapNavColle() {
			return Object.freeze(guide);
		},
		mapGuideContext() {
			const { type = '0' } = this.$route.params;
			if (type === '17') {
				return guideContext[0];
			}
			return guideContext.find((e) => e.type == type) || guideContext[0];
		},
		mapFeedbackContent() {
			return this.feedbackContent.length;
		},
	},
	methods: {
		collspanMenu(el) {
			el.classList.toggle('active');
		},
	},
};
</script>

<style lang='scss' scoped>
.guide-wrap {
	background-color: var(--f-color);
	min-height: 100vh;
}

.guide-main {
	padding: 26px 0;
	display: flex;
	justify-content: space-between;
}

.guide-nav-list {
	width: 140px;
	height: 100%;
	border: 1px solid var(--d-color);
	border-bottom: 0;
}

.guide-content {
	width: 927px;
}

.guide-item {
	.guide-item-title {
		height: 36px;
		padding: 0 17px 0 24px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid var(--d-color);
	}

	.guide-item-content {
		padding: 8px 0 8px 24px;
		border-bottom: 1px solid var(--d-color);

		a {
			display: block;
			height: 26px;
			line-height: 26px;
			color: var(--sec-color);
			cursor: pointer;
			&:hover {
				color: var(--def-backdrop);
			}
		}
		a.router-link-active {
			color: var(--def-backdrop);
		}
	}

	.guide-item-title.active {
		& > i {
			transform: rotate(180deg);
		}
		& + .guide-item-content {
			display: none;
		}
	}
}

.guide-content-title {
	height: 50px;
	line-height: 50px;
	font-size: 18px;
	border-bottom: 1px solid var(--e9-color);
}

.feedback-item {
	padding-top: 20px;
	display: flex;
	.feedback-item-title {
		width: 76px;
		margin-top: 9px;
	}
}
.feedback-context {
	flex: 1;
	position: relative;
	textarea {
		width: 100%;
		height: 130px;
		resize: none;
		border-radius: 4px;
		background: #f9fafb;
		border: 1px solid #ecedee;
		padding: 12px 10px;
		box-sizing: border-box;
	}

	.feedback-context-len {
		position: absolute;
		right: 5px;
		bottom: 10px;
		color: var(--thir-color);
		font-size: 12px;
	}

	.btn-submit {
		height: 32px;
		line-height: 32px;
		padding: 0 16px;
		display: inline-block;
		background-color: var(--def-backdrop);
		color: var(--f-color);
		border-radius: 3px;
	}
}
</style>

<style lang="scss">
.guide-content-main {
	padding-top: 20px;
	p {
		line-height: 30px;
	}
	a {
		text-decoration: underline;
	}
	a:hover {
		color: var(--def-backdrop) !important;
	}
}
</style>
