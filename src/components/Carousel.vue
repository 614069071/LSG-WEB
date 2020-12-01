<template>
	<!-- 轮播 -->
	<div class='carousel-wrap'>
		<div class="carousel-list">
			<div class="btn carousel-item" v-for="(item,index) in list" :key="index" :class="{active:index === currentIndex}" @click="dealink(item)">
				<img :src="item.imageSource" alt="">
			</div>
		</div>
		<div class="btn carousel-direction">
			<ul class="carousel-dot">
				<li v-for="(item,index) in list" :key="index" :class="{active:index === currentIndex}" @click="dotClick(index)"></li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Carousel',
	props: {
		list: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			currentIndex: 0,
			timer: null,
		};
	},
	watch: {
		list(v) {
			const img = new Image();
			img.src = v.length && v[0] && v[0].imageSource;
			img.onload = () => this.startCarousel();
		},
	},
	beforeDestroy() {
		clearInterval(this.timer);
	},
	methods: {
		startCarousel() {
			this.timer && clearInterval(this.timer);
			let len = this.list.length;

			if (!len || len == 1) return;
			this.timer = setInterval(() => {
				let cur = (this.currentIndex + 1) % len;
				this.currentIndex = cur;
			}, 4000);
		},
		dotClick(index) {
			this.currentIndex = index;
			this.startCarousel();
		},
	},
};
</script>

<style lang='scss' scoped>
.carousel-wrap {
	width: 100%;
	height: 480px;
	background-color: #fff;
	position: relative;
}

.carousel-wrap .carousel-list {
	width: 100%;
	height: 100%;
	position: relative;
}

.carousel-list .carousel-item {
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	opacity: 0;
	transition: all 1s;
	display: block;
	&.active {
		opacity: 1;
		z-index: 10;
	}
}

.carousel-direction {
	position: absolute;
	width: 1100px;
	height: 16px;
	left: 50%;
	bottom: 30px;
	transform: translateX(-50%);
	z-index: 20;
	text-align: right;
}

.carousel-dot li {
	display: inline-block;
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background-color: #fff;
	&:not(:last-child) {
		margin-right: 10px;
	}
	&.active {
		background-color: var(--def-backdrop);
	}
}
</style>