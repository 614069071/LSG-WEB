<template>
	<i class="iconfont" :class="iconClass" :style='{color}'></i>
</template>

<script>
export default {
	name: 'c-icon',
	props: ['iconClass', 'color'],
};
</script>

<style lang="scss">
@import url('//at.alicdn.com/t/font_1998948_18p0z6k5yfc.css');
</style>