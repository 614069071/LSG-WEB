<template>
	<div id="app">
		<keep-alive>
			<router-view v-if="$route.meta.keep" />
		</keep-alive>

		<router-view v-if="!$route.meta.keep" />

		<Toast :visible="$store.state.loginToast">
			<div slot="header" class="login-toast-header">
				<span class="btn login-toast-header-close" @click="$store.commit('updateLoginToast')"><i class="el-icon-close"></i></span>
			</div>
			<LoginWrap @success="$store.commit('updateLoginToast')" @error="$store.commit('updateLoginToast')"></LoginWrap>
			<div slot="footer"></div>
		</Toast>
	</div>
</template>

<script>
import LoginWrap from '@/views/Login/LoginWrap';
export default {
	components: { LoginWrap }
};
</script>

<style>
.login-toast-header {
	position: relative;
}

.login-toast-header-close {
	position: absolute;
	top: -10px;
	right: -10px;
	z-index: 100;
	width: 20px;
	height: 20px;
	text-align: center;
	font-size: 16px;
	line-height: 20px;
	background-color: #fff;
	border-radius: 50%;
	border: 1px solid #eee;
}
</style>
