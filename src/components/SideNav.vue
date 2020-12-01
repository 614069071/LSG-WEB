<template>
	<!-- 导航 -->
	<nav class='head-nav-bar-wrap' :class="{line:line}">
		<div class='head-nav-bar inner'>
			<div class="side-bar-wrap" @mouseenter="sideNavBarToggle(1)" @mouseleave="sideNavBarToggle(0)">
				<p class="btn side-bar-all">
					<Cicon class="icon-2" />所有分类
				</p>

				<div class="btn side-nav-bar-main" :style="{display:defaultStatus? 'none':'block'}" ref="sideNavBarMain">
					<ul>
						<li v-for="(item,index) in sideNavBarList.slice(0,12)" :key="index">
							<p>
								<span class="ellipsis">{{item.name}}</span>
								<Cicon class="right icon-youbian" />
							</p>

							<div class="side-nav-bar-main-content">
								<div class="content-item-wrap">
									<div class="before">
										<div class="before-type-item" v-for="(nape,index) in item.children.slice(0,6)" :key="index">
											<div class="before-type-item-title">{{nape.name}}</div>
											<ul class="before-type-item-list">
												<router-link tag="li" :to="`/result?keyword=${v.name}`" v-for="(v,i) in nape.children" :key="i">{{v.name}}</router-link>
											</ul>
										</div>
									</div>

									<div class="after">
										<router-link :to="`/brand/${val.id}`" class="after-type-item" v-for="(val,index) in (item.brand && item.brand.slice(0,8))" :key="index">
											<img :src="val.image" :alt="val.name">
										</router-link>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div>

			</div>
			<div class="head-nav-bar-top">
				<ul>
					<li>
						<router-link to="/">首页</router-link>
					</li>
					<!-- <li>
						<router-link to="/hotel">酒店</router-link>
					</li>
					<li>
						<router-link to="/tour">旅游</router-link>
					</li> -->
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	name: 'SideNav',
	props: {
		defaultStatus: {
			//初始状态值
			type: Boolean,
		},
		model: {
			//初始状态值
			type: Array,
			default: () => [],
		},
		line: {
			type: Boolean,
		},
	},
	data() {
		return {
			sideNavBarList: [],
		};
	},
	created() {
		this.getAllTypeList();
	},
	methods: {
		sideNavBarToggle(is) {
			if (!this.defaultStatus) return;
			const value = is ? 'block' : 'none';
			this.$refs.sideNavBarMain.style.display = value;
		},
		getAllTypeList() {
			this.$axios
				.getAllType()
				.then(({ data: { category = [], categoryBrand = [] } }) => {
					const list = category;
					list.forEach((e, i) => (e.brand = categoryBrand[i]));
					this.sideNavBarList = list;
				});
		},
	},
};
</script>

<style lang='scss'>
.head-nav-bar-wrap {
	background-color: #fff;
}

.head-nav-bar-wrap.line {
	border-bottom: 1px solid var(--c-color);
}

.head-nav-bar {
	font-size: 16px;
	display: flex;
}
.side-bar-wrap {
	width: 160px;
	height: 40px;
	background-color: var(--def-backdrop);
	text-align: center;
	position: relative;
	color: #fff;
}

.side-bar-all {
	display: flex;
	height: 40px;
	padding: 0 15px;
	align-items: center;
	box-sizing: border-box;
	padding-right: 5px;
	i {
		margin: 3px 23px 0 0;
	}
}

.head-nav-bar-top {
	ul li {
		display: inline-block;

		& > a {
			display: block;
			color: var(--def-color);
			padding: 0 25px;
			height: 40px;
			line-height: 40px;
			&.router-link-exact-active {
				color: var(--def-backdrop);
			}

			&:hover {
				color: var(--def-backdrop);
			}
		}
	}
}

.side-nav-bar-main {
	position: absolute;
	top: 40px;
	left: 0;
	z-index: 100;
}

.side-nav-bar-main ul li {
	display: block;

	p {
		display: flex;
		height: 40px;
		line-height: 40px;
		justify-content: space-between;
		align-items: center;
		width: 160px;
		background-color: var(--def-backdrop);
		box-sizing: border-box;
		border-top: 1px solid #fff;
		transition: all 0.1s;
		font-size: 14px;
		padding: 0 15px;
		span {
			width: 100px;
			text-align: left;
		}
		i {
			font-size: 18px;
			width: 20px;
		}
		i.right {
			margin-top: 4px;
		}

		i.left {
			margin-top: 3px;
			margin-right: 8px;
		}
	}

	&:hover p {
		background-color: #fff;
		color: var(--def-backdrop);
	}
}

.side-nav-bar-main-content {
	width: 940px;
	height: 480px;
	background-color: rgba(0, 0, 0, 0.1);
	border: 1px solid var(--def-backdrop);
	border-left: none;
	box-sizing: border-box;
	position: absolute;
	left: 160px;
	top: 0;
	display: none;
	background-color: #fff;
	color: #656565;
}

.content-item-wrap {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-between;
	& > div {
		height: 100%;
	}

	.before {
		width: 640px;
		margin-left: 20px;

		.before-type-item {
			width: 320px;
			height: 157px;
			float: left;
			overflow: hidden;

			.before-type-item-title {
				height: 44px;
				box-sizing: border-box;
				padding-top: 20px;
				text-align: left;
				font-size: 16px;
				color: var(--def-color);
				border-bottom: 1px solid #cbcbcb;
			}

			.before-type-item-list {
				width: 100%;
				li {
					padding-right: 20px;
					height: 28px;
					line-height: 28px;
					float: left;
					font-size: 12px;
					&:hover {
						text-decoration: underline;
					}
				}
			}
		}
	}
	.after {
		width: 260px;
		box-sizing: border-box;
		background-color: #ededed;
		padding: 7px 24px 20px 24px;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		align-content: flex-start;
		.after-type-item {
			width: 100px;
			height: 100px;
			background-color: #fff;
			display: inline-block;
			margin-top: 13px;
		}
	}
}

.side-nav-bar-main ul li:hover .side-nav-bar-main-content {
	display: block;
}
</style>
