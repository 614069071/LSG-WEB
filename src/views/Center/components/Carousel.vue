 <template>
	<section class="recom-wrap new-zone-wrap">
		<div class="recom-head">
			<div>{{title}}</div>
			<div class="arrow">
				<span @click="slideToggle('left')">
					<i class="el-icon-arrow-left"></i>
				</span>
				<span @click="slideToggle('right')">
					<i class="el-icon-arrow-right"></i>
				</span>
			</div>
		</div>
		<div class="recom-list">
			<ul :style="{left:newZoneCurrentPosition + 'px'}">
				<router-link tag="li" :to="`/product/detail/${item.productId}`" v-for="(item,index) in list" :key="index">
					<div class="product-img"><img :src="item.thumbImage" alt=""></div>
					<div class="product-info ">
						<p class="ellipsis">{{item.productName}}</p>
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
			const count = Math.ceil(this.list.length / 4);
			const endPosition = -(count - 1) * 933;

			if (dire === 'left') {
				if (this.newZoneCurrentPosition == 0) return;
				this.newZoneCurrentPosition += 933;
			} else {
				if (this.newZoneCurrentPosition - 933 < endPosition) return;
				this.newZoneCurrentPosition -= 933;
			}
		},
	},
};
</script>

<style lang='scss' scoped>
.recom-wrap {
	width: 940px;
}

.recom-list {
	ul li {
		margin-right: 33px !important;
		transition: all 0.2s;
	}

	ul li:hover {
		box-shadow: 0px 3px 13px 2px rgba(0, 0, 0, 0.1);
	}
}
.recom-wrap.new-zone-wrap {
	.recom-head .arrow > span {
		display: inline-block;
		width: 20px;
		height: 20px;
		background-color: var(--f-color);
		font-size: 16px;
		text-align: center;
		line-height: 20px;
		cursor: pointer;
	}

	.recom-head .arrow > span:last-child {
		margin-left: 10px;
	}

	.product-info p {
		width: 100%;
		box-sizing: border-box;
		padding: 0 10px;
	}
}
</style>