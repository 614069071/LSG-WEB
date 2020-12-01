 <template>
	<div class="rec-choose">
		<p class="rec-choose-title">{{model.label}}</p>
		<div class="rec-choose-main">
			<div class="choose-content" :key="index" v-for="(item,index) in model.children" @click="updateChange(index)">
				<div class="choose-content-item btn" :class="{active:checked === index}">
					<div class="choose-type-item-img" v-if="item.previewImage">
						<img :src="item.previewImage" alt="">
					</div>

					<span class="choose-type-item-label">{{item.label}}</span>
				</div>
			</div>
		</div>
		<template v-if="model.children[checked] && model.children[checked].children && model.children[checked].children.length">
			<rec-choose :model="model.children[checked]" :parent="checked"></rec-choose>
		</template>
	</div>
</template>

<script>
export default {
	name: 'rec-choose',
	props: {
		model: {
			type: Object,
			default: () => ({}),
		},
		parent: {
			type: [Number, String],
			default: 0,
		},
	},
	data() {
		return {
			checked: '',
		};
	},
	watch: {
		parent() {
			this.checked = 0;
		},
	},
	methods: {
		updateChange(index) {
			this.checked = index;
			// this.$emit('update:current', index);
		},
	},
};
</script>

<style lang='scss' scoped>
.rec-choose {
	position: relative;
	left: 0;
	bottom: 0;
	width: 648px;
	margin-bottom: 20px;
}

.rec-choose-title {
	height: 22px;
	line-height: 22px;
	position: absolute;
	left: 0;
	width: 103px;
	text-align: center;
	top: 0;
}

.rec-choose-main {
	display: flex;
	flex-wrap: wrap;
	padding-left: 103px;
	// margin-bottom: 10px;
}

.choose-content {
	margin-bottom: 10px;
}

.choose-content-item {
	display: flex;
	align-items: center;
	border: 1px solid var(--f-color);
	margin-right: 15px;
}

.choose-content-item.active {
	border: 1px solid var(--def-backdrop);
}

.choose-type-item-img {
	width: 60px;
	height: 60px;
	text-align: center;
	img {
		max-width: 100%;
		width: auto;
		display: inline-block;
	}
}

.choose-type-item-label {
	min-height: 20px;
	padding: 0 10px;
	display: flex;
	align-items: center;
}
</style>