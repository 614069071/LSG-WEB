 <template>
	<div class="retrieve-steps" v-if="list.length">
		<ul>
			<li v-for="(item,index) in list" :key="index" :class="{ active:index <= step}">
				<div class="circle">{{index + 1}}</div>
				<div class="text">{{item}}</div>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'SideSteps',
	props: {
		list: {
			type: Array,
			default: () => [],
		},
		step: {
			type: [String, Number],
			default: 0,
		},
	},
};
</script>

<style lang='scss' scoped>
.retrieve-steps {
	margin-top: 50px;
	position: relative;

	ul {
		display: flex;
		justify-content: center;

		li {
			color: var(--thir-color);
			z-index: 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;

			.circle {
				width: 40px;
				height: 40px;
				line-height: 40px;
				text-align: center;
				border-radius: 50%;
				font-size: 20px;
				background-color: #fff;
				border: 3px solid #ccc;
			}

			.text {
				position: absolute;
				white-space: nowrap;
				bottom: -20px;
				left: 50%;
				transform: translateX(-50%);
			}
		}

		li.active {
			.circle {
				background-color: var(--def-backdrop);
				border: 3px solid #a2e6e4;
				color: #fff;
			}

			.circle + div {
				color: var(--def-backdrop);
			}
		}

		li.active::before {
			background-color: var(--def-backdrop) !important;
		}

		li:not(:last-child) {
			margin-right: 146px;
		}

		li:not(:first-child) {
			&::before {
				content: '';
				position: absolute;
				display: block;
				width: 146px;
				height: 6px;
				background-color: #eee;
				right: 46px;
				top: 20px;
				z-index: -1;
			}
		}
	}
}
</style>