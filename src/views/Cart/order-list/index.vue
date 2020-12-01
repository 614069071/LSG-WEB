 <template>
	<!-- 普通 选择 -->
	<div class="order-list-page-wrap">
		<!-- 我的购物车 -->
		<div class="order-list-head">
			<div class="order-list-head-main inner">
				<div class="before">我的购物车（{{cartSum}}）</div>
				<div v-if="false" class="after">配送至 <Distpicker class="order-distpicker" :address.sync="orderAddress" :display.sync="orderDisplay"></Distpicker>
				</div>
			</div>
		</div>
		<template v-if="orderList.length">
			<div class="order-list-check-control inner">
				<label class="checked-all-order-item">
					<el-checkbox v-model="allChecked" @change="allCheckedChange(allChecked)" />全选
				</label>
				<span class="goods-info">商品信息</span>
				<span class="goods-unit-price">单价（元）</span>
				<span class="goods-sum">数量</span>
				<span class="goods-sum-price">金额（元素）</span>
				<span class="goods-control">操作</span>
			</div>

			<!-- 订单列表 -->
			<div class="order-list-manage-wrap inner">
				<!-- 单个订单 -->
				<div class="order-item-main" :class="{active:nape.checked}" v-for="(nape,idx) in orderList" :key="idx">
					<div class="checked-btn">
						<el-checkbox v-model="nape.checked" @change="checkedItemChange(nape.checked)" />
					</div>
					<div class="goods-img">
						<img :src="nape.thumbUrl || 'https://api.laisigou.com/images/G5ysytVBNoTFzMahhfJGu8r8o8bjxL.jpg'" alt />
					</div>
					<div class="good-intro">
						<p class="title">{{nape.name}}</p>

						<div class="bottom">
							<p class="pack">{{nape.itemName}}</p>
							<!-- <p class="tax">
								<span>包税</span>
							</p> -->
						</div>
					</div>
					<div class="goods-price">{{nape.price}}</div>
					<div class="goods-sum">
						<span @click="orderItemSumChange(nape,'left')">-</span>
						<span class="sum">{{nape.num}}</span>
						<span @click="orderItemSumChange(nape,'right')">+</span>
					</div>
					<div class="goods-price-sum">{{nape.price * nape.num}}</div>
					<div class="good-control">
						<span @click="removeOrderItem(nape,idx)">删除</span>
					</div>
				</div>
			</div>

			<!-- 结算 -->
			<div class="order-list-settlement inner">
				<div class="check-all-list">
					<label>
						<el-checkbox v-model="allChecked" @change="allCheckedChange(allChecked)" />全选
					</label>
					<span @click="removeCheckeGoods">删除选中商品</span>
				</div>
				<div class="order-settlement-intro">
					<div class="order-settlement-info">
						<p>已选商品&nbsp;<i>{{allOrderSum}}&nbsp;</i>件，总价（不含运费）：
							<span class="total-price">{{allOrderPrice}}</span>
						</p>
						<p>商品税费：￥0.00</p>
					</div>
					<div class="order-settlement-sumit" @click="orderToSubmit">去结算</div>
				</div>
			</div>
		</template>

		<!-- 无订单时 -->
		<div class="no-order-view inner" v-else>
			<div class="no-order-icon">
				<Cicon iconClass="icon-gouwuche1"></Cicon>
			</div>
			<p>
				购物车空空如也,赶紧去
				<router-link to="/">
					逛逛吧
					<Cicon iconClass="icon-youbian"></Cicon>
				</router-link>
			</p>
		</div>

		<!-- 删除全部选中商品 -->
		<Toast title="删除商品" :visible.sync="removeCheckeGoodDisplay" @success="removeCheckeGoodsSubmit" @cancel="removeCheckeGoodDisplay = false">
			<p class="del-text">确定删除选中的商品吗？</p>
		</Toast>
	</div>
</template>

<script>
import { storages } from '@/utils';

export default {
	name: 'order-list',
	data() {
		return {
			orderDisplay: false,
			orderAddress: ['北京', '广州市', '武汉市'],
			guessLikeList: new Array(8),
			allChecked: false,
			orderList: [],
			removeCheckeGoodDisplay: false,
			allOrderPrice: 0,
			allOrderSum: 0,
		};
	},
	computed: {
		cartSum() {
			const lsCart = this.orderList;
			let sum = 0;
			lsCart.forEach((e) => (sum += e.num));
			return sum;
		},
	},
	created() {
		this.getCartList();
	},
	methods: {
		getCartList() {
			this.loadeing(true);
			this.$axios.cartGet().then(({ data = [] }) => {
				const lsCart = data.map((e) => ({ itemId: e.itemId, num: e.num }));
				this.orderList = data;
				this.$store.commit('addGoodsToCart', lsCart);
			});
		},
		// 所有全选
		allCheckedChange(checked) {
			this.orderList.forEach((e) => (e.checked = checked));
			this.updateBillInfo();
		},
		// 单项选择
		checkedItemChange() {
			const allChecked = this.orderList.every((e) => e.checked);
			this.allChecked = allChecked;
			this.updateBillInfo();
		},
		// 删除单项
		removeOrderItem({ itemId }, i) {
			const load = this.$layer.loading();
			this.$axios.cartRemove({ itemId }).then(() => {
				const currentCart = this.orderList;

				currentCart.splice(i, 1);

				this.orderList = currentCart;
				this.$store.commit('remGoodsToCart', itemId);
				this.$layer.close(load);
			});
		},
		// 更新结算信息
		updateBillInfo() {
			let sumAmount = 0;
			let orderSum = 0;
			this.orderList.forEach((e) => {
				if (e.checked) {
					sumAmount += e.num * e.price;
					orderSum += e.num;
				}
			});

			this.allOrderPrice = sumAmount;
			this.allOrderSum = orderSum;
		},
		// 商品数量
		orderItemSumChange(nape, dir) {
			const initNum = nape.num;

			if (dir === 'left') {
				if (nape.num > 1) {
					nape.num--;
				} else {
					return;
				}
			} else {
				if (nape.num >= nape.stockAmount - nape.soldAmount) {
					this.$layer.msg('不能添加更多了哦！');
					return;
				}
				nape.num++;
			}

			const gap = nape.num - initNum;

			if (!gap) return;

			const utd = { itemId: nape.itemId, num: gap };

			const load = this.$layer.loading();

			this.$axios.cartAdd(utd).then((res) => {
				this.$layer.close(load);
				console.log(res, 'cartUpdate');
				this.$store.commit('udtGoodsToCart', {
					itemId: nape.itemId,
					num: nape.num,
				});

				this.updateBillInfo();
			});
		},
		// 删除所有选中商品
		removeCheckeGoods() {
			const isHave = this.orderList.some((e) => e.checked);
			if (isHave) {
				this.removeCheckeGoodDisplay = isHave;
			} else {
				this.$layer.msg('请选择需要删除的商品');
			}
		},
		removeCheckeGoodsSubmit() {
			const load = this.$layer.loading();
			this.removeCheckeGoodDisplay = false;
			const itemIds = [];

			this.orderList.forEach((e) => {
				if (e.checked) {
					itemIds.push(e.itemId + '');
				}
			});

			this.$axios
				.cartRemoveBatch(itemIds)
				.then((res) => {
					console.log(res, 'remGoodsToCart');
					const lsCart = this.orderList;
					lsCart.forEach((e, i, arr) => {
						if (e.checked) arr.splice(i, 1);
					});

					this.orderList = lsCart;
					this.$store.commit('remGoodsToCart', itemIds);
					this.$layer.close(load);
				})
				.catch(() => {
					this.$layer.close(load);
				});
		},

		//去结算
		orderToSubmit() {
			const isHave = this.orderList.some((e) => e.checked);
			if (!isHave) return this.$layer.msg('请勾选要结算的商品');
			const settleColle = this.orderList
				.filter((e) => e.checked)
				.map((e) => e.itemId);

			// 生成预览订单
			this.$axios
				.orderPreviewCart(settleColle)
				.then(({ data = {} }) => {
					console.log(data.cacheId);
					storages.set('ls__settleColle_cache', data.cacheId);
					this.$router.push('/submit');
				})
				.catch(() => {
					this.$layer.msg('出错了，请稍后再试');
				});
		},
	},
};
</script>

<style lang='scss' scoped>
@import './index';

.order-list-head {
	width: 100%;
	border-bottom: 1px solid var(--c-color);
}

.order-list-head-main {
	display: flex;
	justify-content: space-between;
	align-items: center;
	.before {
		height: 40px;
		line-height: 40px;
		font-size: 16px;
		background-color: var(--def-backdrop);
		color: var(--f-color);
		padding: 0 20px;
	}

	.order-distpicker {
		background-color: var(--e-color);
		height: 24px;
		line-height: 24px;
	}
	.order-distpicker /deep/ .distpicker-wrap {
		top: 24px;
	}
}

.submit {
	background-color: var(--def-backdrop);
	color: var(--f-color);
	margin-left: 20px;
}

.del-text {
	width: 300px;
}
</style>