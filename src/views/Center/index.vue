 <template>
	<div class='personal-center-page-wrap'>
		<!-- 顶部导航 -->
		<HeadBar></HeadBar>
		<!-- 搜索购物车 -->
		<header class="all-header">
			<div class="all-header-main inner">
				<Logo></Logo>
				<SearchCart></SearchCart>
			</div>
		</header>

		<router-view class="personal-center-main inner"></router-view>
		<SideFooter></SideFooter>
		<Information></Information>
	</div>
</template>

<script>
export default {
	name: 'Center',
};
</script>

<style lang="scss">
.personal-center-page-wrap {
	min-height: 100vh;
	background-color: var(--f-color);
}

// .all-header {
// 	// border-bottom: 1px solid var(--e-color);
// }

.personal-center-main {
	margin-top: 30px;
	display: flex;
	justify-content: space-between;
}

.personal-view {
	width: 940px;
}

.personal-center-right {
	width: 940px;
}

.personal-center-right-title {
	padding: 20px 0 23px 0;
	font-size: 18px;
	font-weight: 500;
}

.personal-center-right-title.line {
	border-bottom: 1px solid var(--e-color);
}
</style>
