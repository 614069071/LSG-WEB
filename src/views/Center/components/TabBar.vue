 <template>
	<div class="tab-bar-wrap">
		<span :class="{active:current == index}" v-for="(item,index) in model" :key="index" @click="toggleTab(item,index)">{{item.title}} <i v-if="item.inner">{{item.inner}}</i></span>
	</div>
</template>

<script>
export default {
	name: '',
	props: {
		model: {
			type: Array,
			default: () => [],
		},
		current: {
			type: [Number, String],
			default: 0,
		},
	},
	data() {
		return {};
	},
	methods: {
		toggleTab(item, index) {
			this.$emit('update:current', index);
			this.$emit('submit', item);
		},
	},
};
</script>

<style lang='scss' scoped>
.tab-bar-wrap {
	border-bottom: 1px solid var(--e-color);
	display: flex;
	& > span {
		font-size: 16px;
		cursor: pointer;
		position: relative;
		margin-right: 60px;
		text-align: center;
		padding: 0 10px 10px 10px;
		display: flex;
		i {
			color: var(--def-backdrop);
			padding-left: 5px;
		}
		&.active {
			color: var(--def-backdrop);
		}
		&.active:before {
			content: '';
			position: absolute;
			width: 100%;
			height: 2px;
			border-radius: 2px;
			background-color: var(--def-backdrop);
			bottom: 0;
			left: 0;
		}
	}
}
</style>