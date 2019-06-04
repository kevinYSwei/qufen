<template>
	<div>
		<div style="background-color:rgb(246,246,246) ; ">
			<div class="commmon projectCommon">
				<div class="common-article">
					<!--信息-->
					<div class="common-article-wrap">
						<div class="common-article-content">
							<div class="row row1">
								<div class="onephoto">
									<img class="onephotoImg" :src="projectIcon">
								</div>
								<div style="margin-left: 20px;" class="name">
									<div><span class="oneusername">{{projectCode}}</span></div>
									<div><span class="onedec">{{followerNum}} 关注</span></div>
									<div class="projectName-time">{{projectSignature}}</div>
								</div>
								<div class="index-score projectScore">{{totalScore}}</div>
								<div @click="attention" class="discoveryBtn pt">
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
				<!--右边消息-->
				<div class="project-attention">
					<!--二维码-->
					<!--<div class="attention-code attention-bag margin-bottom">
						<div class="attention-wrap">
							<div class="common-attention-code">
								<div style="padding: 7px;">
									<img src="../../assets/common/download.png" />
								</div>
								<p class="common-attention-down">下载区分APP不一样的区分</p>
							</div>
						</div>
					</div>-->
					<!--热门项目-->
					<div class="attention-hot attention-bag margin-bottom">
						<div class="attention-wrap">
							<!--<div class="margin-bottom-10 " style="font-size: 13px;">本网站更多功能还在完善中，请耐心等待...</div>
							<div class="margin-bottom-10 " style="font-size: 13px;">官方QQ群：820043115</div>
							<div class="margin-bottom-10 " style="font-size: 13px;">官方微信：qudong0405</div>
							<div class="margin-bottom-10 " style="font-size: 13px;">微信客服：qudong0405</div>
							<div class="margin-bottom-10 " style="font-size: 13px;">官方微信社区</div>
							<div class="common-attention-code">
								<div style="padding: 7px;">
									<img src="../../assets/common/wxcode.png" />
								</div>
							</div>-->

							<div class="attention-hot-title">
								<img src="../../assets/project/introduction.png" />
								<span class="attention-hot-pro">项目介绍</span>
							</div>
							<p class="projectintroduce">
								<div class="projectintroduceS">
									{{projectDesc}}
								</div>
								<span @click="showToggle" class="projectmore">更多</span>
							</p>
							<div style="padding-top: 30px;">
								<ul class="attenList attenListname">
									<li>
										<span>英文名</span>
										<span>{{projectEnglishName}}</span>
									</li>
									<li>
										<span>中文名</span>
										<span>{{projectChineseName}}</span>
									</li>
									<li>
										<span>发行时间</span>
										<span>{{issueDateStr}}</span>
									</li>
									<!--<li class="specialleftname">
										<span class="leftname">官网</span>
										
									</li>-->
									<li>
										<span>相关概念</span>
										<span>{{projectTypeName}}</span>
									</li>
									<li>
										<span>链接</span>
										<span>
											<a target="_blank" :href="websiteUrl" class="rightname">官网</a>
										    <a target="_blank" :href="whitepaperUrl" class="rightname">白皮书</a>
										</span>
									</li>

								</ul>
							</div>
						</div>
					</div>
					<!--站长-->
					<div class="attention-user attention-bag margin-bottom">
						<div class="attention-wrap">
							<div class="attention-hot-title">
								<img src="../../assets/project/zhan.png" />
								<span class="attention-hot-pro">站长</span>
							</div>
							<ul class="attenList">
								<li>
									<div class="row rowList">
										<div class="oneuser" @click="onecenter">
											<div class="photoList">
												<img slot="icon" :src="zicon">
											</div>
											<div class="name">
												<div class="projectNameL"><span class="projectName-nameL">{{zuserName}}</span></div>
												<div class="projectName-timeL">{{userSignature}}</div>
											</div>
										</div>
										<div @click="zattention" style="cursor: pointer;" class="zbtnL">
											+ 关注
										</div>
									</div>
								</li>

							</ul>
						</div>
					</div>
					<!--活跃用户-->
					<div class="attention-active attention-user attention-bag margin-bottom">
						<div class="attention-wrap">
							<div class="attention-hot-title">
								<img src="../../assets/common/user.png" />
								<span class="attention-hot-pro">活跃用户</span>
							</div>
							<ul class="attenList">
								<li v-for="(active,index) in activeUsers">
									<div class="row rowList">
										<div class="oneuser" @click="onecenter1(active.userId)">
											<div class="photoList">
												<img slot="icon" :src="active.icon">
											</div>
											<div class="name">
												<div class="projectNameL">
													<span class="projectName-nameL">{{active.userName}}</span>
												</div>
												<div class="projectName-timeL">{{active.userSignature}}</div>
											</div>
										</div>
										<div style="cursor:pointer;" @click="hattention(active.userId,index)" class="btnL">
											+ 关注
										</div>
									</div>
								</li>

							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { projectIndex } from '@/service/project';
	import { saveFollow, cancelFollow } from '@/service/home';
	import { getCookie } from '../../assets/js/cookie.js'
	export default {
		name: 'projectdetail',
		data() {
			return {
				activeNames: ['1'],
				id: '',
				token: getCookie('token'),
				projectIcon: '',
				projectCode: '',
				projectTypeName: '',
				followerNum: '',
				raterNum: '',
				projectSignature: '',
				projectDesc: '',
				projectEnglishName: '',
				projectChineseName: '',
				issueDateStr: '',
				whitepaperUrl: '',
				websiteUrl: '',
				followStatus: 0,
				zfollowStatus: 0,
				totalScore: '',
				zicon: '',
				zuserName: '',
				isShow: true,
				activeUsers: [],
				userSignature: '',
				userId: 0
			}
		},
		mounted() {
			$(".onecommon li").on("click", function() {
				var index = $(this).index();
//				console.log($(this).index())
				$(".onecommon li").removeClass("ping");
				$(this).addClass("ping");

			})

			//小于1600px   main-right展开
			//			this.resizeBannerImage();
			//			window.onresize = this.resizeBannerImage;

//			console.log(this.$route.query.id)
			this.id = this.$route.query.id - 0;
			this.projectdetail()
			this.$router.push('/summary/evaluatingdetail?id=' + this.id)
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
			//站长
			if(this.zfollowStatus == 1) {
				$(".zbtnL").css({
					backgroundColor: "rgb(244, 244, 244)",
					color: "rgb(126, 126, 126)"
				})
				$(".zbtnL").html("已关注")
			} else {
				$(".zbtnL").css({
					backgroundColor: "rgb(59, 136, 246)",
					color: "rgb(255,255,255)"
				})
				$(".zbtnL").html("+ 关注")
			}
			//活跃用户
			for(let i = 0; i < this.activeUsers.length; i++) {

				//				this.followStatus = this.activeUsers[i].followStatus
				if(this.activeUsers[i].followStatus == 1) {
					$(".btnL").eq(i).css({
						backgroundColor: "rgb(244, 244, 244)",
						color: "rgb(126, 126, 126)"
					})
					$(".btnL").eq(i).html("已关注")
				} else {
					$(".btnL").eq(i).css({
						backgroundColor: "rgb(59, 136, 246)",
						color: "rgb(255,255,255)"
					})
					$(".btnL").eq(i).html("+ 关注")
				}

			}
		},
		methods: {
			//站长
			onecenter() {
				var id = this.userId
				window.open('/onecenter?id=' + id, "_blank")

			},
			//活跃用户
			onecenter1(id) {
				window.open('/onecenter?id=' + id, "_blank")
			
			},
			showToggle() {
				this.isShow = !this.isShow
				if(this.isShow) {
					
					$(".projectintroduceS").css({
						overflow: 'hidden',
						height: '78px',
						display: '-webkit-box'
					})
					$(".projectmore").html("更多")
				} else {
					$(".projectintroduceS").slideDown('fast')
					$(".projectintroduceS").css({
						overflow: 'inherit',
						height: 'inherit',
						display: 'block'
					})
					$(".projectmore").html("收起")
				}

			},
			handleChange(val) {
				console.log(val);
			},
			
			projectdetail() {
				//				console.log(this.$route.query.id)
				this.id = this.$route.query.id - 0;
				var _this = this
				// 查询数据
				let data = {
					token: this.token,
					projectId: this.id
				}
				projectIndex(data).then(res => {
					if(res.code == 0) {
						this.projectIcon = res.data.project.projectIcon
						this.projectCode = res.data.project.projectCode
						this.followerNum = res.data.project.followerNum
						this.raterNum = res.data.project.raterNum
						this.projectSignature = res.data.project.projectSignature
						this.projectDesc = res.data.project.projectDesc
						//英文名
						this.projectEnglishName = res.data.project.projectEnglishName
						//中文名
						this.projectChineseName = res.data.project.projectChineseName
						//发行时间
						this.issueDateStr = res.data.project.issueDateStr
						//官网地址
						this.websiteUrl = res.data.project.websiteUrl
						//白皮书地址
						this.whitepaperUrl = res.data.project.whitepaperUrl
						this.followStatus = res.data.project.followStatus
						//分数
						this.totalScore = res.data.project.totalScore
						//概念
						this.projectTypeName = res.data.project.projectTypeName
						//站长用户信息
						this.zicon = res.data.project.owner.icon
						this.zuserName = res.data.project.owner.userName
						this.userSignature = res.data.project.owner.userSignature
						this.userId = res.data.project.owner.userId
						this.zfollowStatus = res.data.project.owner.followStatus
						//活跃用户
						if(res.data.project.activeUsers!=null){
							this.activeUsers = res.data.project.activeUsers
						}else{
							$(".attention-active").css('display','none')
						}
						

					}
				})
			},
			next1() {
				this.$router.push('/summary/evaluatingdetail?id=' + this.id)
			},
			next2() {
				this.$router.push('/summary/burstdetail?id=' + this.id)
			},
			next3() {
				this.$router.push('/summary/articledetail?id=' + this.id)
			},
			attention() {
				if(this.token != '') {
					if($(".discoveryBtn").html() == "已关注") {
						//取消关注
						let data = {
							token: this.token,
							followType: 1,
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
						})
					} else {
						//去关注
						let data = {
							token: this.token,
							followType: 1,
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
						})
					}
				} else {
					this.$message({
						type: 'error',
						message: '登陆后关注更多内容',
						duration: 1000
					});
				}

			},
			zattention() {
				if(this.token != '') {
					if($(".zbtnL").html() == "已关注") {
						//取消关注
						let data = {
							token: this.token,
							followType: 3,
							followedId: this.userId
						}
						
						cancelFollow(data).then(res => {
							if(res.code == 0) {
								console.log(res.data.followStatus)
								if(res.data.followStatus == 0) {
									console.log('取消关注')
									$(".zbtnL").css({
										backgroundColor: "rgb(59, 136, 246)",
										color: "rgb(255,255,255)"
									})
									$(".zbtnL").html("+ 关注")
								}
							}
						})
					} else {
						//去关注
						let data = {
							token: this.token,
							followType: 3,
							followedId: this.userId
						}
						saveFollow(data).then(res => {
							if(res.code == 0) {

								console.log(res.data.followStatus)
								if(res.data.followStatus == 1) {
									console.log('已经关注')
									$(".zbtnL").css({
										backgroundColor: "rgb(244, 244, 244)",
										color: "rgb(126, 126, 126)"
									})
									$(".zbtnL").html("已关注")
								}
							}
						})
					}
				} else {
					this.$message({
						type: 'error',
						message: '登陆后关注更多内容',
						duration: 1000
					});
				}

			},
			//点击关注
			hattention(createUserId, index) {
				if(this.token != "") {
					var _this = this
					if($(".btnL").eq(index).html() == "已关注") {
						//取消关注
						let data = {
							token: this.token,
							followType: 3,
							followedId: createUserId
						}
						cancelFollow(data).then(res => {
							if(res.code == 0) {
								console.log(res.data.followStatus)
								if(res.data.followStatus == 0) {
									console.log('取消关注')
									$(".btnL").eq(index).css({
										backgroundColor: "rgb(59, 136, 246)",
										color: "rgb(255,255,255)"
									})
									$(".btnL").eq(index).html("+ 关注")
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
							followedId: createUserId
						}

						saveFollow(data).then(res => {
							if(res.code == 0) {

								//								console.log(res.data.followStatus)
								if(res.data.followStatus == 1) {
									console.log('已经关注')
									$(".btnL").eq(index).css({
										backgroundColor: "rgb(244, 244, 244)",
										color: "rgb(126, 126, 126)"
									})
									$(".btnL").eq(index).html("已关注")
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
				this.$router.push('/summary/evaluatingdetail')
			}
		},

	}
</script>
<style lang="less">
	@import '../../css/global.css';
	@import '../../styles/common.less';
</style>