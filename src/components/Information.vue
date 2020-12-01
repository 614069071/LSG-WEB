<template>
	<div class="related-information" :class="{ white: white}">
		<p>海南睐思购跨境电商有限公司</p>
		<p>&copy;2020 Hainan Laisigou International E-Commerce Co., Ltd. All rights reserved.</p>
		<p><a href="https://beian.miit.gov.cn">琼ICP备2020003513号-1</a></p>
	</div>
</template>

<script>
export default {
	props: {
		white: {
			type: Boolean,
			default: false,
		},
	},
};
</script>

<style scoped>
.related-information {
	width: 100%;
	padding: 30px 0px;
	background-color: var(--def-color);
	color: white;
	text-align: center;
	border-top: 1px solid var(--def-color);
}

a {
	color: white;
}

.related-information p {
	line-height: 30px;
}
.white {
	color: var(--def-color);
	background-color: #fff;
	border-top: 1px solid #eee;
}

.white a {
	color: var(--def-color) !important;
}
</style>