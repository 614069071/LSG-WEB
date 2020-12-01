<template>
	<div class="wrap steps-three">
		<Cicon class="icon-zhucechenggong" />
		<p class="success">恭喜您，注册成功！</p>
		<router-link tag="div" class="gologin btn" to="/login">去登录</router-link>
		<p class="tips">
			<Countdown :display.sync="display" :start="5" @on-end="$router.push('/login')" />s后自动跳转......
		</p>
	</div>
</template>

<script>
export default {
	name: 'Step3',
	data() {
		return {
			display: true,
		};
	},
};
</script>

<style scoped>
.wrap {
	padding-top: 50px;
	margin: 0 auto;
	text-align: center;
}
.wrap .icon-zhucechenggong {
	font-size: 52px;
	color: #15c1bb;
}
.wrap .success {
	font-size: 24px;
	font-weight: 500;
	padding-top: 16px;
	padding-bottom: 50px;
	color: var(--def-backdrop);
}
.wrap .gologin {
	width: 300px;
	height: 40px;
	line-height: 40px;
	border: 1px solid var(--def-backdrop);
	border-radius: 20px;
	margin: 0 auto;
	color: #16c2bc;
}
.wrap .tips {
	margin-top: 130px;
}
</style>
