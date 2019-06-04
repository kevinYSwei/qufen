<style lang="less">
	@import './common.less';
	.ivu-steps .ivu-steps-head {
		background: none;
	}
	
	.ivu-steps .ivu-steps-title {
		background: none;
	}
	
	.check {
		font-size: 28px;
		color: #333333;
	}
	
	.ivu-steps {
		width: 70%;
		margin: 0 auto;
		padding-top: 30px;
	}
	
	.examine {
		
		/*padding-top: 100px;*/
	}
	
	.color {
		color: #333333;
	}
	
	.examineZ {
		margin-top: 50px;
		font-size: 28px;
	}
	
	.mes {
		font-size: 18px;
	}
	
	.againFill {
		width: 150px;
		height: 40px;
		margin: 30px auto 0;
		line-height: 40px;
		background: #408BF3;
		text-align: center;
		font-size: 18px;
		color: #FFFFFF;
		display: none;
	}
</style>
<template>
	<div class="realseCommon">
		<div class="qf-ofiicial">
			<div class="qf-attention">
				<Icon type="ios-navigate"></Icon>区分认证</div>
			<!--<p>当前正在进行第 {{ current + 1 }} 步</p>-->
			<div class="qf-select">
				<span class="check">审核结果</span>
			</div>
		</div>
		<div class="realseContent">
			<div class="qf-type">
				<Steps :current="current">
					<Step title="选择类型"></Step>
					<Step title="提交材料"></Step>
					<Step title="等待审核"></Step>
				</Steps>
			</div>
			<!--审核-->
			<div class="examine">
				<img class="examine-img" src="../../assets/img/shenZ.png" />
				<div class="examineZ color">审核中</div>
				<div class="mes color">请耐心等待3-5个工作日</div>
				<div style="cursor: pointer;font-size: 16px;" class="color" @click="go"><u>点击回到首页</u></div>
				<div class="againFill" @click="againFill">重新填写</div>
			</div>

		</div>

	</div>

</template>

<script>
	import { reviewedL } from '@/service/home'
	import { submitattention } from '@/service/attention'
	import { getCookie, } from '../../assets/js/cookie.js'
	export default {
		data() {
			return {
				current: 2,
				token: getCookie('token')
			}
		},
		mounted() {
			
			let data = {
				token: this.token
			}
			reviewedL(data).then(res => {
				// console.log(res.data);
				if(res.code == 0) {
//					console.log(res.data)
					//通过审核
					if(res.data.status == 2) {
						$(".examine-img").attr("src", "../../../static/img/shenG.png")
						$(".examineZ").html("审核成功")
						$(".mes").html("快去发声吧!");
					}
					//待审核
					else if(res.data.status == 1) {

						$(".examine-img").attr("src", "../../../static/img/shenZ.png")
						$(".examineZ").html("审核中!")
						$(".mes").html("请耐心等待3-5个工作日!");
					}
					//审核不通过
					else if(res.data.status == 3) {
						var reason = res.data.notpassreason;
						$(".examine-img").attr("src", "../../../static/img/shenNo.png")
						$(".examineZ").html("审核不通过!")
						$(".mes").html(reason);
						$(".againFill").css("display", "block")
					}
					//未提交审核
					else if(res.data.status == 4) {
						this.$router.push("/attentionSelect")
					}

				}
			}).catch(function(error) {
				console.log(error);
			});
			
		},
		methods: {
			againFill() {
				var _this = this
				let data = {
					token: this.token
				}
				submitattention(data).then(res => {
					// console.log(res.data);
					if(res.code == 0) {
						console.log(res.data)
						//通过审核
						if(res.data.status == 4) {
							this.$router.push("/attentionSelect");
						}
					}
				}).catch(function(error) {
					alert.log(error);
				});
			},
			go() {
				this.$router.push('/quhomelist')
			}
		}
	}
</script>