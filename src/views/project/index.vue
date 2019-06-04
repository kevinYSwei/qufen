<template>
	<div>
		<!--<Header></Header>-->
		<div style="background-color:rgb(246,246,246) ;">
			<div class="commmon indexCommon">
				<!--左边文章-->
				<div class="common-article">
					<ul class="projectUl">
						<li class="projectTitle" style="padding: 15px 20px;">
							<div class="projectwrap projectSpecial">名称</div>
							<div class="projectwrap projectMiddle">关注</div>
							<div class="projectwrap projectH">评分</div>
						</li>
						<li style="cursor: pointer;" v-for="(item,index) in projectList">
							<div class="row row1">
								<div style="width: 900px;display: flex;align-items: center;" @click="projectdetail(item.projectId)">
									<div class="projectSpecial">
										<div class="photoP">
											<img :src="item.projectIcon">
										</div>
										<div class="pname">
											<div class="projectName"><span class="projectName-name">{{item.projectCode}}</span></div>
											<div class="projectNamedec">{{item.projectSignature}}</div>
										</div>
									</div>
									<div class="projectMiddle">
										<span class="projectNamedec1">{{item.followerNum}}</span>
									</div>
									<div>
										<span class="projectNamedec1">{{item.totalScore}}分</span>
									</div>
								</div>
								<div @click="attention(item.projectId,index)" class="discoveryBtn">
									+ 关注
								</div>
								<!--<div @click="cancelfollow(item.projectId,index)" v-if="followStatus==1" class="discoveryBtnAlready">
									已关注
								</div>-->
							</div>
						</li>

					</ul>
					<div class="block">
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage1" :page-size="10" layout="total, prev, pager, next" :total="totalSize">
						</el-pagination>
					</div>
				</div>
				<!--右边消息-->
				<div class="common-attention">
					<!--二维码-->
					<div class="attention-code  margin-bottom" @click="official">
						<div class="attention-wrap">
							<div class="common-attention-code">
								<div style="padding: 7px;">
									<img style="border-radius: 4px;" src="https://pic.qufen.top/Appdownload.png" />
								</div>
								<div class="attentionIcon">
									<img src="https://pic.qufen.top/posts201808291131215753.png" />
									<span class="attentionTitle">区分</span>
								</div>
								<p class="common-attention-down">币圈大众点评 下载区分APP</p>
							</div>
						</div>
					</div>
					<!--热门项目-->
					<div class="attention-hot attention-bag margin-bottom">
						<div class="attention-wrap">
							<div class="margin-bottom-10 " style="font-size: 13px;">本网站更多功能还在完善中，请耐心等待...</div>
							<div class="margin-bottom-10 " style="font-size: 13px;">官方QQ群：820043115</div>
							<div class="margin-bottom-10 " style="font-size: 13px;">微信公众号：qufenfind</div>
							<div class="margin-bottom-10 " style="font-size: 13px;">微信客服：qudong0405</div>
							<div class="margin-bottom-10 " style="font-size: 13px;">官方微信社区</div>
							<div class="common-attention-code">
								<div style="padding: 7px;">
									<img src="../../assets/common/wxcode.png" />
								</div>
							</div>

						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { project, saveFollow, cancelFollow } from '@/service/home';
	import Data from '../../assets/js/date'
	import { getCookie } from '../../assets/js/cookie.js'
	export default {
		name: 'project',
		data() {
			return {
				currentPage1: 1,
				token: getCookie('token'),
				projectList: [],
				totalSize: 0,
				followStatus: 0
			}
		},

		mounted() {
			//小于1600px   main-right展开
			//			this.resizeBannerImage();
			//			window.onresize = this.resizeBannerImage;

			this.resizeBannerImage1();
			window.addEventListener('resize', this.resizeBannerImage)
			//项目主页的接口
			this.project()
		},
		updated() {
			for(let i = 0; i < this.projectList.length; i++) {
				//							console.log(res.data.projectResponsePage.rows[i].followStatus)
				this.followStatus = this.projectList[i].followStatus
				if(this.projectList[i].followStatus == 1) {
					$(".discoveryBtn").eq(i).css({
						backgroundColor: "rgb(244, 244, 244)",
						color: "rgb(126, 126, 126)"
					})
					$(".discoveryBtn").eq(i).html("已关注")
				} else {
					$(".discoveryBtn").eq(i).css({
						backgroundColor: "rgb(59, 136, 246)",
						color: "rgb(255,255,255)"
					})
					$(".discoveryBtn").eq(i).html("+ 关注")
				}

			}
		},
		destroyed() {
			window.removeEventListener("resize", this.resizeBannerImage);
		},
		methods: {
			official() {
				window.open('https://g.qufen.top', "_blank")
			},
			attention(id, index) {
//				console.log($(".discoveryBtn").eq(index).html())
				if(this.token != "") {
					if($(".discoveryBtn").eq(index).html() == "已关注") {
						//取消关注
						let data = {
							token: this.token,
							followType: 1,
							followedId: id
						}
						
						cancelFollow(data).then(res => {
							if(res.code == 0) {
//								console.log(res.data.followStatus)
								if(res.data.followStatus == 0) {
//									console.log('取消关注')
									$(".discoveryBtn").eq(index).css({
										backgroundColor: "rgb(59, 136, 246)",
										color: "rgb(255,255,255)"
									})
									$(".discoveryBtn").eq(index).html("+ 关注")
								}
							}
						})
					} else {
						//去关注
						let data = {
							token: this.token,
							followType: 1,
							followedId: id
						}
						saveFollow(data).then(res => {
							if(res.code == 0) {

//								console.log(res.data.followStatus)
								if(res.data.followStatus == 1) {
//									console.log('已经关注')
									$(".discoveryBtn").eq(index).css({
										backgroundColor: "rgb(244, 244, 244)",
										color: "rgb(126, 126, 126)"
									})
									$(".discoveryBtn").eq(index).html("已关注")
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

			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);

			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				let data = {
					token: this.token,
					pageIndex: `${val}` - 0,
					pageSize: 10,
					tabId: 1
				}
				project(data).then(res => {
					if(res.code == 0) {
						console.log(res.data)
						this.projectList = res.data.projectResponsePage.rows
						this.totalSize = res.data.projectResponsePage.rowCount

					}
				})

			},
			resizeBannerImage1() {
				var _width = $(window).width();
				var _width1 = $(".common-article").offset().left
				//				console.log( _width1)

				var left = _width1 + 724
				$(".common-attention").css("left", left)

			},
			resizeBannerImage() {
				var _width = $(window).width();
				var _width1 = $(".common-article").offset().left
				// console.log(_width,_width1)

				var left = _width1 + 728
				$(".common-attention").css("left", left)

			},
			project() {

				// 查询数据
				let data = {
					token: this.token,
					pageIndex: 1,
					pageSize: 10,
					tabId: 1
				}
				project(data).then(res => {
					if(res.code == 0) {
						//						console.log(res.data)
						this.projectList = res.data.projectResponsePage.rows
						//总数据条数
						this.totalSize = res.data.projectResponsePage.rowCount - 0
						this.totalSize = Number(this.totalSize)

					}
				})

			},
			projectdetail(id) {
				window.open('/summary/projectdetail?id=' + id, "_blank")
				//this.$message('登陆后关注更多内容');
			}

		}
	}
</script>
<style lang="less">
	@import '../../css/global.css';
	@import '../../styles/common.less';
</style>