<template>
	<div class="discussion">
		<h1 class="showprojectH">发表讨论</h1>
		<div class="cx-addproject">
			<!--文字内容-->
			<div class="evaluation" style="margin-top:0;">

				<div class="progess"><img class="previewSelect" src="../../assets/preview/red.png" />讨论内容 <span class="add-title1">(内容300 / 剩余<span id="word"> 300</span>个)</span>
				</div>
				<!--引simditor文本编译器-->
				<!--<Simditor></Simditor>-->
				<Input class="disText margin-top-20" @keyup.native="up" @keydown.native="down" id="weibo" v-model="value6" type="textarea" :rows="6" placeholder="输入内容"></Input>
			</div>
			<!--图片上传-->
			<div style="color: black;font-size: 12px;">
				<h3 class="p margin-top-20">上传图片<span style="font-size: 13px;font-weight: 400;margin-left: 15px;">选择图片上传，支持jpg.png. 小于5M，最多9张</span></h3>
				<div class="max-nine">

					<div class="demo-upload-list" v-for="item in uploadList">
						<template v-if="item.status === 'finished'">
							<img :src="item.url">
							<div class="demo-upload-list-cover">
								<Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
								<Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
							</div>
						</template>
					</div>
					<Upload ref="upload" name="file" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="5120" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" multiple type="drag" action="https://upload-z2.qiniup.com" :data="uptoken" style="display: inline-block;width:58px;">
						<div style="width: 58px;height:58px;line-height: 58px;">
							<Icon type="ios-camera" size="20"></Icon>
						</div>
					</Upload>

				</div>
				<Modal title="View Image" v-model="visible">
					<img :src="imgName" v-if="visible" style="width: 100%">
				</Modal>
			</div>
			<!--项目选择-->
			<div class="xm margin-top-20">
				<h3 class="pos1 p">项目</h3>
				<!--模糊查询币种-->
				<Search style="margin-left: 76px;" @aa="getA($event)"></Search>
				<span class="select">请选择相应的区块链项目</span>
			</div>

			<!--标签选择和保存文章-->
			<div>
				<h3 class="p margin-top-20">选择标签 <span class="newTags">选择讨论标签，最多三个</span></h3>
				<div class="max-nine" v-for="(item,index1) in tag">
					<div class="previewfontSize">{{item.typeName}}</div>
					<ul class="label">
						<li class="labelLi" v-for="(item1,index) in item.dtagsList" @click="dian(item1.tagName,item1.tagId,index,index1)">{{item1.tagName}}</li>
					</ul>
				</div>
				<Row class="margin-top-20 publish-button-con">
					<span class="publish-button"><Button @click="handlePublish" :loading="publishLoading" icon="ios-checkmark" style="width:90px;" type="primary">发布</Button></span>
					<span class="publish-button"><Button style="width:90px;margin-left: 10px;" @click="handlePreview">预览</Button></span>
				</Row>
			</div>
		</div>
		<Tip></Tip>
	</div>
</template>
<script>
	import Search from '../../components/realse/search.vue'
	import Tip from '../../components/realse/publishon.vue'
	import { publishtag, savediscuss, upload, getTagsAndTagType } from '@/service/publish'
	import { getCookie } from '../../assets/js/cookie.js'
	export default {
		data() {
			return {
				articleTitle: "",
				search: "",
				arr: [],
				value6: '',
				defaultList: [],
				imgofurl: '',
				imgName: '',
				visible: false,
				publishLoading: false,
				flag: false,
				uploadList: [],
				cityList: [],
				tag: [],
				model1: '',
				num: 0,
				token: getCookie('token'),
				tagthree: [],
				num: 0,
				uptoken: {},
				date1: "",
				userId: ""
			}
		},
		components: {
			Search,
			Tip
		},

		mounted() {

			//获取七牛云token和用户id
			this.getToken();

			this.uploadList = this.$refs.upload.fileList;
			//标签
			this.tags()

		},
		methods: {
			tags() {
				let data = {
					typeId: 0
				}
				getTagsAndTagType(data).then(res => {
					//发布成功
					if(res.code == 0) {
						this.tag = res.data.result
						//						console.log(result)
						for(let i = 0; i < this.tag.length; i++) {
							var result = this.tag[i]
							//							console.log(result)
							for(let j = 0; j < result.dtagsList.length; j++) {
								this.tag[i].dtagsList[j].seen = false
								//								console.log(this.tag[i].dtagsList[j])

							}
						}

					}
				})
			},
			//标签点击
			dian(name, id, index, index1) {
				//				console.log(status, name, id, index, index1)
				//				console.log(this.tag[index1].dtagsList[index].seen)
				this.tag[index1].dtagsList[index].seen = !this.tag[index1].dtagsList[index].seen

				if(this.tag[index1].dtagsList[index].seen == true) {
					$(".label:eq(" + index1 + ") .labelLi").eq(index).css("background-color", "rgb(64, 143, 241)");
					$(".max-nine:eq(" + index1 + ") .labelLi").eq(index).addClass("labelLiC");
					//						console.log($(".labelLi").eq(index).css("background-color"))

					//加入数组对象
					this.tagthree.push({
						tagName: name,
						tagId: id
					})
					//						console.log(this.tagthree)
					//循环，检查数组里是否是三条数据
					for(var i = 0; i < this.tagthree.length; i++) {
						//如果大于三条提示并从数组中删除
						if(i >= 3) {
							this.$message({
								showClose: true,
								message: "标签不能超过三条",
								type: 'error',
								duration: 1500
							});
							$(".label:eq(" + index1 + ") .labelLi").eq(index).css("background", "rgb(183, 183, 183)");
							this.tagthree.splice(i, 1)
							//将其变为false，下次为true 再次点击添加样式
							this.tag[index1].dtagsList[index].seen = false
						}
					}
				} else {

					$(".label:eq(" + index1 + ") .labelLi").eq(index).css("background", "#b7b7b7");
					for(var i = 0; i < this.tagthree.length; i++) {
						console.log(this.tagthree[i].tagName, name)
						if(this.tagthree[i].tagName == name) {
							var a = i
							this.tagthree.splice(a, 1)
						}
					}
					console.log(this.tagthree)
				}

			},
			//时间
			getDate() {
				var myDate = new Date();
				//获取当前年
				var year = myDate.getFullYear();
				//获取当前月
				var month = myDate.getMonth() + 1;
				if(month < 10) {
					month = "0" + month;
				}
				//获取当前日
				var date = myDate.getDate();
				//时
				var h = myDate.getHours(); //获取当前小时数(0-23)
				//分
				var m = myDate.getMinutes(); //获取当前分钟数(0-59)
				//秒
				var s = myDate.getSeconds();
				//毫秒
				var ms = myDate.getMilliseconds()
				var now = year + month + date + h + m + s + ms;
				this.date1 = now

			},
			getToken() {
				let data1 = {
					token: this.token
				}
				upload(data1).then(res => {
					if(res.code == 0) {
						//						console.log(res.data)
						this.uptoken.token = res.data.upToken
						this.userId = res.data.uid

					}
				})
			},
			//多文本的字数鼠标的抬起事件
			up() {
				var len = $("textarea").val().length;
				if(len > 300) {
					$("textarea").val($("textarea").val().substring(0, 300));

				}
				var num = 300 - len;
				$("#word").text(num);
			},
			//发布的内容不得超过300
			down() {
				var len = $("textarea").val().length;
				if(len > 300) {
					$("textarea").val($("textarea").val().substring(0, 300));

				}
				var num = 300 - len;
				$("#word").text(num);

			},
			//模糊查询接收数据
			getA(data) {
				this.search = data;
			},

			//点击查看图片
			handleView(name) {
				//				console.log(name)
				this.imgofurl = name.imgofurl,
					this.imgName = "https://pic.qufen.top/" + name;
				this.visible = true;
			},
			//点击删除图片
			handleRemove(file) {
				const fileList = this.$refs.upload.fileList;
				this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
			},
			handleSuccess(res, file) {
				//				console.log(res)
				var a = res.key
				file.url = "https://pic.qufen.top/" + res.key;
				var b = file.url.toString();
				file.name = a;
			},
			handleFormatError(file) {

				this.$Notice.warning({
					title: '文件格式不正确',
					desc: '文件格式 ' + file.name + ' 不正确，请选择JPG或PNG.'
				});
			},
			handleMaxSize(file) {
				this.$Notice.warning({
					title: '超过文件大小限制',
					desc: '文件  ' + file.name + ' 太大了，不超过5M.'
				});
			},
			handleBeforeUpload(file) {
				//获取当前时间
				this.getDate()

				//				console.log(file.name.split(".")[1])
				var imgurl = file.name.split(".")[1]
				//				console.log(this.date, this.userId)

				this.uptoken.key = "posts" + this.date1 + this.userId + "." + imgurl
				//				console.log(this.uptoken.key)
				const check = this.uploadList.length < 9;
				if(!check) {
					this.$Notice.warning({
						title: '最多传九张图片'
					});
				}
				return check;
			},

			p(s) {
				return s < 10 ? '0' + s : s;
			},
			//预览
			handlePreview() {
				this.arr = []
				//循环图片
				for(let i = 0; i < this.uploadList.length; i++) {
					console.log(this.uploadList)
					this.arr.push({
						fileUrl: this.uploadList[i].url
					});
				}
				if($("textarea").val().length > 0) {
					if($("textarea").val().length < 301) {
						if(this.arr.length <= 9) {
							let date = new Date();
							let year = date.getFullYear();
							let month = date.getMonth() + 1;
							let day = date.getDate();
							let hour = date.getHours();
							let minute = date.getMinutes();

							localStorage.publishTime = year + '-' + this.p(month) + '-' + this.p(day) + ' ' + this.p(hour) + ':' + this.p(minute);

							localStorage.search = this.search
							localStorage.articleTitle = this.articleTitle;
							localStorage.content = $("textarea").val();
							//标签
							localStorage.tag = JSON.stringify(this.tagthree)
							localStorage.postImg = JSON.stringify(this.arr)

							window.open("/preview/burst", "_blank")

						} else {
							this.$message({
								showClose: true,
								message: '图片不超过9张',
								type: 'error',
								duration: 1500
							});
						}

					} else {
						this.$message({
							showClose: true,
							message: '发布内容不能超过500字',
							type: 'error',
							duration: 1500
						});
					}

				} else {
					this.$message({
						showClose: true,
						message: '内容不能为空',
						type: 'error'
					});
				}

			},
			//发布
			handlePublish() {

				this.arr = [];
				var _this = this
				for(let i = 0; i < this.uploadList.length; i++) {
					// console.log(this.uploadList)
					this.arr.push({
						fileUrl: this.uploadList[i].url
					});
				}

				//发布文章
				if($("textarea").val().length > 0) {
					if($("textarea").val().length < 301) {
						if(this.arr.length <= 9) {
							//点击发布显示正在发布中
							$(".web-tip").show();

							setTimeout(() => {
								let data = {
									token: this.token,
									projectName: this.search,
									postTitle: this.articleTitle,
									disscussContents: $("textarea").val(),
									discussImages: JSON.stringify(this.arr),
									tagInfos: JSON.stringify(this.tagthree)
								}
								savediscuss(data).then(res => {
									if(res.code == 0) {
										console.log(res.data)
										localStorage.setItem("url", JSON.stringify(res.data))
										this.$router.push('/previewsuc');
									} else {
										this.$message({
											showClose: true,
											message: data.msg,
											type: 'error',
											duration: 1500
										});
									}
								}).catch(function(error) {
									//如果后台报错就关闭弹窗
									$(".web-tip").hide();
									alert(error.msg)

								});
							}, 500);

						} else {
							this.$message({
								showClose: true,
								message: '图片不超过9张',
								type: 'error',
								duration: 1500
							});

						}
					} else {
						this.$message({
							showClose: true,
							message: '发布内容不能超过500字',
							type: 'error',
							duration: 1500
						});
					}
				} else {
					this.$message({
						showClose: true,
						message: '发布内容不能为空',
						type: 'error',
						duration: 1500
					});
				}

			}
		}
	}
</script>
<style lang="less">
	@import './pub.less';
	@import '../../styles/common.less';
	.add-title1 {
		font-size: 12px;
	}
	
	.back {
		background: #408ff1;
	}
	
	.discussion .max-nine .ivu-upload {
		width: 58px!important;
		height: 58px!important;
	}
	
	.discussion .ivu-row {
		text-align: left;
	}
	
	.discussion .upload-img {
		text-align: left;
		margin: 10px 0;
	}
	
	.background {
		background: lightblue;
	}
	/*.discussion .max-nine {
		text-align: left;
		margin: 20px 0;
	}*/
	/*.discussion .label {
		list-style: none;
		overflow: hidden;
	}*/
	/*.labelLi {
		width: 90px;
		height: 25px;
		line-height: 25px;
		font-size: 14px;
		color: #fff;
		background: #b7b7b7;
		border-radius: 20px;
		text-align: center;
		float: left;
		margin-right: 10px;
		margin-bottom: 10px;
		cursor: pointer;
	}*/
	
	.discussion .demo-upload-list {
		display: inline-block;
		width: 60px;
		height: 60px;
		text-align: center;
		line-height: 60px;
		border: 1px solid transparent;
		border-radius: 4px;
		overflow: hidden;
		background: #fff;
		position: relative;
		box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
		margin-right: 4px;
	}
	
	.discussion .demo-upload-list img {
		width: 100%;
		height: 100%;
	}
	
	.discussion .demo-upload-list-cover {
		display: none;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, .6);
	}
	
	.discussion .demo-upload-list:hover .demo-upload-list-cover {
		display: block;
	}
	
	.discussion .demo-upload-list-cover i {
		color: #fff;
		font-size: 20px;
		cursor: pointer;
		margin: 0 2px;
	}
	
	.discussion .ivu-btn-primary {
		width: 150px;
	}
</style>