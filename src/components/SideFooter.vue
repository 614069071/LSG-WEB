<template>
	<footer class="footer-page">
		<div class="inner side-footer-wrap">
			<ul class="side-footer-upper">
				<li v-for="item in promiseList" :key="item.img">
					<div class="img">
						<img v-lazy="item.img" class="picture-alignment" />
					</div>
					<span class="written-words">{{item.text}}</span>
				</li>
			</ul>
		</div>

		<div class="side-footer-Lower-wrap">
			<div class="side-footer-Lower inner">
				<Logo></Logo>
				<div class="lower-right">
					<div v-for="item in navList" :key="item.title" class="lower-text">
						<p>{{item.title}}</p>
						<ul>
							<router-link tag="li" :to="`/guide/${nape.url}`" v-for="(nape,index) in item.list" :key="index">{{nape.title}}</router-link>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
import guide from 'lib/guide';

export default {
	name: 'SideFooter',
	data() {
		return {
			promiseList: [
				{
					img: require('@/assets/images/zheng.png'),
					text: '正品承诺 精致服务',
				},
				{
					img: require('@/assets/images/quan.png'),
					text: '品类齐全 轻松购物',
				},
				{
					img: require('@/assets/images/sheng.png'),
					text: '海外直邮 畅选无阻',
				},
				{
					img: require('@/assets/images/tui.png'),
					text: '国内退货 售后无忧',
				},
			],
			navList: Object.freeze(guide),
		};
	},
};
</script>

<style scoped>
.footer-page {
	background: white;
}
/* .side-footer-wrap {
  width: 1100px;
  margin: 0 auto;
} */
.side-footer-upper {
	height: 141px;
	line-height: 141px;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
}

.side-footer-upper li {
	display: flex;
	align-items: center;
}

.side-footer-upper li .img {
	width: 50px;
	height: 50px;
	margin-right: 10px;
}

.written-words {
	line-height: 19px;
	font-size: 20px;
}
.picture-alignment {
	vertical-align: middle;
	margin-right: 10px;
	width: 50px;
}

.side-footer-Lower-wrap {
	width: 100%;
	border-top: 1px solid #eee;
}
.side-footer-Lower {
	height: 228px;
	display: flex;
	justify-content: space-between;
	margin-top: 49px;
}
.lower-right {
	display: flex;
}
.lower-text {
	margin: 0px 30px;
}
.lower-text p {
	line-height: 29px;
	font-size: 18px;
	color: var(--def-color);
}
.lower-text ul li {
	line-height: 29px;
	font-size: 12px;
	color: #656565;
}
.lower-text ul li:hover {
	cursor: pointer;
	text-decoration: underline;
}
</style>
