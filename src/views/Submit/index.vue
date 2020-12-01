 <template>
	<div>
		<HeadBar></HeadBar>
		<div class="submit-order-logo">
			<div class="inner">
				<Logo></Logo>
			</div>
		</div>
		<router-view></router-view>
		<SideFooter></SideFooter>
		<Information></Information>
	</div>
</template>

<style scoped>
.submit-order-logo {
	padding: 20px 0;
	background-color: var(--f-color);
}
</style>