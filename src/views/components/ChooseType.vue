 <template>
	<!-- 筛选功能组件 -->
	<div v-if="Object.keys(model).length" class="choose-type-item">
		<div class="title">{{model.title}}</div>

		<div class="type-main-wrap">
			<div class="type-main-inner">
				<div v-show="isMulti || isCollapse" class="filtrate-type-wrap" @click="changeType($event)">
					<span :class="{active:currentChangeType === 'all'}" data-id="all">全部</span>
					<span :class="{active:currentChangeType === item}" :data-id="item" v-for="(item,index) in filtrateTypeList" :key="index">{{item}}</span>
					<span :class="{active:currentChangeType === 'other'}" data-id="other">其它</span>
				</div>

				<div class="filtrate-type-list">
					<div ref="filtrateTypeList" :class="{active:isCollapse}" class="filtrate-type-list-inner custom-scroll-bars" @click="multiSelectChange($event)">
						<!-- 产品数据props传递 -->
						<span :class="{active:filtrateList.some(e => e == index)}" :data-id="index" v-for="(item,index) in model.list" :key="index">{{item}}</span>
					</div>
				</div>

				<div v-show="isMulti" class="multi-btns"><span class="multi-submit" @click="multiSubmit">确定</span><span @click="multiCancel" class="multi-cancel">取消</span></div>
			</div>
		</div>

		<div class="control-btns">
			<div class="multi" v-show="!isMulti" @click="multiChange">多选 <i class="el-icon-plus"></i></div>
			<div class="collapse" v-show="!isMulti" @click="collapseChange">展开 <i class="el-icon-arrow-down" :class="{active:isCollapse}"></i></div>
		</div>
	</div>
</template>

<script>
const filtrateTypeStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const filtrateType = Object.freeze(filtrateTypeStr);

export default {
	name: 'ChooseType',
	props: {
		model: {
			type: Object,
			default: () => ({}),
		},
	},
	data() {
		return {
			filtrateTypeList: filtrateType,
			currentChangeType: 'all',
			filtrateList: [],
			isCollapse: false,
			isMulti: false,
		};
	},
	mounted() {
		// console.log(this.$refs.filtrateTypeList);
	},
	methods: {
		// 按字母筛选
		changeType(e) {
			const id = e.target.dataset.id;
			if (!id) return;

			this.currentChangeType = id;
		},
		// 多选
		multiSelectChange(e) {
			const id = e.target.dataset.id;

			if (!id) return;

			if (!this.isMulti) {
				console.log('单选', id);
				return;
			}

			const arr = this.filtrateList;
			const isHave = arr.some((e, i) => {
				if (e == id) {
					arr.splice(i, 1);
					this.filtrateList = arr;
				}
				return e == id;
			});

			if (!isHave) this.filtrateList = [...arr, id];
		},
		scrollTop() {
			const el = this.$refs.filtrateTypeList;
			el.scroll(0, 0);
		},
		collapseChange() {
			this.scrollTop();
			this.isCollapse = !this.isCollapse;
		},
		multiChange() {
			this.scrollTop();
			this.isMulti = !this.isMulti;
			this.isCollapse = true;
		},
		multiSubmit() {
			if (!this.filtrateList.length) return;

			this.scrollTop();
			this.isMulti = false;
			this.isCollapse = false;
			console.log(this.filtrateList);
		},
		multiCancel() {
			this.scrollTop();
			this.isMulti = false;
			this.isCollapse = false;
			this.filtrateList = [];
		},
	},
};
</script>

<style lang='scss' scoped>
.choose-type-item {
	background-color: var(--f-color);
	display: flex;
	justify-content: space-between;
	border: 1px solid var(--c-color);
	border-bottom: 0;

	.title {
		width: 80px;
		padding-left: 20px;
		padding-top: 8px;
		color: var(--sec-color);
		border-right: 1px solid var(--c-color);
	}

	.control-btns {
		height: 32px;
		width: 124px;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		& > div {
			height: 22px;
			line-height: 22px;
			padding: 0 10px;
			font-size: 12px;
			transition: all 0.1s;
			cursor: pointer;
		}

		.multi {
			border: 1px solid var(--e-color);
		}

		.multi:hover {
			border: 1px solid var(--def-backdrop);
			color: var(--def-backdrop);
		}

		.collapse i {
			transition: all 0.2s;
		}

		.collapse:hover {
			color: var(--def-backdrop);
		}

		.collapse i.active {
			transform: rotate(180deg);
		}
	}

	.type-main-wrap {
		flex: 1;
	}

	.type-main-inner {
		transition: all 0.2s;

		.filtrate-type-wrap {
			height: 30px;
			padding: 0 10px;
			display: flex;
			justify-content: space-around;
			align-items: center;
			span {
				height: 22px;
				line-height: 20px;
				padding: 0 8px;
				border: 1px solid var(--f-color);
				box-sizing: border-box;
				cursor: pointer;
				&.active {
					border: 1px solid var(--def-backdrop);
					color: var(--def-backdrop);
				}
			}
		}

		.filtrate-type-list {
			.filtrate-type-list-inner {
				padding-left: 10px;
				max-height: 32px;
				overflow: hidden;
				transition: all 0.2s;
				span {
					display: inline-block;
					width: 120px;
					height: 22px;
					text-align: left;
					line-height: 20px;
					box-sizing: border-box;
					border: 1px solid var(--f-color);
					margin: 6px 20px 4px 0;
					cursor: pointer;
					transition: all 0.1s;

					&.active {
						color: var(--def-backdrop);
					}

					&:active {
						color: var(--def-backdrop);
					}
					&:hover {
						color: var(--def-backdrop);
					}
				}

				&.active {
					height: auto;
					max-height: 160px;
					overflow: auto;
				}
			}
		}

		.multi-btns {
			text-align: center;
			margin-top: 10px;
			padding-bottom: 10px;

			span {
				display: inline-block;
				padding: 0 10px;
				height: 22px;
				line-height: 20px;
				cursor: pointer;
			}
			.multi-submit {
				border: 1px solid var(--def-backdrop);
				background-color: var(--def-backdrop);
				color: var(--f-color);
				margin-right: 20px;
			}

			.multi-cancel {
				border: 1px solid var(--e-color);
			}
		}
	}
}
</style>