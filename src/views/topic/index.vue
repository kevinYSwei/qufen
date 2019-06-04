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
									<div><span class="topicOnedec">{{name}}</span></div>
									<div class="projectName-time">{{projectSignature}}</div>
								</div>
								
							</div>
							<div class="onecommon">
								<ul>
									<li class="ping" @click="next1"><span>评测</span></li>
									<li @click="next2"><span>讨论</span></li>
									<li @click="next3"><span>文章</span></li>
									
								</ul>
								<div class="topicSelect">
									<div @click="choiceness" class="choiceness choice1"><a href="javacript:void(0)">精选</a></div>
									<div @click="datenew" class="choiceness choice2"><a href="javacript:void(0)">最新</a></div>
								</div>
							</div>

						</div>
					</div>
					<div>
						<router-view/>
					</div>

				</div>
				<!--右边消息-->
				<div class="project-attention">
					<!--热门项目-->
					<div class="attention-hot attention-bag margin-bottom">
						<div class="attention-wrap">
							<div class="attention-hot-title" style="display: flex;align-items: center;">
								<img src="../../assets/common/tag.png" />
								<span class="attention-hot-pro">热门标签</span>
							</div>
							<div style="padding-top: 30px;">
								<ul class="topicTags">
									<li @click="tags(item.tagId)" class="topicTag" v-for="(item,index) in tag">{{item.tagName}}</li>
								</ul>
							</div>
						</div>
					</div>
					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {getDTagDetail,getDTagsInfo} from '@/service/topic';
	import { saveFollow, cancelFollow } from '@/service/home';
	import { getCookie } from '../../assets/js/cookie.js'
	import eventVue from '../../assets/js/event.js'
	export default {
		name: 'projectdetail',
		data() {
			return {
				activeNames: ['1'],
				id: '',
				token: getCookie('token'),
				projectIcon: '',
				name:'',
				projectSignature: '',
				isShow: true,
				activeUsers: [],
				userSignature: '',
				userId: 0,
				sort:1,
				tag:[]
			}
		},
		mounted() {
			$(".onecommon li").on("click", function() {
				var index = $(this).index();
//				console.log($(this).index())
				$(".onecommon li").removeClass("ping");
				$(this).addClass("ping");

			})

			this.id = this.$route.query.id - 0;
			//调用主页接口
			this.projectdetail()
			//调用精选的接口
			this.choiceness()
			//调用标签的接口
			this.getDTags()
			
			this.$router.push('/topic/evaluating?id=' + this.id)
//			this.$router.push('/topic/evaluating')
			
			//
			$(".choiceness").on("click", function() {
				var index = $(this).index();
				$(".choiceness a").css("color","rgb(51,51,51)")
				$(".choiceness a ").eq(index).css("color","rgb(59,136,246)")

			})
		},
		updated() {
			//点击关注
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
			//点击标签
			tags(id) {
				window.open('/topic?id=' + id, "_blank")
			},
			getDTags(){
				getDTagsInfo().then(res => {
					if(res.code == 0) {
//						console.log(res.data)
						this.tag = res.data
					}
				})
			},
			choiceness(){
				this.sort = 1
				eventVue .$emit("myFun",this.sort)   //$emit这个方法会触发一个事件
			},
			datenew(){
				this.sort = 2
				eventVue .$emit("myFun",this.sort)   //$emit这个方法会触发一个事件
//				console.log("最新")
			},
			projectdetail() {
				//				console.log(this.$route.query.id)
				this.id = this.$route.query.id - 0;
				var _this = this
				// 查询数据
				let data = {
					token: this.token,
					id:this.id
				}
				getDTagDetail(data).then(res => {
					if(res.code == 0) {
						this.projectIcon = res.data.imgPath
						this.name = res.data.tagName
						this.projectSignature = res.data.memo

					}
				})
			},
			next1() {
				this.$router.push('/topic/evaluating?id=' + this.id)
			},
			next2() {
				$(".choiceness a ").eq(0).css("color","rgb(59,136,246)")
				$(".choiceness a ").eq(1).css("color","rgb(51,51,51)")
				this.$router.push('/topic/discuss?id=' + this.id)
			},
			next3() {
				$(".choiceness a ").eq(0).css("color","rgb(59,136,246)")
				$(".choiceness a ").eq(1).css("color","rgb(51,51,51)")
				this.$router.push('/topic/article?id=' + this.id)
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
//								console.log(res.data.followStatus)
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

//								console.log(res.data.followStatus)
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
//								console.log(res.data.followStatus)
								if(res.data.followStatus == 0) {
//									console.log('取消关注')
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

//								console.log(res.data.followStatus)
								if(res.data.followStatus == 1) {
//									console.log('已经关注')
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
//								console.log(res.data.followStatus)
								if(res.data.followStatus == 0) {
//									console.log('取消关注')
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
//									console.log('已经关注')
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