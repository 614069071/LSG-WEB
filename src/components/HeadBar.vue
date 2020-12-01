<template>
	<!-- 顶部导航 -->
	<div class='head-bar-wrap'>
		<div class="head-bar-main inner">
			<div class="head-bar-left">
				<ul>
					<li>
						<span>{{$store.state.userinfo.token ? `你好，${$store.state.userinfo.nickName}`:'睐思购欢迎您'}}!</span>
					</li>
					<li>
						<span to="/" v-if="$store.state.userinfo.token" @click="exitClick">退出</span>
						<router-link v-else to="/login">登录/注册</router-link>
					</li>
				</ul>
			</div>
			<div class="head-bar-right">
				<ul>
					<!-- <li>
						<router-link to="">每日签到</router-link>
					</li> -->
					<li>
						<span v-login="'/goods/order'">我的订单</span>
					</li>
					<li>
						<span v-login="'/center'">个人中心</span>
					</li>
					<li>
						<span class="service-phone" @click.stop="servicePhone()">客户服务</span>
						<div class="popup-wrap" v-show="serviceFlag">
							<p class="service-phone-text">
								<Cicon iconClass="icon-dianhua2"></Cicon> 0898 382 99999
							</p>
						</div>
					</li>
					<li class="mobile-app">
						<span @click.stop="controlProp('qrcode')">移动版</span>
						<!-- <div class="popup-wrap" v-show="qrcode">
							<div class="mobile-img-wrap">
								<img src="@/assets/images/mobile.png" alt="">
							</div>
						</div> -->
					</li>
					<!-- <li>
						<router-link to="/">更多</router-link>
					</li> -->
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { delInfoCookie } from '@/utils';

export default {
	name: 'HeadBar',
	data() {
		return {
			qrcode: false,
			serviceFlag: false,
		};
	},
	mounted() {
		document.addEventListener('click', this.toggle);
		this.$once('hook:beforeDestroy', () => {
			document.removeEventListener('click', this.toggle);
		});
	},
	methods: {
		exitClick() {
			console.log(this.$route);
			if (this.$route.meta.permission && this.$route.path !== '/') {
				this.$router.push('/');
			}
			delInfoCookie();
			this.$store.commit('setUserInfo', {}); //清除登录信息
			this.$store.commit('clearCart'); //清空购物车
		},
		toggle() {
			this.qrcode = false;
			this.serviceFlag = false;
		},
		servicePhone() {
			this.toggle();
			this.serviceFlag = true;
		},
		controlProp(key) {
			this.toggle();
			window.open('https://app.laisigou.com/');
		},
	},
};
</script>

<style lang='scss'>
.head-bar-wrap {
	background-color: var(--def-color);
	color: #fff;
}

.head-bar-main {
	display: flex;
	justify-content: space-between;
}

.head-bar-left,
.head-bar-right {
	ul {
		li {
			display: inline-block;
			position: relative;

			a,
			span {
				display: block;
				color: var(--thir-color);
				height: 30px;
				line-height: 30px;
				padding: 0 15px;
				transition: all 0.1s;
				cursor: pointer;

				&:hover {
					color: #fff;
				}
			}
		}
	}
}

.head-bar-left ul li:first-child span {
	padding-left: 0;
}

.head-bar-right ul li:last-child a,
.head-bar-right ul li:last-child span {
	padding-right: 0;
}

.mobile-img-wrap {
	width: 120px;
}

.popup-wrap {
	position: absolute;
	left: 0;
	top: 100%;
	background-color: var(--def-color);
	z-index: 10;
	padding: 12px 16px 14px 16px;
	border-radius: 0 0 6px 6px;
}

.service-phone-text {
	white-space: nowrap;
	font-size: 14px;
	display: flex;
	align-items: center;
	i {
		font-size: 16px;
		margin-right: 6px;
	}
}
</style>
