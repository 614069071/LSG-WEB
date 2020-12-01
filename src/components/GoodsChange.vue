 <template>
	<!-- 参照首页专属推荐 -->
	<section v-if="list.length" class="recom-wrap exclusive-zone-wrap inner">
		<div class="recom-head">
			<div>{{title}}</div>
			<div class="btn exclusive-zone-right" @click="exclusiveChange">
				换一批 <i class="el-icon-refresh-right"></i>
			</div>
		</div>
		<div class="recom-list">
			<ul>
				<router-link tag="li" :to="`/${item.type}/detail/${item.productId}`" v-for="(item,index) in exclusiveList" :key="index">
					<div class="product-img"><img v-lazy="item.thumbImage" :alt="item.productName"></div>
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
import { getRandomArray } from '@/utils';

export default {
	name: 'GoodsChange',
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
			exclusiveList: [],
		};
	},
	watch: {
		list: {
			handler(v) {
				this.exclusiveList = v.slice(0, 5);
			},
			immediate: true,
		},
	},
	created() {},
	methods: {
		exclusiveChange() {
			const arr = getRandomArray(this.list, 5);
			this.exclusiveList = arr;
			console.log('换一换', arr);
		},
	},
};
</script>

<style lang='scss'>
section.home-title-wrap {
	height: 160px;
	margin-top: 20px;

	a {
		display: block;
		width: 100%;
		height: 100%;
	}
}

.recom-wrap.new-zone-wrap {
	.recom-head .arrow > span {
		display: inline-block;
		width: 20px;
		height: 20px;
		background-color: #fff;
		font-size: 16px;
		text-align: center;
		line-height: 20px;
		cursor: pointer;
	}

	.recom-head .arrow > span:last-child {
		margin-left: 10px;
	}
}

section.exclusive-zone-wrap {
	.exclusive-zone-right {
		font-size: 14px;
	}
}
</style>