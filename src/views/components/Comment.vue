 <template>
	<!-- 单个评论 -->
	<div class="comment-item">
		<div class="comment-title">
			<div class="avatar-img">
				<img :src="model.headPic || require('@/assets/images/avator.png')" alt="">
			</div>

			<div class="comment-title-des">
				<div class="left">
					<!-- <span class="comment-goods">颜色:#CHILI 辣椒红<i>{{mapCreateTime}}</i></span> -->
					<div class="comment-name-star">
						<p class="comment-goods">{{model.userDisplayName}}</p>
						<div class="star">
							<Cicon :class="{active: item <= model.reviewScore}" iconClass="icon-star" v-for="item in 5" :key="item"></Cicon>
						</div>
					</div>
					<p class="comment-goods">{{model.itemName}}<i>{{mapCreateTime}}</i></p>
				</div>

				<div class="right-zan btn" @click="likeClick">
					<Cicon v-show="0" iconClass="icon-dianzan"></Cicon>
					<Cicon v-show="1" iconClass="icon-dianzan1"></Cicon>{{model.likesNum}}
				</div>
			</div>
		</div>

		<div class="comment-main">
			<p class="comment-des">{{model.reviewContent}}</p>

			<div class="comment-exhibition-list">
				<div :class="{active:currentIndex === index}" class="comment-exhibition-item" v-for="(item,index) in (model.images || [])" :key="index" @click="previewImageHandle(index)">
					<img v-lazy="item" alt="">
				</div>
			</div>

			<div class="comment-exhibition-item-preview" v-if="(model.images || []).length">
				<img v-show="previewShow" :src="model.images[currentIndex]" alt="">
			</div>
		</div>
	</div>
</template>

<script>
import { formatTime } from '@/utils';

export default {
	name: 'Comment',
	props: {
		model: {
			type: Object,
			default: () => ({}),
		},
	},
	data() {
		return {
			currentIndex: '',
			previewShow: false,
		};
	},
	computed: {
		mapCreateTime() {
			const time = this.model.timeCreated && new Date(this.model.timeCreated);
			return time ? formatTime(time) : '';
		},
	},
	methods: {
		previewImageHandle(i) {
			if (this.currentIndex === i) {
				this.previewShow = !this.previewShow;
				this.currentIndex = '';
			} else {
				this.previewShow = true;
				this.currentIndex = i;
			}
		},
		likeClick() {
			console.log(this.model);
		},
	},
};
</script>

<style lang='scss' scoped>
div > .comment-item:last-child .comment-main {
	border: 0;
}
.comment-item {
	border-top: none;
	padding: 30px 20px 0 20px;

	.comment-title {
		display: flex;
		align-items: center;

		.avatar-img {
			width: 60px;
			height: 60px;
			border-radius: 50%;
			background-color: var(--d-color);
			margin-right: 20px;
			overflow: hidden;
		}
		.comment-title-des {
			flex: 1;
			display: flex;
			justify-content: space-between;

			.left {
				display: flex;
				height: 60px;
				flex-direction: column;
				justify-content: space-around;
			}

			.comment-name-star {
				display: flex;
			}

			// .comment-name-star p {
			// 	width: 100px;
			// }

			.star {
				margin-left: 20px;
				.iconfont {
					margin-right: 2px;
					color: var(--thir-color);
					&.active {
						color: var(--def-backdrop);
					}
				}
			}

			.comment-goods {
				color: var(--thir-color);
				// padding-left: 20px;
				i {
					padding-left: 20px;
				}
			}

			.right-zan {
				height: 26px;
				line-height: 26px;
				padding: 0 10px;
				border-radius: 16px;
				border: 1px solid var(--ed-color);
				color: var(--thir-color);
			}

			.right-zan:hover .iconfont,
			.right-zan.active .iconfont {
				color: var(--def-backdrop);
			}
		}
	}

	.comment-main {
		padding-left: 80px;
		border-bottom: 1px dashed var(--e9-color);

		.comment-des {
			line-height: 20px;
			margin-bottom: 20px;
		}

		.comment-exhibition-list {
			.comment-exhibition-item {
				display: inline-block;
				width: 100px;
				height: 100px;
				margin-right: 24px;
				box-sizing: border-box;
				background-size: cover;
				background-position: center;
				background-repeat: no-repeat;
				border: 2px solid var(--f-color);
				border-radius: 6px;
				overflow: hidden;
			}

			.comment-exhibition-item:nth-of-type(6n) {
				margin-right: 0;
			}

			.comment-exhibition-item.active {
				border: 2px solid var(--def-backdrop);
			}
		}

		.comment-exhibition-item-preview {
			max-width: 400px;
			max-height: 400px;
			margin-top: 20px;
			margin-bottom: 20px;
			border-radius: 6px;
			overflow: hidden;
			img {
				max-width: 400px;
				max-height: 400px;
				display: block;
			}
		}
	}
}
</style>