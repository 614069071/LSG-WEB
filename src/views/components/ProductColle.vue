 <template>
	<!-- 酒店旅游类列表 -->
	<section class="recom-item-wrap btn inner">
		<div class="recom-item-tab" :style="{backgroundColor:1 ?'#90ACF5':'#16C1BC'}">
			<div class="tab-list">
				<p class="title">{{model.title || '推荐'}}</p>
				<div class="tab-item-list">
					<span :class="{active:recomIndex === index}" v-for="(item,index) in ['三亚','海口','深圳','广州']" :key="index" @click="changeRocom(index)">{{item}}</span>
				</div>
			</div>

			<div class="tab-item-all">
				<div class="after">
					<span class="page-display"><i>{{currentPag}}</i> / {{allPag}} </span>
					<span class="btn" @click="pagingToggle('left')"><i class="el-icon-arrow-left"></i></span>
					<span class="btn" @click="pagingToggle('right')"><i class="el-icon-arrow-right"></i></span>
				</div>
			</div>
		</div>

		<div class="recom-class-list">
			<Product class="hotel-class-item" v-for="(item,index) in model.list" :key="index" :model="item"></Product>
		</div>
	</section>
</template>

<script>
export default {
	name: 'ProductColle',
	props: {
		model: {
			type: Object,
			default: () => ({
				title: '推荐',
				list: [],
				tab: [],
			}),
		},
	},
	data() {
		return {
			recomIndex: 0,
			currentPag: 1,
			allPag: 5,
		};
	},
	methods: {
		changeRocom(i) {
			this.recomIndex = i;
		},
		pagingToggle(dir) {
			if (dir === 'left') {
				if (this.currentPag <= 1) return;
				this.currentPag--;
			} else {
				if (this.currentPag >= this.allPag) return;
				this.currentPag++;
			}
			// this.getProductList();
		},
	},
};
</script>

<style lang='scss' scoped>
@import '@/styles/var.scss';

.recom-item-wrap {
	margin-top: 20px;
	border-radius: 10px;
	overflow: hidden;
	color: var(--f-color);

	.recom-item-tab {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
}
.tab-list {
	display: flex;
	align-items: baseline;
	.title {
		font-size: 20px;
		padding: 0 20px;
	}

	.tab-item-list {
		margin-left: 20px;
		display: flex;
		span {
			height: 52px;
			line-height: 52px;
			padding: 0 10px;
			font-size: 16px;
			position: relative;
			cursor: pointer;

			&.active::before {
				@include arrow(bottom, 8px, white);
				content: '';
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
			}
		}
	}
}

.tab-item-all {
	margin-right: 17px;
}

.recom-class-list {
	padding: 17px 0 3px 17px;
	background-color: var(--f-color);
	.hotel-class-item {
		margin: 0 18px 6px 0;
	}
}

.tab-item-all {
	.after {
		display: flex;
		align-items: center;
		.page-display {
			i {
				// color: var(--def-backdrop);
				color: #16e2dc;
			}
		}

		.btn {
			width: 16px;
			height: 16px;
		}
	}
}
</style>