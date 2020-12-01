 <template>
	<!-- 广告图 -->
	<section class="banner-title-wrap inner">
		<router-link to="">
			<img v-lazy="model.imageSource" :alt="model.imageLabel">
		</router-link>
	</section>
</template>

<script>
export default {
	name: 'banner',
	props: {
		model: {
			type: Object,
			default: () => ({}),
		},
	},
};
</script>

<style scoped>
.banner-title-wrap {
	height: 160px;
	margin-top: 20px;
}
.banner-title-wrap a {
	display: block;
	width: 100%;
	height: 100%;
}
</style>