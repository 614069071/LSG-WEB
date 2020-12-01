 <template>
	<!-- 退款售后 -->
	<div class='aftermarket-page-wrap'>
		<NavBar class="personal-center-left"></NavBar>

		<div class="personal-center-right">
			<div class="personal-center-right-title">退款/售后</div>
			<!-- // all:所有 finished:已完成 unpaid:待付款 unreceived:待收货 unshipped:代发货 -->
			<TabBar :model="tabBarColle" :current.sync="currentBar" @submit="getAfterInfo"></TabBar>
			<div class="goods-order-search">
				<div class="search-inp">
					<input type="text" placeholder="请输入商品名称或订单号搜索" v-model="searchText"><span @click="searchOrder">搜索</span>
				</div>

				<!-- <div class="order-time">
				<span>下单时间</span>
				<Select v-model="orderTime" :model="[{title:'近三个月'},{title:'近一个月'},{title:'近一周'}]"></Select>
			</div> -->
			</div>

			<div class="caption-wrap">
				<span class="caption-info">商品</span>
				<span class="caption-price">售价</span>
				<span class="caption-num">数量</span>
				<span class="caption-control">操作</span>
			</div>

			<div class="aftermarket-order-list">
				<div class="aftermarket-item" v-for="(item,index) in 2" :key="index">
					<div class="aftermarket-item-title">
						<p>睐思购自营<span class="change-el">申请时间：2020-09-12 12:23</span></p>
						<p>退款<span class="change-el going">申请中</span></p>
					</div>
					<div class="aftermarket-item-info">
						<div class="item-info">
							<div class="info-img"><img src="https://api.laisigou.com/img/test.jpg" alt=""></div>
							<div class="info-mes">
								<p class="info-title mut-ellipsis">祛斑好帮手】修正茜妃祛斑霜30g 除斑美白修正茜妃祛斑霜30g 除斑美白修正茜妃祛斑霜30g 除斑美白修正茜妃祛</p>
								<p class="info-specif">包装 : 豪华版 分量 : 50g</p>
							</div>
						</div>
						<div class="item-price">29.90</div>
						<div class="item-num">2</div>
						<div class="item-control">
							<span class="btn-def btn" @click="visible = true">申请售后</span>
							<span class="btn-def btn" v-if="false">填写单号</span>
							<span class="btn-def btn" v-if="false">取消申请</span>
							<span class="btn-info btn" @click="goToDetail(item)">售后详情</span>
						</div>
					</div>
				</div>
			</div>

		</div>

		<!-- 申请售后 -->
		<Toast :visible.sync="visible" title="申请售后" @submit="submit" @cancel="cancel">
			<div class="after-taost-wrap common-dialog-wrap">
				<div class="site-parag">
					<span class="must">售后类型</span>
					<div class="after-btn btn" :class="{active:dataInfo.afterType === 0}" @click="checkAfterType(0)">退款</div>
					<div class="after-btn btn" :class="{active:dataInfo.afterType === 1}" @click="checkAfterType(1)">退货退款</div>

				</div>
				<p class="site-tips info-tips">温馨提示：退款及退货退款，购买后7天内可申请</p>
				<div class="site-parag">
					<span class="must">申请数量</span>
					<div class="after-num">
						<span class="btn-del btn" @click="afterNumHandle('del')">-</span>
						<span class="num-accord">{{dataInfo.afterNum}}</span>
						<span class="btn-add btn" @click="afterNumHandle('add')">+</span>
					</div>
				</div>
				<div class="site-parag">
					<span class="must">退款金额</span>
					<div>￥39.99</div>
				</div>
				<div class="site-parag">
					<span class="must">退款说明</span>
					<textarea class="comment-textarea" maxlength="250" placeholder="退款说明..." v-model="dataInfo.textareaText"></textarea>
				</div>
				<div class="site-parag">
					<span class="must">上传凭证</span>
					<div class="comment-upload-wrap">
						<label v-show="dataInfo.previewList.length < 6">
							<input type="file" multiple accept="image/png, image/jpeg, image/gif, image/jpg" @change="afterUpload($event)">
							<p class="upload-icon"><i class="el-icon-plus"></i></p>
							<p class="text btn-text">上传凭证</p>
							<p class="text">（最多6张）</p>
						</label>

						<div class="preview-item" v-for="(item,index) in dataInfo.previewList" :key="index">
							<img :src="item" alt="">
							<div class="del-btn btn" @click="delPreview(index)"><i class="el-icon-delete"></i></div>
						</div>
					</div>
				</div>
			</div>
		</Toast>
	</div>
</template>

<script>
import NavBar from '../../components/NavBar';
import TabBar from '../../components/TabBar';
import { preview } from '@/utils';

export default {
	name: 'aftermarket',
	components: { NavBar, TabBar },
	data() {
		return {
			orderTbaIndex: '',
			orderState: '',
			searchText: '',
			visible: false,
			dataInfo: {
				afterType: 0,
				afterNum: 1,
				textareaText: '',
				previewList: [],
			},
			tabBarColle: [
				{ title: '所有订单' },
				{ title: '可申请' },
				{ title: '处理中' },
				{ title: '待退款' },
				{ title: '已退款' },
				{ title: '已取消' },
			],
			currentBar: 0,
		};
	},
	methods: {
		toggleTab(type) {
			this.orderTbaIndex = type;
		},
		searchOrder() {},
		checkAfterType(v) {
			this.dataInfo.afterType = v;
		},
		afterNumHandle(type) {
			if (type === 'del') {
				if (this.dataInfo.afterNum <= 1) return;
				this.dataInfo.afterNum--;
			} else {
				this.dataInfo.afterNum++;
			}
		},
		afterUpload(e) {
			const { files } = e.target;
			console.log(files);

			const arr = Array.from(files).map((e) => preview(e));
			const list = [...arr, ...this.dataInfo.previewList];

			this.dataInfo.previewList = list.slice(0, 6);
		},
		delPreview(i) {
			this.dataInfo.previewList.splice(i, 1);
		},
		goToDetail(item) {
			console.log(item);
			this.$router.push('/aftermarket/detail/123');
		},
		submit() {
			console.log('submit');
			this.visible = false;
		},
		cancel() {
			console.log('cancel');
			this.dataInfo = {
				afterType: 0,
				afterNum: 1,
				textareaText: '',
				previewList: [],
			};
		},
		getAfterInfo(v) {
			console.log(v);
		},
	},
};
</script>

<style lang='scss' scoped>
.aftermarket-page-wrap {
	display: flex;
	justify-content: space-between;
}

.goods-order-tab {
	border-bottom: 1px solid var(--e-color);
	padding-bottom: 10px;
	& > span {
		font-size: 16px;
		display: inline-block;
		cursor: pointer;
		position: relative;
		width: 90px;
		margin-right: 60px;
		text-align: center;
		i {
			color: var(--def-backdrop);
			padding-left: 5px;
		}
		&.active {
			color: var(--def-backdrop);
		}
		&.active:before {
			content: '';
			position: absolute;
			width: 90px;
			height: 2px;
			border-radius: 2px;
			background-color: var(--def-backdrop);
			bottom: -10px;
			left: 0;
		}
	}
}

.goods-order-search {
	margin: 20px 0 10px 0;
	display: flex;
	justify-content: space-between;
}

.search-inp {
	display: flex;

	input {
		width: 200px;
		height: 32px;
		border: 1px solid var(--ed-color);
		box-sizing: border-box;
		outline: none;
		padding-left: 10px;
		font-size: 12px;
	}

	span {
		width: 40px;
		height: 32px;
		line-height: 32px;
		text-align: center;
		background-color: var(--def-backdrop);
		color: var(--f-color);
		cursor: pointer;
	}
}

.caption-wrap {
	padding: 20px 0;
	display: flex;
	span {
		text-align: center;
		color: var(--sec-color);
	}
	.caption-info {
		flex: 1;
		padding-left: 46px;
		text-align: left;
	}

	.caption-price {
		width: 120px;
	}
	.caption-num {
		width: 120px;
	}
	.caption-control {
		width: 140px;
	}
}

.aftermarket-item {
	border: 1px solid var(--e9-color);
	margin-bottom: 20px;
}

.aftermarket-item-title {
	height: 40px;
	line-height: 40px;
	padding: 0 20px;
	background-color: #f6f6f6;
	color: var(--thir-color);
	border-bottom: 1px solid var(--e9-color);
	display: flex;
	justify-content: space-between;

	.change-el:before {
		content: '|';
		padding: 0 12px;
		font-size: 12px;
		position: relative;
		bottom: 1px;
		color: #c3c3c3;
	}

	.change-el.going {
		color: var(--def-color);
	}
}

.aftermarket-item-info {
	display: flex;
	& > div {
		border-right: 1px solid var(--e9-color);
	}
	& > div:last-child {
		border-right: none;
	}

	.item-info {
		flex: 1;
		display: flex;
		height: 120px;
		.info-img {
			padding: 10px 20px 10px 10px;
			width: 100px;
			height: 100px;
		}

		.info-mes {
			flex: 1;
			padding: 20px 20px 20px 0;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}

		.info-title {
			color: var(--def-color);
		}

		.info-specif {
			color: var(--thir-color);
			font-size: 12px;
		}
	}

	.item-price,
	.item-num {
		width: 120px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.item-control {
		width: 140px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		[class^='btn'] {
			margin-bottom: 10px;
		}
	}
}

.btn-def {
	height: 30px;
	line-height: 30px;
	padding: 0 10px;
	background-color: var(--def-backdrop);
	color: var(--f-color);
}

span.after-btn {
	margin-bottom: 10px;
}

.btn-info {
	color: var(--def-color);
}

.after-taost-wrap {
	margin-bottom: 10px;
}

.after-btn {
	width: 80px;
	height: 30px;
	line-height: 30px;
	border: 1px solid var(--thir-color);
	color: var(--thir-color);
	border-radius: 4px;
	margin-right: 20px;
}

.after-btn.active {
	color: var(--def-backdrop);
	border-color: var(--def-backdrop);
}

.after-num {
	border: 1px solid var(--c-color);
	border-radius: 4px;
	height: 30px;
	display: flex;
	& > span {
		display: block;
	}
	.btn-del,
	.btn-add,
	.num-accord {
		height: 30px;
		line-height: 30px;
		text-align: center;
	}

	.btn-del,
	.btn-add {
		width: 30px;
	}

	.num-accord {
		width: 60px;
		border-right: 1px solid var(--c-color);
		border-left: 1px solid var(--c-color);
	}
}

.comment-textarea {
	width: 440px;
	height: 54px;
	resize: none;
	border-radius: 4px;
	border-color: var(--c-color);
	padding: 5px;
	color: var(--sec-color);
}

.comment-upload-wrap {
	display: flex;
	flex-wrap: wrap;
	width: 470px;
	color: #ebebeb;
	margin-top: 10px;
	label {
		width: 104px;
		height: 104px;
		border: 1px dashed #d5d6d7;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 4px;
		margin-right: 10px;
		margin-bottom: 10px;

		cursor: pointer;
	}

	input {
		display: none;
	}

	.upload-icon {
		font-size: 30px;
		margin-bottom: 18px;
		color: var(--thir-color);
	}

	.text {
		font-size: 14px;
		height: 18px;
		line-height: 18px;
		white-space: nowrap;
		word-break: break-all;
	}

	.text.btn-text {
		color: var(--thir-color);
	}
}

.preview-item {
	width: 106px;
	height: 106px;
	padding: 8px;
	box-sizing: border-box;
	border: 1px solid #d5d6d7;
	margin-right: 10px;
	margin-bottom: 10px;
	border-radius: 4px;
	position: relative;
	.del-btn {
		position: absolute;
		right: 0;
		top: 0;
		width: 20px;
		height: 20px;
		line-height: 20px;
		background-color: rgba(0, 0, 0, 0.5);
	}
}
</style>