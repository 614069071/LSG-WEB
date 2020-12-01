 <template>
	<div class='center-nav-bar'>
		<dl>
			<router-link tag="dt" to="/center">个人中心</router-link>

			<dt>商品订单</dt>
			<router-link tag="dd" to="/goods/order">全部订单<Cicon iconClass="icon-youbian"></Cicon>
			</router-link>
			<!-- <router-link tag="dd" to="/comment">评价中心<Cicon iconClass="icon-youbian"></Cicon>
			</router-link>
			<router-link tag="dd" to="/goods/aftermarket">退款/售后<Cicon iconClass="icon-youbian"></Cicon>
			</router-link> -->

			<!-- <dt>我的优惠券</dt>
			<router-link tag="dd" to="/coupons">已使用<Cicon iconClass="icon-youbian"></Cicon>
			</router-link>
			<router-link tag="dd" to="/coupons">已过期<Cicon iconClass="icon-youbian"></Cicon>
			</router-link> -->

			<!-- <dt>服务订单</dt>
			<router-link tag="dd" to="/service/order/hotel">酒店订单<Cicon iconClass="icon-youbian"></Cicon>
			</router-link>
			<router-link tag="dd" to="/service/order/tourism">旅游订单<Cicon iconClass="icon-youbian"></Cicon>
			</router-link> -->

			<dt>账号管理</dt>
			<router-link tag="dd" to="/account/infor">个人信息<Cicon iconClass="icon-youbian"></Cicon>
			</router-link>
			<!-- <router-link tag="dd" to="/account/bind">账号绑定<Cicon iconClass="icon-youbian"></Cicon>
			</router-link>
			<router-link tag="dd" to="/account/cert">实名认证<Cicon iconClass="icon-youbian"></Cicon>
			</router-link> -->
			<router-link tag="dd" to="/account/address">收货地址<Cicon iconClass="icon-youbian"></Cicon>
			</router-link>

			<dt>我的收藏</dt>
			<router-link tag="dd" to="/favorite">收藏的商品<Cicon iconClass="icon-youbian"></Cicon>
			</router-link>
		</dl>
	</div>
</template>

<script>
export default {
	name: 'nav-bar',
	data() {
		return {};
	},
	methods: {},
};
</script>

<style lang='scss' scoped>
.center-nav-bar {
	background-color: var(--e-color);
	min-height: calc(100vh - 193px);
	dl {
		width: 100px;
		padding: 15px 30px 57px 10px;
		margin-top: 0;

		dt {
			font-size: 16px;
			height: 32px;
			line-height: 32px;
			margin-top: 20px;
			cursor: pointer;
		}

		dt:first-child,
		dt:nth-child(2) {
			margin: 0;
		}

		dd {
			font-size: 14px;
			color: var(--thir-color);
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-left: 0;
			height: 30px;
			line-height: 30px;
			cursor: pointer;
		}
	}
}
</style>