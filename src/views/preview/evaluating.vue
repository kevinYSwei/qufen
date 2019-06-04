<template>
	<div>
		<div style="background-color:rgb(246,246,246) ;">
			<div class="commmon indexCommon">
				<!--左边文章-->
				<div class="common-article">
					<div class="detail-box evaluating">
						<div class="detailWrap">
							<div class="row row1">
								<div class="photo">
									<img slot="icon" :src="src">
								</div>
								<div class="name">
									<div class="projectName"><span class="projectName-name">{{username}} </span></div>
									<div class="projectName-time">{{timestr1}}</div>
								</div>
								<div @click="attention" class="discoveryBtn">
									+ 关注
								</div>
							</div>
							<div class="row articlerow2">
								<div class="detailtest">{{articleTitle}}</div>
								<div class="index-score">{{totalscore}}分</div>
							</div>
							<div v-html="m" class="articleContent">
								{{m}}
							</div>
							<div class="articleTag">
								<div class="crack-tag1"><span class="span-name">{{projectCode}}</span></div>
								<span class="crack-tag2" v-for="item1 in tagInfos">#{{item1.tagName}}#</span>
							</div>
						</div>

					</div>

				</div>
				<!--右边部分-->
				<div class="common-attention">
					<!--评测分数-->
					<div class=" attention-bag margin-bottom">
						<div class="attention-wrap">
							<div class="attention-hot-title">
								<div style="overflow: hidden;">
									<span class="scoreTitle totle">综合评分</span>
									<span class="totlescore" style="font-size: 16px;">{{totalscore}}分</span>
								</div>
								<div class="slider">
									<el-slider :max="10" style="width: 50%;display: inline-block;margin-left:6px" type="range" v-model="totalscore" :show-tooltip="false" disabled></el-slider>
								</div>
							</div>
							<div class="sliderList">
								<div style="padding: 10px;">
									<div v-for="item in storeList" class="attention-hot-title">
										<div style="overflow: hidden;">
											<span class="scoreTitle totle1">{{item.modelName}}</span>
											<span class="totlescore" style="font-size: 15px;">{{item.score}}分</span>
										</div>
										<div class="slider">
											<el-slider :max="10" style="width: 50%;display: inline-block;margin-left:6px" type="range" v-model="item.score" :show-tooltip="false" disabled></el-slider>
										</div>
									</div>

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
	import { articleInfo } from '@/service/home';
	import Data from '../../assets/js/date'
	import { getCookie } from '../../assets/js/cookie.js'
	export default {
		name: 'discovery',
		data() {
			return {
				value1: 8,
				id: '',
				articleTitle: '',
				src: '',
				username: '',
				totalscore: 0,
				storeList: [],
				m: '',
				donateNum: '',
				timestr: '',
				timestr1: '',
				donateNum: '',
				commentsNum: '',
				praiseNum: '',
				projectCode: '',
				tagInfos: []
			}
		},

		updated() {
			$('.articleContent').find('img').css({
				width: '80%',
				height: '80%'
			})
			$('.articleContent').find('p').css({
				fontSize: '15px',
				width: "100%",
				margin: "1em 0",
				wordWrap: "break-word",
				lineHeight: '26px'
			});
			$(".el-slider__runway.disabled .el-slider__bar").each(function() {
				$(".slider .el-slider__runway.disabled .el-slider__bar").eq(0).css("background-color", "rgb(60,137,247)")
				$(".totlescore").eq(0).css("color", "rgb(60,137,247)")

				$(".slider .el-slider__runway.disabled .el-slider__bar").eq(1).css("background-color", "rgb(83,199,252)")
				$(".totlescore").eq(1).css("color", "rgb(83,199,252)")

				$(".slider .el-slider__runway.disabled .el-slider__bar").eq(2).css("background-color", "rgb(255,150,0)")
				$(".totlescore").eq(2).css("color", "rgb(255,150,0)")

				$(".slider .el-slider__runway.disabled .el-slider__bar").eq(3).css("background-color", "rgb(255,206,0)")
				$(".totlescore").eq(3).css("color", "rgb(255,206,0)")

				$(".slider .el-slider__runway.disabled .el-slider__bar").eq(4).css("background-color", "rgb(255,115,156)")
				$(".totlescore").eq(4).css("color", "rgb(255,115,156)")

				$(".slider .el-slider__runway.disabled .el-slider__bar").eq(5).css("background-color", "rgb(255,40,81)")
				$(".totlescore").eq(4).css("color", "rgb(255,40,81)")

			});

		},
		mounted() {
			//小于1600px   main-right展开
			this.resizeBannerImage1();
			window.addEventListener('resize', this.resizeBannerImage)

			this.articleTitle = localStorage.articleTitle;
			this.m = localStorage.content;
			//			console.log(localStorage)
			this.src = getCookie("img")
			this.username = getCookie("user")
			//时间
			var nowdate = Data.customData()
			var arr = localStorage.publishTime.split(" ")
			//			console.log(arr,nowdate)

			this.timestr = arr[0];
			if(nowdate == this.timestr) {
				this.timestr1 = arr[1];
			} else {
				this.timestr1 = arr[0];
			}
			//总分
			this.totalscore = localStorage.totalscore - 0

			if(localStorage.tag != null) {
				var tagInfo = JSON.parse(localStorage.tag)
				if(tagInfo.length != 0) {
					this.tagInfos = JSON.parse(localStorage.tag)
				}
			}
			//自定义项
			if(localStorage.scoreList != null) {
				var storeList = JSON.parse(localStorage.scoreList)
				if(storeList.length != 0) {
					this.storeList = JSON.parse(localStorage.scoreList)
				} else {
					$(".sliderList").css("display", "none")
				}

			}

			var projectCode = localStorage.search.split("/")
			this.projectCode = projectCode[0]
		},
		destroyed() {
			window.removeEventListener("resize", this.resizeBannerImage);
		},
		methods: {
			resizeBannerImage1() {
				var _width = $(window).width();
				var _width1 = $(".common-article").offset().left
				// console.log(_width,_width1)

				var left = _width1 + 724
				$(".common-attention").css("left", left)

			},
			resizeBannerImage() {
				var _width = $(window).width();
				var _width1 = $(".common-article").offset().left
				// console.log(_width,_width1)

				var left = _width1 + 730
				$(".common-attention").css("left", left)

			},
			attention() {
				this.$alert('本功能目前只对APP开放', {
					confirmButtonText: '确定',
				});
			}
		}
	}
</script>
<style lang="less">
	@import '../details/details.css';
	@import '../../css/global.css';
</style>