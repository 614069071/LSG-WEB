 <template>
	<div class='no-data-image-wrap'>
		<div class="no-data-image">
			<img src="@/assets/images/nodata.png" alt="">
		</div>
		<p>
			<slot>暂无数据</slot>
		</p>
	</div>
</template>

<style lang='scss'>
.no-data-image-wrap {
	margin: 80px 0 100px 0;
	.no-data-image {
		width: 200px;
		margin: 0 auto;
	}
	p {
		text-align: center;
		color: #cbcbcb;
	}
}
</style>