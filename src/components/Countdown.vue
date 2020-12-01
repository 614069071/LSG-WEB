<template>
	<!-- 倒计时 -->
	<span class="countdown-wrap">{{currentTime}}</span>
</template>

<script>
export default {
	name: 'countdown',
	props: ['start', 'display'],
	data() {
		return {
			timer: null,
			currentTime: this.start,
		};
	},
	watch: {
		display: {
			handler(v) {
				if (v) {
					this.openCountdown();
				} else {
					this.timer && clearInterval(this.timer);
				}
			},
			immediate: true,
		},
	},
	methods: {
		openCountdown() {
			this.currentTime = this.start;
			this.timer && clearInterval(this.timer);
			this.timer = setInterval(() => {
				this.currentTime--;
				if (this.currentTime <= 0) {
					clearInterval(this.timer);
					this.$emit('on-end');
					this.$emit('update:display', false);
				}
			}, 1000);
		},
	},
	beforeDestroy() {
		this.timer && clearInterval(this.timer);
	},
};
</script>

<style scoped>
.countdown-wrap {
	display: inline-block;
}
</style>