 <template>
	<!-- 发表评论模块 -->
	<div class="comment-wrap">
		<div class="comment-type-select">
			<label class="label-wrap">
				<el-radio v-model="commentType" label="0" @change="getTypeCommentList">全部（{{allTatol}}）</el-radio>
			</label>
			<label class="label-wrap">
				<el-radio v-model="commentType" label="1" @change="getTypeCommentList">有图（{{figureNum}}）</el-radio>
			</label>
			<label class="label-wrap">
				<el-radio v-model="commentType" label="2" @change="getTypeCommentList">有追评（{{reviewNum}}）</el-radio>
			</label>
		</div>

		<!--单条评论 -->
		<div class="comment-list-wrap">
			<Comment v-for="(item,index) in commentImagesList" :key="index" :model="item" />
		</div>

		<div class="no-comment" v-if="!commentImagesList.length">当前暂无评价</div>

		<div class="pagination-wrap" v-if="commentImagesList.length">
			<el-pagination background layout="prev, pager, next" :total="paginationTotal" prev-text="上一页" next-text="下一页" :current-page.sync="currentPage" @current-change="currentClick" />
		</div>

	</div>
</template>

<script>
import Comment from '@/views/components/Comment';
import { scrollToView } from '@/utils';

export default {
	name: 'CommentList',
	components: { Comment },
	data() {
		return {
			commentType: '0', //0 全部 1 有图 2 追加评论
			commentImagesList: [],
			figureNum: 0,
			reviewNum: 0,
			currentPage: 1,
			allTatol: 0,
			pageSize: 10,
			paginationTotal: 0,
		};
	},
	watch: {
		'$route.params.id': {
			handler() {
				this.getCommentList();
			},
			immediate: true,
		},
	},
	methods: {
		getCommentList() {
			const { id } = this.$route.params;
			const params = {
				productId: id,
				size: this.pageSize,
				page: this.currentPage,
				type: this.commentType,
			};
			this.$axios
				.getCommentList(params)
				.then(
					({
						data: {
							list = [],
							extra: { total = 0, hasImagesTotal = 0, hasAdditionalTotal = 0 },
						},
					}) => {
						this.commentImagesList = list;
						this.allTatol = total;
						this.figureNum = hasImagesTotal;
						this.reviewNum = hasAdditionalTotal;

						if (this.commentType === '0') {
							this.paginationTotal = total;
						} else if (this.commentType === '1') {
							this.paginationTotal = hasImagesTotal;
						} else if (this.commentType === '2') {
							this.paginationTotal = hasAdditionalTotal;
						} else {
							this.paginationTotal = 0;
						}
					}
				)
				.catch(() => {
					this.commentImagesList = [];
				});
		},
		// 分页
		currentClick() {
			scrollToView('.comment-wrap');
			this.getCommentList();
		},
		publishedComment() {
			// this.loading();
		},
		getTypeCommentList() {
			this.currentPage = 1;
			this.getCommentList();
		},
	},
};
</script>

<style lang='scss' scoped>
.comment-wrap {
	width: 100%;
}

.comment-type-select {
	height: 38px;
	display: flex;
	align-items: center;
	padding-left: 20px;
	background-color: #f5f5f5;
	border: 1px solid var(--cb-color);
	border-bottom: none;
	border-top: none;

	.label-wrap {
		display: flex;
		align-items: center;
		padding-right: 50px;
		input {
			margin-right: 5px;
		}
	}
}
.comment-list-wrap {
	width: 100%;
	border: 1px solid var(--cb-color);
	border-top: none;
	box-sizing: border-box;
}

.no-comment {
	height: 50px;
	line-height: 50px;
	text-align: center;
	color: var(--c-color);
	border: 1px solid var(--cb-color);
}
</style>
