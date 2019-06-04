<template>
	<div>
		<div style="background-color:rgb(246,246,246) ; ">
			<div class="commmon1">
				<div class="detailcommmon">
					<!--信息-->
					<div class="common-article-wrap">
						<div class="common-article-content">
							<div class="row row1">
								<div class="onephoto">
									<img class="oneceterImg" :src="src">
									<img class="imgV" src="" />
								</div>
								<div style="margin-left: 20px;" class="name">
									<div><span class="oneusername">{{userName}}</span></div>
									<div><span class="onedec">{{userSignature}}</span></div>
									<div class="projectName-time">{{fansNum}} 粉丝 </div>
								</div>
								<!--<div class="index-score projectScore">8.5分</div>-->
								<div @click="attention" class="discoveryBtn">
									+ 关注
								</div>
							</div>
							<div class="onecommon">
								<ul>
									<li class="ping" @click="next1"><span>评测</span></li>
									<li @click="next2"><span>讨论</span></li>
									<li @click="next3"><span>文章</span></li>
								</ul>
							</div>

						</div>
					</div>
					<div>
						<router-view/>
					</div>

				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import { getUserInfo } from '@/service/project';
	import { saveFollow, cancelFollow } from '@/service/home';
	import { getCookie } from '../../assets/js/cookie.js'
	export default {

		data() {
			return {
				id: '',
				token: getCookie('token'),
				src: '',
				userName: '',
				userSignature: '',
				fansNum: 0
			}
		},
		mounted() {
			$(".onecommon li").on("click", function() {
				var index = $(this).index();
//				console.log($(this).index())
				$(".onecommon li").removeClass("ping");
				$(this).addClass("ping");

			})
//			console.log(this.$route.query.id, this.token)
			this.id = this.$route.query.id - 0;
			this.projectone()
			this.$router.push('/summary/evaluatingcenter?id=' + this.id)
		},
		updated() {
			if(this.followStatus == 1) {
				$(".discoveryBtn").css({
					backgroundColor: "rgb(244, 244, 244)",
					color: "rgb(126, 126, 126)"
				})
				$(".discoveryBtn").html("已关注")
			} else {
				$(".discoveryBtn").css({
					backgroundColor: "rgb(59, 136, 246)",
					color: "rgb(255,255,255)"
				})
				$(".discoveryBtn").html("+ 关注")
			}
		},
		methods: {
			projectone() {
				this.id = this.$route.query.id - 0;
				// 查询数据
				let data = {
					userId: this.id,
					token: this.token
				}
				getUserInfo(data).then(res => {
					if(res.code == 0) {
						var data = res.data.user
						//						console.log(res.data.user)
						this.src = data.icon
						this.userName = data.userName
						this.userSignature = data.userSignature
						this.fansNum = data.fansNum
						this.followStatus = data.followStatus
						//头像加V
						var cuser = data.userType
						if(cuser == 1) {
							$(".imgV").css("display", "none")
						}
						//项目方
						if(cuser == 2) {
							$(".imgV").attr("src", "../../../static/img/p.gif")
						}
						//评测媒体
						if(cuser == 3) {
							$(".imgV").attr("src", "../../../static/img/F.gif")
						}
						//机构号
						if(cuser == 4) {
							$(".imgV").attr("src", "../../../static/img/V.gif")

						}
					}
				})
			},
			next1() {
				this.$router.push('/summary/evaluatingcenter?id=' + this.id)
			},
			next2() {
				this.$router.push('/summary/burstcenter?id=' + this.id)
			},
			next3() {
				this.$router.push('/summary/articlecenter?id=' + this.id)
			},
			attention() {
				var _this = this
				if(this.token != '') {
					if($(".discoveryBtn").html() == "已关注") {

						//取消关注
						let data = {
							token: this.token,
							followType: 3,
							followedId: this.id
						}
						cancelFollow(data).then(res => {
							if(res.code == 0) {
								console.log(res.data.followStatus)
								if(res.data.followStatus == 0) {
//									console.log('取消关注')
									$(".discoveryBtn").css({
										backgroundColor: "rgb(59, 136, 246)",
										color: "rgb(255,255,255)"
									})
									$(".discoveryBtn").html("+ 关注")
								}
							}
						}).catch(function(res) {
							_this.$message({
								showClose: true,
								message: res.msg,
								type: 'error'
							});
						});
					} else {
						//去关注
						let data = {
							token: this.token,
							followType: 3,
							followedId: this.id
						}
						saveFollow(data).then(res => {
							if(res.code == 0) {

								console.log(res.data.followStatus)
								if(res.data.followStatus == 1) {
//									console.log('已经关注')
									$(".discoveryBtn").css({
										backgroundColor: "rgb(244, 244, 244)",
										color: "rgb(126, 126, 126)"
									})
									$(".discoveryBtn").html("已关注")
								}
							}
						}).catch(function(res) {
							_this.$message({
								showClose: true,
								message: res.msg,
								type: 'error'
							});
						});
					}
				} else {
					this.$message({
						type: 'error',
						message: '登陆后关注更多内容',
						duration: 1000
					});
				}

			},
			evaluating() {
				this.$router.push('/project/evaluatingdetail')
			}
		},

	}
</script>
<style lang="less">
	@import '../../css/global.css';
	@import '../../styles/common.less';
</style>