<template>
	<div class="form-step step2">
		<div class="form-step-item">
			<input type="text" v-model.trim="userInfo.password" placeholder="建议使用两种以上的字符组合">

			<span class="before-icon">
				<Cicon iconClass="icon-icon_password"></Cicon>
			</span>

			<span v-show="usernameTips.length" class="form-item-tips error">
				<Cicon iconClass="icon-iconfontxiaogantanhao"></Cicon>{{usernameTips}}
			</span>
		</div>

		<div class="form-step-item ">
			<input type="text" v-model.trim="userInfo.repassword" placeholder="请再次输入密码">
			<span class="before-icon">
				<Cicon iconClass="icon-mima"></Cicon>
			</span>

			<span v-show="reusernameTips.length" class="form-item-tips error">
				<Cicon iconClass="icon-iconfontxiaogantanhao"></Cicon>{{reusernameTips}}
			</span>
		</div>

		<Button text="下一步" @click="goNext"></Button>
	</div>
</template>

<script>
export default {
	name: 'Step2',
	props: {
		user: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			userInfo: {
				password: '',
				repassword: '',
			},
			// usernameTips: '',
			reusernameTips: '',
		};
	},
	computed: {
		usernameTips(v) {
			const reg = /[a-zA-Z0-9_.-]{5,20}/;
			return reg.test(v) ? '' : '请输入字母数字组合5位数以上密码';
		},
	},
	methods: {
		goNext() {
			this.$emit('update:step', 2);
		},
	},
};
</script>

<style lang="scss"></style>