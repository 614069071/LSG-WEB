 <template>
	<!-- 绑定信息 -->
	<div class='account-bind-wrap'>
		<NavBar class="personal-center-left"></NavBar>

		<div class="personal-center-right">
			<div class="account-bind-title">账号绑定</div>
			<div class="account-main-title">我的主账号</div>
			<div class="account-main-content">
				<div class="phone-icon">
					<Cicon iconClass="icon-shouji1"></Cicon>
				</div>
				<div class="phone-number">189***4110</div>
			</div>

			<div class="account-bind-list-title">账号绑定后，可直接用其登录</div>

			<div class="account-bind-all">
				<div class="account-bind-item">
					<div class="before">
						<div class="bind-type weixin">
							<Cicon iconClass="icon-weixin1"></Cicon>
						</div>
						<div class="bind-type-name">微信</div>
						<i>|</i>
						<div>未绑定</div>
					</div>

					<div class="btn bind-btn">绑定</div>
				</div>

				<div class="account-bind-item">
					<div class="before">
						<div class="bind-type qq">
							<Cicon iconClass="icon-qq"></Cicon>
						</div>
						<div class="bind-type-name">QQ</div>
						<i>|</i>
						<div>未绑定</div>
					</div>

					<div class="btn bind-btn">绑定</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import NavBar from '../components/NavBar';

export default {
	name: '',
	components: { NavBar },
	data() {
		return {};
	},
	methods: {},
};
</script>

<style lang='scss' scoped>
.account-bind-title {
	height: 50px;
	line-height: 50px;
	font-size: 18px;
	border-bottom: 1px solid var(--e9-color);
}

.account-main-title {
	padding: 20px 0 10px 0;
	font-size: 16px;
	font-weight: 500;
}

.account-main-content {
	border: 1px solid var(--def-backdrop);
	background-color: #f4f9f8;
	height: 80px;
	display: flex;
	align-items: center;
	.phone-icon {
		width: 60px;
		height: 60px;
		margin-left: 20px;
		line-height: 65px;
		background-color: var(--def-backdrop);
		border-radius: 50%;
		color: var(--f-color);
		text-align: center;
		i {
			font-size: 40px;
		}
	}

	.phone-number {
		margin-left: 20px;
		font-size: 16px;
	}
}

.account-bind-list-title {
	padding: 40px 0 20px;
	border-bottom: 1px dashed var(--e9-color);
}

.account-bind-item {
	border-bottom: 1px dashed var(--e9-color);
	display: flex;
	height: 70px;
	align-items: center;
	justify-content: space-between;
	.before {
		display: flex;
		align-items: center;
		.bind-type {
			margin: 0 20px 0 25px;
			width: 36px;
			height: 36px;
			line-height: 36px;
			text-align: center;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			i {
				font-size: 24px;
				color: var(--f-color);
			}
		}

		.bind-type.weixin {
			background-color: #4cbf00;
		}

		.bind-type.qq {
			background-color: #23a0f0;
		}

		.bind-type-name {
			width: 88px;
			text-align: center;
		}

		& > i {
			padding-right: 20px;
			color: var(--e9-color);
		}
	}

	.btn {
		height: 30px;
		padding: 0 14px;
		line-height: 30px;
		border-radius: 4px;
		border: 1px solid #d9d9d9;
		color: rgba(0, 0, 0, 0.65);
	}

	.btn:hover {
		color: var(--def-backdrop);
		border-color: var(--def-backdrop);
	}
}
</style>
