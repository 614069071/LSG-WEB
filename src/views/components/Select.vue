 <template>
	<div class='select-wrap btn' :style="{height:height,lineHeight:height}" @click.stop="() => {}">
		<div class="select-title ellipsis" :style="{height:height,lineHeight:height}" @click="showSelect = !showSelect">{{defaultValue}} <i :class="showSelect ? 'el-icon-caret-top':'el-icon-caret-bottom'"></i></div>
		<div class="select-list" :style="{top:height}" v-show="showSelect">
			<div v-for="(item,index) in model" :key="index" :style="{height:height,lineHeight:height}" @click="checkedItem(item)">{{item.title}}</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Select',
	props: {
		model: {
			type: Array,
		},
		height: {
			type: String,
			default: '30px',
		},
	},
	data() {
		return {
			defaultValue: this.model[0].title,
			showSelect: false,
		};
	},
	mounted() {
		const toggle = () => {
			if (!this.showSelect) return;
			this.showSelect = false;
		};
		document.addEventListener('click', toggle);
		this.$once('hook:beforeDestroy', () => {
			document.removeEventListener('click', toggle);
		});
	},
	methods: {
		checkedItem(item) {
			this.defaultValue = item.title;
			this.showSelect = false;
			this.$emit('input', item.title);
		},
	},
};
</script>

<style lang='scss' scoped>
.select-wrap {
	display: inline-block;
	position: relative;
	height: 30px;
	width: 100px;
	border: 1px solid var(--d-color);
	font-size: 12px;
	background-color: var(--f-color);
}

.select-title {
	height: 30px;
	line-height: 30px;
	padding-left: 10px;
	position: relative;
	padding-right: 18px;
	i {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		font-size: 18px;
	}
}

.select-list {
	position: absolute;
	border: 1px solid var(--d-color);
	min-width: 100%;
	left: -1px;
	top: 30px;
	z-index: 100;
	background-color: var(--f-color);

	& > div {
		height: 30px;
		line-height: 30px;
		padding-left: 10px;
		white-space: nowrap;
	}
	& > div:hover {
		background-color: var(--e-color);
	}
	& > div:not(:last-child) {
		border-bottom: 1px solid var(--d-color);
	}
}
</style>