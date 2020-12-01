 <template>
	<transition name="toast-animate" @after-leave="afterLeave">
		<div class='toast-wrap' v-show="visible" @click.stop="() => {}">
			<div class="toast-inner" @click.stop="() => {}" :style="{ width: width }">
				<slot name="header">
					<div class="toast-header">
						<span class="title">{{title}}{{width}}</span>
						<span class="close" @click="toastCancel"><i class="el-icon-close"></i></span>
					</div>
				</slot>

				<div class="toast-content">
					<slot></slot>
				</div>

				<slot name="footer">
					<div class="toast-footer">
						<span class="cancel-btn" @click="toastCancel">取消</span>
						<span class="submit-btn" @click="toastSubmit">确定</span>
					</div>
				</slot>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: '',
	props: {
		title: {
			type: String,
			default: '标题',
		},
		visible: {
			type: Boolean,
			defalut: false,
		},
		width: {
			type: String,
		},
	},
	data() {
		return {};
	},
	methods: {
		toastCancel() {
			this.$emit('update:visible', false);
		},
		toastSubmit() {
			this.$emit('success');
		},
		afterLeave() {
			this.$emit('cancel');
		},
	},
};
</script>

<style lang='scss' scoped>
.toast-wrap {
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	z-index: 1000;
	background-color: rgba(0, 0, 0, 0.3);
	box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.2);
	border-radius: 4px;
	text-align: center;
}

.toast-inner {
	display: inline-block;
	background-color: #fff;
	border-radius: 4px;
	min-width: 400px;
	margin: 15vh auto 50px;
	animation: move 0.3s forwards;
}

@keyframes move {
	0% {
		margin-top: 15vh;
	}

	100% {
		margin-top: 20vh;
	}
}

.toast-content {
	min-height: 100px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.toast-header {
	height: 55px;
	line-height: 55px;
	padding: 0 24px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid rgba(0, 0, 0, 0.09);
	.title {
		font-size: 16px;
		font-weight: 500;
	}
	.close {
		width: 16px;
		height: 16px;
		text-align: center;
		line-height: 16px;
		display: block;
		cursor: pointer;
	}
}

.toast-footer {
	display: flex;
	height: 50px;
	justify-content: center;
	align-items: center;
	border-top: 1px solid rgba(0, 0, 0, 0.09);
	span {
		height: 30px;
		line-height: 30px;
		padding: 0 16px;
		border-radius: 4px;
		cursor: pointer;
	}

	.cancel-btn {
		border: 1px solid #d9d9d9;
		margin-right: 20px;
	}

	.submit-btn {
		background-color: var(--def-backdrop);
		color: white;
	}
}

.toast-animate-enter-active,
.toast-animate-leave-active {
	transition: opacity 0.3s;
}
.toast-animate-enter,
.toast-animate-leave-to {
	opacity: 0;
}
</style>
