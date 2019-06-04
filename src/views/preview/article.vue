<template>
	<div style="background-color:rgb(246,246,246);" class="content1">
		<div class="detailArticle">
			<div class="detail-box">
				<div class="detailWrap">
					<div class="row row1">
						<div class="photo">
							<img slot="icon" :src="src">
						</div>
						<div class="name">
							<div class="projectName"><span class="projectName-name">{{username}} </span></div>
							<div class="projectName-time">{{timestr1}}</div>
						</div>
						<div  class="discoveryBtn">
							+ 关注
						</div>
					</div>
					<div class="row articlerow2">
						<!--标题-->
						<div class="detailtest">{{articleTitle}}</div>
						<!--<div class="index-score">8分</div>-->
					</div>
					<!--文章内容-->
					<div v-html="content" class="articleContent">
						{{content}}
					</div>
					<div class="articleTag">
						<div class="crack-tag1"><span class="span-name">{{projectCode}}</span></div>
						<span class="crack-tag2" v-for="item1 in tagInfos">#{{item1.tagName}}#</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	//	import Header from '@/components/common/home.vue'
	import { article } from '@/service/home';
	import Data from '../../assets/js/date'
	import { getCookie } from '../../assets/js/cookie.js'
	export default {
		data() {
			return {
				m: '',
				id: '',
				articleTitle: '',
				src: '',
				projectCode:'',
				username: '',
				timestr: '',
				timestr1: '',
				imgUrls: [],
				donateNum: '',
				commentsNum: '',
				praiseNum: '',
				articleContents: '',
				imgUrl: '',
				commendationListL: '',
				tagInfos: [],
				content: '',
				tagInfos:[]

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

		},
		mounted() {

			this.articleTitle = localStorage.articleTitle;
			this.content = localStorage.content;
			var tag = localStorage.search.split("/")

			if(tag[0]==""){
				$(".crack-tag1").css("display","none")
			}
			this.projectCode = tag[0]
			this.src = getCookie("img")
			this.username = getCookie("user")

			var nowdate = Data.customData()
			var arr = localStorage.publishTime.split(" ")
//			console.log(arr,nowdate)
			if(localStorage.tag!=null){
				var tagInfo = JSON.parse(localStorage.tag)
				if(tagInfo.length!=0){
					this.tagInfos = JSON.parse(localStorage.tag)
				}
			}
			
			this.timestr = arr[0];
			if(nowdate == this.timestr) {
				this.timestr1 =arr[1];
			} else {
				this.timestr1 = arr[0];
			}
			
		},
		methods: {
//			attention() {
//				this.$alert('', {
//					confirmButtonText: '确定',
//				});
//			}
		}
	}
</script>

<style>
	@import '../details/details.css';
	@import '../../css/global.css';
</style>