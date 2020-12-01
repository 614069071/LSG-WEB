 <template>
	<!-- 参照首页新人专区 -->
	<section class="recom-wrap new-zone-wrap inner">
		<div class="recom-head">
			<div>{{title}}</div>
			<div class="arrow">
				<span class="btn" @click="slideToggle('left')">
					<i class="el-icon-arrow-left"></i>
				</span>
				<span class="btn" @click="slideToggle('right')">
					<i class="el-icon-arrow-right"></i>
				</span>
			</div>
		</div>
		<div class="recom-list">
			<ul :style="{left:newZoneCurrentPosition + 'px'}">
				<!-- link to 待修改 -->
				<router-link tag="li" :to="`/${item.type}/detail/${item.productId}`" v-for="(item,index) in list" :key="index">
					<div class="product-img"><img v-lazy="item.thumbImage" alt=""></div>
					<div class="product-info">
						<p class="ellipsis" :title="item.productName">{{item.productName}}</p>

						<div class="product-info-price">
							<span class="current-price">{{item.priceCurrent}}</span><span class="original-price">{{item.price}}元</span>
						</div>
					</div>
				</router-link>
			</ul>
		</div>
	</section>
</template>

<script>
export default {
	name: 'GoodsCarousel',
	props: {
		list: {
			type: Array,
			default: () => [],
		},
		title: {
			type: String,
			default: '推荐',
		},
	},

	data() {
		return {
			newZoneCurrentPosition: 0,
		};
	},
	methods: {
		slideToggle(dire) {
			const count = Math.ceil(this.list.length / 5);
			const endPosition = -(count - 1) * 1075;

			if (dire === 'left') {
				if (this.newZoneCurrentPosition == 0) return;
				this.newZoneCurrentPosition += 1075;
			} else {
				if (this.newZoneCurrentPosition - 1075 < endPosition) return;
				this.newZoneCurrentPosition -= 1075;
			}
		},
	},
};
</script>

<style lang='scss'>
.recom-wrap.new-zone-wrap {
	.recom-head .arrow > span {
		display: inline-block;
		width: 20px;
		height: 20px;
		background-color: #fff;
		font-size: 16px;
		text-align: center;
		line-height: 20px;
	}

	.recom-head .arrow > span:last-child {
		margin-left: 10px;
	}
}
</style>