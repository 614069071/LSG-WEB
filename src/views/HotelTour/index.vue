 <template>
	<div>
		<!-- 顶部导航 -->
		<HeadBar></HeadBar>
		<!-- 搜索购物车 -->
		<header class="all-header">
			<div class="all-header-main inner">
				<Logo></Logo>
				<SearchCart @search="goToSearch"></SearchCart>
			</div>
		</header>
		<!-- 导航栏 -->
		<SideNav defaultStatus></SideNav>

		<router-view></router-view>

		<SideFooter></SideFooter>
		<Information></Information>
	</div>
</template>

<script>
export default {
	methods: {
		goToSearch() {},
	},
};
</script>
