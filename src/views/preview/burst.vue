<template>
	<div>
		<div style="background-color:rgb(246,246,246);" class="content1">
			<div class="detailArticle">
				<div class="detail-box">
					<div class="detailWrap">
						<div class="row row1">
							<div class="photo">
								<img slot="icon" :src="src" alt="区分">
							</div>
							<div class="name">
								<div class="projectName"><span class="projectName-name">{{username}} </span></div>
								<div class="projectName-time">{{timestr1}}</div>
							</div>
							<div  class="discoveryBtn">
								+ 关注
							</div>
						</div>
						<!--<div class="row articlerow2">
							<div class="detailtest">{{articleTitle}}</div>
						</div>-->
						<div class="articleContent">
							<div class="disscussContents">
								<pre id="prep" v-html>{{disscussContents}}</pre>
							</div>
							<div class="burstImg">
								<img v-for="(img,index) in postImg" @click="img1(index)" :class="{scale:index==isScale}" :style="fun(index)" :src="img.fileUrl" />
							</div>
						</div>
						<div class="articleTag">
							<div class="crack-tag1"><span class="span-name">{{projectCode}}</span></div>
              <span class="crack-tag2"  v-for="item1 in tagInfos">#{{item1.tagName}}#</span>
						</div>
					</div>
					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
//	import { discuss } from '@/service/home';
	import Data from '../../assets/js/date'
	import { getCookie } from '../../assets/js/cookie.js'
	export default {
		data() {
			return {
				isScale: undefined,
				articleTitle:'',
				disscussContents:'',
				projectCode:'',
				tag:'',
				src:'',
				username:'',
				timestr:'',
				timestr1:'',
				postImg:[],
       			 tagInfos:[]

			}
		},

		mounted() {
			
			this.articleTitle = localStorage.articleTitle;
			this.disscussContents = localStorage.content;
			var tag = localStorage.search.split("/")
//			console.log(tag[0])
			if(tag[0]==""){
				$(".crack-tag1").css("display","none")
			}
			this.projectCode = tag[0]
//			console.log(localStorage.tag)
			if(localStorage.tag!=null){
				var tagInfo = JSON.parse(localStorage.tag)
				if(tagInfo.length!=0){
					this.tagInfos = JSON.parse(localStorage.tag)
				}
			}
			
			this.src = getCookie("img")
			this.username = getCookie("user")
            //时间
			var nowdate = Data.customData()
			var arr = localStorage.publishTime.split(" ")
//			console.log(arr,nowdate)
			
			this.timestr = arr[0];
			if(nowdate == this.timestr) {
				this.timestr1 =arr[1];
			} else {
				this.timestr1 = arr[0];
			}
			
			if(localStorage.postImg!=null){
				this.postImg = JSON.parse(localStorage.postImg)
				if(this.postImg.length!=0){
					this.postImg = this.postImg.splice(0,3)
				}else{
					$(".burstImg").css("display","none")
				}
			}
			
		},
		updated() {
			$('.disscussContents').find('img').css({
				width: '80%',
				height: '100%'
			})
			$('.disscussContents').find('p').css({
				fontSize: '15px',
				width: "100%",
				margin: "1em 0",
				wordWrap: "break-word",
				lineHeight: '26px'
			});

		},
		methods: {
//			attention() {
//				this.$alert('本功能目前只对APP开放', {
//					confirmButtonText: '确定',
//				});
//			},
			fun(index) {
				if(index <= 3) {
					var str = "left:" + (index * 240) + "px";
					return str;
				} else {
					$(".project-img1").eq(index).css("display", "none");
				}
			},
			img1(index) {
				if(index == index) {
					this.isScale = this.isScale === index ? undefined : index
				}

			}
		}
	}
</script>

<style>
	@import '../details/details.css';
	@import '../../css/global.css';
</style>
