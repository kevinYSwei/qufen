<template>
	<div class="previewsuc" v-on:userEvent="userEvent">
		<img src="../../assets/preview/shape.png" />
		<div class="preview-font">发布成功!{{c}}</div>
		<div class="cx-code">
			<div id="qrcode"></div>
			<div style="color: #363E4F;margin-top: 20px;">扫码预览</div>
			<button class="seek" @click="dian">点击查看</button>
		</div>
	</div>
</template>

<script>
	import QRCode from 'qrcodejs2'
	export default {
		data() {
			return {
				c: "",
				id: '',
				a: "",
				post:''
			}
		},
		mounted() {
//			 console.log(JSON.parse(localStorage.url))
			//获取用户类型和用户id
			this.post = JSON.parse(localStorage.url)
			//1-评测  2-讨论 3-文章',

			if(this.post.postType == 1) {
				//完整评测
				if(this.post.modelType == 2) {
					this.a = "articleInfo",
					this.id = this.post.postId

				}
				//单项测评
				if(this.post.modelType == 3) {
					this.a = "evaluationLitt",
					this.id = this.post.postId

				}
				if(this.post.modelType == 4) {
					this.a = "articleInfo",
					this.id = this.post.postId
				}
				//2 讨论
			} else if(this.post.postType == 2) {
				this.a = "discuss";
				this.id = this.post.postId
				//文章
			} else if(this.post.postType == 3) {
				this.a = 'article';
				this.id = this.post.postId
			}
			//调用二维码
			this.qrcode()
		},
		created() {
			this.$on("userEvent", function(data) { //接受兄弟的传值

				this.c = data
			})
		},
		methods: {
			dian(){

				if(this.post.postType == 1) {
					this.$router.push({
						path: "/project/articleInfo",
						query: {
							id:this.id.toString()
						}
					})
				}
				if(this.post.postType == 2) {
					this.$router.push({
						path: "/project/discuss",
						query: {
							id:this.id.toString()
						}
					})
				}
				if(this.post.postType == 3) {
					this.$router.push({
						path: "/project/article",
						query: {
							id:this.id.toString()
						}
					})
				}

			},
			userEvent(data) {
//				console.log(data)
			},
			qrcode() {
				let qrcode = new QRCode('qrcode', {
					width: 100,
					height: 100,
					text: 'https://m.qufen.top/project/' + this.a + '?id=' + this.id + '', // 二维码内容
					//        text: 'http://192.168.10.101:5000/project/'+this.a+'?id='+this.id+'',

					//					render: 'canvas', // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
					background: 'red',
					foreground: '#ff0',
					src: '../../assets/logo.png'
				})
				//				console.log(qrcode)
			}
		}
	}
</script>

<style>
	.previewsuc {
		text-align: center;
		width: 50%;
		margin: 0 auto;
		padding: 150px 0!important;
	}

	.preview-font {
		font-size: 20px;
		color: #3f8df3;
		margin-bottom: 20px;
	}

	#qrcode {
		text-align: center;
	}

	#qrcode img {
		display: inline!important;
	}
	.seek{
		margin-top: 15px;
		width: 70px;
		height: 30px;
		color: #fff;
		cursor: pointer;
		background-color:rgb(59, 136, 246);
		border-radius:4px;
		border: none;
		}
</style>
