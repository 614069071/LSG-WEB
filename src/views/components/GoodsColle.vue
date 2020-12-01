<template>
	<!-- 普通商品列表 -->
	<div class="commodity-list-wrap inner">
		<Commodity v-for="(item,index) in model" :key="index" :model="item"></Commodity>
	</div>
</template>

<script>
export default {
	name: 'GoodsColle',
	props: {
		model: {
			type: [Array, Number],
		},
	},
};
</script>

<style scoped lang="scss">
.commodity-list-wrap {
	width: 100%;
	max-width: 1100px;

	& > div:not(:nth-of-type(4n)) {
		margin-right: 20px;
		margin-bottom: 10px;
	}
}
</style>