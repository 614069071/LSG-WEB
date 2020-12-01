 <template>
	<div @click="change" class='btn side-button-wrap' :class="{[type]:type,disabled,round:round,[size]:size}" :style="styles">{{text}}</div>
</template>

<script>
export default {
	name: 'Button',
	props: {
		type: {
			type: String,
			default: 'default',
		},
		text: {
			type: String,
			default: 'default',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		styles: {
			type: Object,
			default: () => ({}),
		},
		round: {
			type: Boolean,
			default: true,
		},
		size: {
			type: String,
			default: 'small', //mini
		},
	},
	methods: {
		change() {
			if (this.disabled) return;
			this.$emit('click');
		},
	},
};
</script>

<style lang='scss'>
$default-color: #16c1bc;
$second-color: #20ccc7;

.side-button-wrap {
	width: 100%;
	text-align: center;
	box-sizing: border-box;
}

.small {
	height: 50px;
	line-height: 48px;
	font-size: 16px;
}

.mini {
	height: 40px;
	line-height: 38px;
	font-size: 14px;
}

.round {
	border-radius: 1000px;
}

.default {
	background-color: $default-color;
	border: 1px solid $default-color;
	color: #fff;
}

.info {
	background-color: #fff;
	color: #606266;
	border: 1px solid #eee;
}

.disabled {
	border: 1px solid #eee;
	background-color: #20ccc788 !important;
	color: white;
}

.side-button-wrap.default:active {
	background-color: $second-color;
}
</style>