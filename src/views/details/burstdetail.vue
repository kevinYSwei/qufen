<template>
	<div>
		<div style="background-color:rgb(246,246,246) ;">
			<div class="detailcommmon">
				<!--左边文章-->
				<div class="onedetailArticle">
					<!--如果没有数据显示的样式-->
					<div class="common-article-wrap commonNowrap">
						<div class="commonNocontent">
							<img src="../../assets/common/content.png" />
						</div>
					</div>
					<!--文章-->
					<div class="common-article-wrap" v-for="(item,index) in itemList">
						<div class="common-article-content">
							<div class="row row1">
								<div class="oneuser" @click="onecenter(item.createUserId)">
									<div class="photo">
										<img slot="icon" :src="item.createUserIcon">
									</div>
									<div class="name">
										<div class="projectName"><span class="projectName-name">{{item.createUserName}} </span></div>
										<div class="projectName-time">{{item.createTimeStr}}</div>
									</div>
								</div>
								<div @click="attention(item.createUserId,index)" class="discoveryBtndetail">
									+ 关注
								</div>
							</div>
							<div style="cursor: pointer" @click="article(item.postType,item.postId)">
								<div class="row row2" v-if="item.postTitle">
									<div class="test">{{item.postTitle}}</div>
									<div v-if="item.postType==1" class="index-score">{{item.totalScore}}分</div>
								</div>
								<div class="row row3 burstcontent">
									<div class="discoveryContent">
										<!--缩略图-->
										<div v-for="item1 in item.postSmallImagesList" class="contentImg">
											<img :src="item1.fileUrl" />
										</div>
										<p class="row3-content add">
											{{item.postShortDesc}}
										</p>
									</div>
								</div>

							</div>
							<div class="row4">
								<!--标签-->
								<div class="crack-tag1"><span class="span-name">{{item.projectCode}} </span></div>
								<span @click="tags(item1.tagId)" class="crack-tag2" v-if="item.tagInfos" v-for="item1 in item.tagInfos">{{item1.tagName}}</span>
							</div>
						</div>
						<div class="row5" style="cursor: pointer;">
							<div class="article-atten">
								<span v-if="item.postType==1" class="atten-name">评测</span>
							</div>
							<div class="article-detail">
								<!--打赏-->
								<div class="detail zan">
									<img src="../../assets/common/FIND.png">
									<label>{{item.postTotalIncome}}</label>
								</div>
								<!--点赞-->
								<div @click="thumbsup(index,item.postId,item.createUserId,item.praiseStatus)" class="detail index-preview">
									<img class="commonZan" src="../../assets/common/zan.png">
									<label class="thumbsupNum">{{item.praiseNum}}</label>
								</div>
								<div class="detail index-preview">
									<img src="../../assets/common/preview.png">
									<label>{{item.commentsNum}}</label>
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
		</div>
	</div>
</template>

<script>
	import { discussList } from '@/service/project';
	import { saveFollow, cancelFollow, savePostPraise } from '@/service/home';
	import Header from '@/components/layout/header.vue'
	import Data from '../../assets/js/date'
	import { getCookie } from '../../assets/js/cookie.js'
	export default {
		name: 'evaluatingdetail',
		data() {
			return {
				value: 5,
				postImage: [],
				pageIndex: 1,
				pageSize: 10,
				itemList: [],
				allLoaded: false, //是否可以上拉属性，false可以加载，true为禁止加载，就是不让往上划加载数据了
				totalpage: 0,
				loading: false,
				timestr: '',
				postType: "",
				state: "",
				tagInfos: [],
				token: getCookie('token'),
				hasNext: true,
				num: 0,
				uid: 0
			}
		},
		components: {
			Header
		},

		mounted() {
			//			console.log(this.$route.query.id)
			this.id = this.$route.query.id - 0;

			this.loadPageList() //加载文章
			//监听滚动条
			window.addEventListener('scroll', this.scrollHandler)
		},
		updated() {
			if(this.itemList != null) {
				for(let i = 0; i < this.itemList.length; i++) {
					if(this.itemList[i].postSmallImagesList == null || this.itemList[i].postSmallImagesList.length == 0) {
						$(".add").eq(i).removeClass("row3-content")
						$(".add").eq(i).addClass("srow3-content")

					}

					this.followStatus = this.itemList[i].followStatus
					if(this.itemList[i].followStatus == 1) {
						$(".discoveryBtndetail").eq(i).css({
							backgroundColor: "rgb(244, 244, 244)",
							color: "rgb(126, 126, 126)"
						})
						$(".discoveryBtndetail").eq(i).html("已关注")
					} else {
						$(".discoveryBtndetail").eq(i).css({
							backgroundColor: "rgb(59, 136, 246)",
							color: "rgb(255,255,255)"
						})
						$(".discoveryBtndetail").eq(i).html("+ 关注")
					}
					//点赞
					if(this.itemList[i].praiseStatus == 1) {
						$(".commonZan").eq(i).attr("src", "../../static/img/zanb.png")
					}

				}
			}

		},
		destroyed() {
			window.removeEventListener("scroll", this.scrollHandler);
		},
		methods: {
			//标签
			tags(id) {
				window.open('/topic?id=' + id, "_blank")
			},
			//点赞
			thumbsup(index, postId, createUserId, praiseStatus) {
				//				console.log(this.uid, createUserId)
				if(this.token != '') {
					//本人不能给本人点赞
					if(createUserId != this.uid) {
						//点击更换点赞图片
						$(".commonZan").eq(index).attr("src", "../../static/img/zanb.png")
						if(praiseStatus == 1) {
							$(".commonZan").eq(index).attr("src", "../../static/img/zanb.png")
						} else {

							this.num = $(".thumbsupNum").eq(index).html() - 0
							//							console.log(typeof this.num)
							this.itemList[index].seen = !this.itemList[index].seen

							if(this.itemList[index].seen == true) {
								this.num = this.num + 1
								$(".thumbsupNum").eq(index).html(this.num)
								this.flag = true
							}
							let data = {
								token: this.token,
								postId: postId
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
			onecenter(id) {
				window.open('/onecenter?id=' + id, "_blank")
			},
			//下滑加载
			scrollHandler() {
				var scrollTop = $(window).scrollTop(); // 滚动条Y轴滚动的距离
				var windowHeight = $(window).height(); // 可视区域的高度
				var scrollHeight = $(document).height(); // 整个内容的高度
				if(scrollTop + windowHeight == scrollHeight) {
					// alert('已经到浏览器底部了，这时你可以做你需要的业务了');
					this.more()
				}
			},
			attention(createUserId, index) {
				//				console.log(createUserId)
				var _this = this
				if(this.token != "") {
					//					console.log($(".discoveryBtndetail").eq(index).html())
					if($(".discoveryBtndetail").eq(index).html() == "已关注") {
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
									$(".discoveryBtndetail").eq(index).css({
										backgroundColor: "rgb(59, 136, 246)",
										color: "rgb(255,255,255)"
									})
									$(".discoveryBtndetail").eq(index).html("+ 关注")
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
									$(".discoveryBtndetail").eq(index).css({
										backgroundColor: "rgb(244, 244, 244)",
										color: "rgb(126, 126, 126)"
									})
									$(".discoveryBtndetail").eq(index).html("已关注")
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
			article(postType, id) {
				//帖子类型：1-评测；2-爆料；3-文章，4-单项评测
				if(postType == 1) {
					window.open('/project/articleInfo?id=' + id, "_blank")
				} else if(postType == 2) {
					window.open('/project/discuss?id=' + id, "_blank")
				} else if(postType == 3) {
					window.open('/project/article?id=' + id, "_blank")
				}

			},
			loadPageList() {
				// 查询数据
				let data = {
					pageIndex: 1,
					pageSize: 10,
					projectId: this.id,
					token: this.token
				}
				discussList(data).then(res => {

					if(res.data.discusses.rows != null) {
						this.itemList = res.data.discusses.rows;
						if(res.data.discusses.rows.length <= 2) {
							$(".start").css("display", "none")
						}
						this.hasNext = res.data.discusses.hasNext
						for(var i = 0; i < res.data.discusses.rows.length; i++) {
							//待结算
							if(res.data.discusses.rows[i].postTotalIncome == null) {
								res.data.discusses.rows[i].postTotalIncome = "待结算"
							}

							if(res.data.discusses.rows[i].postSmallImagesList != null) {
								if(res.data.discusses.rows[i].postSmallImagesList.length != 0) {
									res.data.discusses.rows[i].postSmallImagesList = res.data.discusses.rows[i].postSmallImagesList.slice(0, 1)
								}

							}

							//时间  字符串切割
							//调用 Data.customData()
							var nowdate = Data.customData()
							//切割当前时间获取当前年份
							var time = nowdate.split("-")
							//						console.log(time[0])
							var arr = res.data.discusses.rows[i].createTimeStr.split(" ")

							this.timestr = arr[0];
							if(nowdate == this.timestr) {
								var a1 = arr[1].split(":")
								res.data.discusses.rows[i].createTimeStr = a1[0] + ":" + a1[1];
							} else {
								//年份分割
								var year = this.timestr.split("-")
								//							console.log(year[0])
								if(time[0] == year[0]) {
									res.data.discusses.rows[i].createTimeStr = year[1] + "-" + year[2];
								} else {
									res.data.discusses.rows[i].createTimeStr = arr[0];
								}

							}

							if(res.data.discusses.rows[i].tagInfos != null) {
								this.tagInfos = JSON.parse(res.data.discusses.rows[i].tagInfos)
								// console.log(this.tagInfos)
								res.data.discusses.rows[i].tagInfos = this.tagInfos
							}

						}
						if(res.data.discusses.rows.length > 2) {
							if(this.hasNext == false) {
								$(".end").css("display", "block")
								$(".start").css("display", "none")
							}
						}

					} else {
						$(".start").css("display", "none")
						$(".commonNowrap").css("display", "block")
					}

				})

			},

			more() {
				// 分页查询
				if(this.hasNext == true) {
					this.pageIndex = parseInt(this.pageIndex) + 1;
					let params = {
						pageIndex: this.pageIndex,
						pageSize: 10,
						projectId: this.id,
						token: this.token
					}
					discussList(params).then(res => {
						this.hasNext = res.data.discusses.hasNext
						for(var i = 0; i < res.data.discusses.rows.length; i++) {
							this.itemList.push(res.data.discusses.rows[i]);
							//待结算
							if(res.data.discusses.rows[i].postTotalIncome == null) {
								res.data.discusses.rows[i].postTotalIncome = "待结算"
							}
							if(res.data.discusses.rows[i].postSmallImagesList != null) {
								if(res.data.discusses.rows[i].postSmallImagesList.length != 0) {
									res.data.discusses.rows[i].postSmallImagesList = res.data.discusses.rows[i].postSmallImagesList.slice(0, 1)
								}

							}

							//时间  字符串切割
							//调用 Data.customData()
							var nowdate = Data.customData()
							//切割当前时间获取当前年份
							var time = nowdate.split("-")
							//						console.log(time[0])
							var arr = res.data.discusses.rows[i].createTimeStr.split(" ")

							this.timestr = arr[0];
							if(nowdate == this.timestr) {
								var a1 = arr[1].split(":")
								//									console.log(a1)
								res.data.discusses.rows[i].createTimeStr = a1[0] + ":" + a1[1];
								//									console.log(res.data.discusses.rows[i].createTimeStr)
							} else {
								//年份分割
								var year = this.timestr.split("-")
								//							console.log(year[0])
								if(time[0] == year[0]) {
									res.data.discusses.rows[i].createTimeStr = year[1] + "-" + year[2];
								} else {
									res.data.discusses.rows[i].createTimeStr = arr[0];
								}

							}
							if(res.data.discusses.rows[i].tagInfos != null) {
								this.tagInfos = JSON.parse(res.data.discusses.rows[i].tagInfos)
								// console.log(this.tagInfos)
								res.data.discusses.rows[i].tagInfos = this.tagInfos
							}

						}
						if(this.hasNext == false) {
							$(".end").css("display", "block")
							$(".start").css("display", "none")
						}
					})
				} else {
					$(".end").css("display", "block")
					$(".start").css("display", "none")
				}

			},

		}
	}
</script>
<style lang="less">
	@import '../../css/global.css';
	@import '../../styles/common.less';
</style>