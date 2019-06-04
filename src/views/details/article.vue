<template>
	<div style="background-color:rgb(246,246,246);" class="content1">
		<div class="detailArticle">
			<div class="detail-box">
				<div class="detailWrap">
					<div class="row row1">
						<div class="oneuser" @click="onecenter">
							<div class="photo">
								<img slot="icon" :src="src">
							</div>
							<div class="name">
								<div class="projectName"><span class="projectName-name">{{username}} </span></div>
								<div class="projectName-time">{{timestr1}}</div>
							</div>
						</div>
						<div @click="attention" class="discoveryBtn">
							+ 关注
						</div>
					</div>
					<div class="row articlerow2">
						<!--标题-->
						<div class="detailtest">{{articleTitle}}</div>
						<!--<div class="index-score">8分</div>-->
					</div>
					<!--文章内容-->
					<div v-html="m" class="articleContent">
						{{m}}
					</div>
					<div class="articleTag">
						<div style="cursor: pointer;" @click="projectdetail" class="crack-tag1"><span class="span-name">{{tag}}</span></div>
						<span @click="tags(item1.tagId)" class="crack-tag2" v-for="item1 in tagInfos">{{item1.tagName}}</span>
					</div>
				</div>
				<div class="row articleRow5">
					<div class="article-atten">
						<!--赞助-->
						<div class="detail1 zan">
							<img src="../../assets/common/FIND.png">
							<label>{{postTotalIncome}}</label>
						</div>

					</div>
					<div class="articleDetail">
						<!--收藏-->
						<div class="detail index-preview">
							<img src="../../assets/common/shou.png">
							<label>收藏</label>
						</div>
						<!--分享-->
						<!--<div id="qrcode"></div>-->
						<div class="detail index-preview" @click="share">

							<el-popover title="扫码分享至朋友圈" placement="top-start" width="155" trigger="click">
								<div id="qrcode"></div>
								<span slot="reference" style="cursor: pointer;font-size: 14px; margin-left: 5px;color: #aaa;"><img class="hover-img" src="../../assets/common/share.png" alt="" />分享</span>
							</el-popover>
						</div>

						<!--评论-->
						<div class="detail index-preview">
							<img src="../../assets/common/preview.png">
							<label>{{commentsNum}}</label>
						</div>
						<!--点赞-->
						<div @click="thumbsup" class="detail zan">
							<img class="commonZan" src="../../assets/common/zan.png">
							<label class="thumbsupNum">{{praiseNum}}</label>
						</div>
					</div>
				</div>
				<!--写下评论-->
				<div class="articlePreview">
					<!--请写下你的评论-->
					<div class="articleF">
						<img style="float: left;" :src="img" />
						<div class="articleInputC articleInput"><input class="previewMessage" type="text" name="" placeholder="请写下您的评论..." /></div>
						<span @click="articleBack" class="articleBack">评论</span>
					</div>
					<!--评论-->
					<div class="previewContent">
						<h2 class="previewTitle">评论</h2>
						<div>
							<div class="contentList" v-for="item in newestComments">
								<div class="list">
									<div class="contenlist-title"><img :src="item.commentUserIcon" /></div>
									<span class="listName">{{item.commentUserName}}</span>
									<div class="listfloor">
										<span class="floor">{{item.createTimeStr}}</span>

									</div>
								</div>
								<p class="listContent">
									{{item.commentContent}}
								</p>

								<!--<div class="row articleRow">
									<div class="article-atten">
										<div class="detail1 zan">
											<img src="../../assets/common/FIND.png">
											<label>128</label>
										</div>
										<div class="detail index-preview">
											<img src="../../assets/common/preview.png">
											<label>111</label>
										</div>
									</div>

								</div>-->

							</div>

							<!--<div class="listContent">
								<div>
									<div>张三：@游来游去 <span class="listContentTime">03.15 11:15</span></div>
									<div>防弹也有很多舞台为了效果是预录的，可以很明显</div>
								</div>
							</div>

							<div class="row articleRow rowLeft">
								<div class="article-atten">
									<div class="detail1 zan">
										<img src="../../assets/common/zanS.png">
										<label>128</label>
									</div>
									<div class="detail index-preview">
										<img src="../../assets/common/preview.png">
										<label>111</label>
									</div>
								</div>

							</div>-->

						</div>
					</div>
				</div>

			</div>
			<!--加载更多-->
			<div class="row6 start">
				<span>加载中...</span>
			</div>
			<!--加载更多-->
			<div class="row6 end">
				<span>已经到底部了...</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { article, postCommentList, saveComment, savePostPraise } from '@/service/home';
	import QRCode from 'qrcodejs2'
	import Data from '../../assets/js/date'
	import { getCookie } from '../../assets/js/cookie.js'
	import { _isMobile } from '../../assets/js/mobile.js'
	import { saveFollow, cancelFollow } from '@/service/home';
	export default {
		data() {
			return {
				m: '',
				id: 0,
				articleTitle: '',
				src: '',
				username: '',
				userSignature: '',
				tag: '',
				timestr: '',
				timestr1: '',
				imgUrls: [],
				postTotalIncome: '',
				commentsNum: '',
				praiseNum: '',
				articleContents: '',
				imgUrl: '',
				commendationListL: '',
				tagInfos: [],
				token: getCookie('token'),
				followStatus: 0,
				newestComments: [],
				createUserId: 0,
				hasNext: false,
				pageIndex: 1,
				pageSize: 10,
				projectId: 0,
				length: 0,
				praiseStatus: 0,
				num: 0,
				uid: getCookie('uid'),
				seen: false,
				img: getCookie('img'),
			}
		},

		mounted() {

			this.id = this.$route.query.id;
			//请求文章
			this.articleC()
			//请求评论
			this.preview(),
				//监听滚动条
				window.addEventListener('scroll', this.scrollHandler)
			//判断是否是移动端，移动端自动跳转
			//			console.log(_isMobile())
			if(_isMobile()) {
				//				alert("手机端");
				window.location.href = "https://m.qufen.top/project/article?id=" + this.id
			} else {
				//				alert("pc端");
				return
			}

		},
		updated() {
			$('.articleContent').find('img').css({
				width: '80%',
				height: '100%'
			})
			$('.articleContent').find('p').css({
				fontSize: '15px',
				width: "100%",
				margin: "1em 0",
				wordWrap: "break-word",
				lineHeight: '26px'
			});
			//关注状态
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
			//点赞状态
			if(this.praiseStatus == 1) {
				$(".commonZan").attr("src", "../../static/img/zanb.png")
			}

		},
		methods: {
			//标签
			tags(id) {
				window.open('/topic?id=' + id, "_blank")
			},
			//点赞
			thumbsup() {
//				console.log(this.uid, this.createUserId)
				if(this.token != '') {
					//本人不能给本人点赞
					if(this.createUserId != this.uid) {
						//点击更换点赞图片
						$(".commonZan").attr("src", "../../static/img/zanb.png")
						if(this.praiseStatus == 1) {
							$(".commonZan").attr("src", "../../static/img/zanb.png")
						} else {

							this.num = $(".thumbsupNum").html() - 0
//							console.log(typeof this.num)
							this.seen = !this.seen

							if(this.seen == true) {
								this.num = this.num + 1
								$(".thumbsupNum").html(this.num)
							}
							let data = {
								token: this.token,
								postId: this.id - 0
							}
							//调接口
							savePostPraise(data).then(res => {
//								console.log(res.data)

							})
						}
					} else {

						this.$message({
							type: 'error',
							message: '不能对本人进行点赞',
							duration: 1000
						});
					}
				} else {
					this.$message({
						type: 'error',
						message: '请登录',
						duration: 1000
					});
				}

			},
			//评论
			articleBack() {
				var _this = this
				//评论内容
				var value = $(".previewMessage").val()
//				console.log(value.length)
				if(this.token != "") {
					if(value != '' && value.length != 0) {
						$(".previewContent").css('display', "block")

						//评论接口
						let data = {
							token: this.token,
							commentContent: value,
							postId: this.id - 0,
						}
						saveComment(data).then(res => {
							if(res.code == 0) {
								//将输入框清空
								$(".previewMessage").val("")
								this.preview()
							}
						}).catch(function(res) {
							//					alert(res.msg)
							if(res.code == 11024) {
								_this.$router.push('/user/login')
							}
						});
					} else {
						this.$message({
							type: 'error',
							message: '评论不能为空',
							duration: 1000
						});
					}

				} else {
					this.$message({
						type: 'error',
						message: '请登录',
						duration: 1000
					});
					this.$router.push('/user/login')

				}

			},
			share() {
				//调用二维码
				$("#qrcode img").remove()
				this.qrcode()
			},
			qrcode() {
				let qrcode = new QRCode('qrcode', {
					width: 100,
					height: 100,
					text: 'https://m.qufen.top/project/article?id=' + this.id + '', // 二维码内容
					//        text: 'http://192.168.10.101:5000/project/'+this.a+'?id='+this.id+'',

					//					render: 'canvas', // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
					background: 'red',
					foreground: '#ff0',
					src: '../../assets/logo.png'
				})

			},
			onecenter() {
				if(this.token != '') {
					var id = this.createUserId
					window.open('/onecenter?id=' + id, "_blank")
				} else {
					this.$message({
						showClose: true,
						message: '请登录',
						type: 'error'
					});
				}

			},
			//下滑加载
			scrollHandler() {
				var scrollTop = $(window).scrollTop(); // 滚动条Y轴滚动的距离
				var windowHeight = $(window).height(); // 可视区域的高度
				var scrollHeight = $(document).height(); // 整个内容的高度

				if(scrollTop + windowHeight == scrollHeight) {
					// alert('已经到浏览器底部了，这时你可以做你需要的业务了');
					this.previewmore()
				}
			},

			preview() {
				let data = {
					token: this.token,
					pageIndex: 1,
					pageSize: 5,
					postId: this.id - 0,
					postType: 3
				}
				postCommentList(data).then(res => {
					if(res.code == 0) {
						this.hasNext = res.data.newestComments.hasNext
						if(res.data.newestComments.rows != null) {

							this.newestComments = res.data.newestComments.rows
							//调用 Data.customData()
							var nowdate = Data.customData()
							//切割当前时间获取当前年份
							var time = nowdate.split("-")
							//						console.log(time[0])
							for(let i = 0; i < res.data.newestComments.rows.length; i++) {
								//时间  字符串切割

								var arr = res.data.newestComments.rows[i].createTimeStr.split(" ")
								this.timestr = arr[0];
								if(nowdate == this.timestr) {
									var a1 = arr[1].split(":")
									res.data.newestComments.rows[i].createTimeStr = a1[0] + ":" + a1[1];
								} else {
									//年份分割
									var year = this.timestr.split("-")
									//							console.log(year[0])
									if(time[0] == year[0]) {
										res.data.newestComments.rows[i].createTimeStr = year[1] + "-" + year[2];
									} else {
										res.data.newestComments.rows[i].createTimeStr = arr[0];
									}

								}

							}
							//							console.log(this.newestComments)
							this.length = res.data.newestComments.rows.length
							if(res.data.newestComments.rows.length > 4) {
								if(this.hasNext == false) {
									$(".end").css("display", "block")
									$(".start").css("display", "none")
								}
							} else {
								$(".start").css("display", "none")

							}
						} else {

							$(".previewContent").css('display', "none")
							$(".start").css("display", "none")
						}

					}
				}).catch(function(res) {
					$(".previewContent").css('display', "none")
					$(".start").css("display", "none")
				});
			},
			previewmore() {
				if(this.newestComments.length != 0) {
					if(this.hasNext == true) {
						this.pageIndex = parseInt(this.pageIndex) + 1

						let data = {
							token: this.token,
							pageIndex: this.pageIndex,
							pageSize: 5,
							postId: this.id - 0,
							postType: 3
						}
						postCommentList(data).then(res => {
							if(res.code == 0) {
								this.hasNext = res.data.newestComments.hasNext
								if(res.data.newestComments.rows != null) {
									//调用 Data.customData()
									var nowdate = Data.customData()
									//切割当前时间获取当前年份
									var time = nowdate.split("-")
									//						console.log(time[0])
									for(var i = 0; i < res.data.newestComments.rows.length; i++) {

										//时间  字符串切割
										var arr = res.data.newestComments.rows[i].createTimeStr.split(" ")
										this.timestr = arr[0];
										if(nowdate == this.timestr) {
											var a1 = arr[1].split(":")
											res.data.newestComments.rows[i].createTimeStr = a1[0] + ":" + a1[1];
										} else {
											//年份分割
											var year = this.timestr.split("-")
											//							console.log(year[0])
											if(time[0] == year[0]) {
												res.data.newestComments.rows[i].createTimeStr = year[1] + "-" + year[2];
											} else {
												res.data.newestComments.rows[i].createTimeStr = arr[0];
											}

										}

										this.newestComments.push(res.data.newestComments.rows[i]);
									}

								}
								if(this.hasNext == false) {
									$(".end").css("display", "block")
									$(".start").css("display", "none")
								}

							}
						})
					} else {
						$('.end').css('display', "block")
						$('.start').css('display', "none")
					}
				}

			},
			articleC() {
				//发送请求
				var data = {
					token: this.token,
					postId: this.id - 0
				}

				article(data).then(res => {
					if(res.code == 0) {
						var data = res.data.articleDetail
						res.data.articleDetail.seen = false
						this.seen = res.data.articleDetail.seen
						//文章内容
						this.m = data.articleContents

						//标题
						this.articleTitle = data.postTitle
						//头像
						this.src = data.createUserIcon;
						//用户名
						this.username = data.createUserName;
						//
						this.userSignature = data.createUserSignature;
						//关注状态
						this.followStatus = data.followStatus
						this.projectId = data.projectId
						//点赞状态
						this.praiseStatus = data.praiseStatus
						this.createUserId = data.createUserId
						//标签
						this.tag = data.projectCode;
						if(data.tagInfos != null && data.tagInfos.length != 0) {
							this.tagInfos = JSON.parse(data.tagInfos)

						}

						//时间  字符串切割
						//调用 Data.customData()
						var nowdate = Data.customData()
						//切割当前时间获取当前年份
						var time = nowdate.split("-")
						//						console.log(time[0])
						var arr = data.createTimeStr.split(" ")

						this.timestr = arr[0];
						if(nowdate == this.timestr) {
							var a1 = arr[1].split(":")
							this.timestr1 = a1[0] + ":" + a1[1];
						} else {
							//年份分割
							var year = this.timestr.split("-")
							//							console.log(year[0])
							if(time[0] == year[0]) {
								this.timestr1 = year[1] + "-" + year[2];
							} else {
								this.timestr1 = arr[0];
							}

						}

						//赞助人数
						if(data.postTotalIncome==null){
							data.postTotalIncome="待结算"
						}
						this.postTotalIncome = data.postTotalIncome;
						//评论人数
						this.commentsNum = data.commentsNum;
						//点赞人数
						this.praiseNum = data.praiseNum;
						this.createUserId = data.createUserId

					}

				})

			},
			attention() {
				var _this = this
				if(this.token != '') {
					if($(".discoveryBtn").html() == "已关注") {

						//取消关注
						let data = {
							token: this.token,
							followType: 3,
							followedId: this.createUserId
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
							followType: 3,
							followedId: this.createUserId
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
			projectdetail() {
				var id = this.projectId
				window.open('/summary/projectdetail?id=' + id, "_blank")

			}
		}
	}
</script>

<style>
	@import './details.css';
	@import '../../css/global.css';
</style>