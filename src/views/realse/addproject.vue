<template>
	<div>
		<h1 class="showprojectH">发布文章</h1>
		<div class="cx-addproject">

			<div class="evaluation" style="margin-top:0;">
				<div class="evaluationContent">
					<div class="progess"><img class="previewSelect" src="../../assets/preview/red.png" />文章标题</div>
					<Input type="text" placeholder="请输入标题，建议标题字数在60个字以内" v-model="articleTitle" class="margin-top-20" />
				</div>
				<div>
					<h3 class="progess add-title"><img class="previewSelect" src="../../assets/preview/red.png"/>文章内容</h3>
					<Simditor></Simditor>
				</div>
				<div class="xm margin-top-20">
					<h3 class="pos1 p">项目</h3>
					<!--模糊查询币种-->
					<Search @aa="getA($event)"></Search>
					<span class="select">请选择相应的区块链项目</span>
				</div>
				<div>
					<h3 class="p margin-top-20">选择标签<span class="newTags">选择标签，最多三个</span></h3>
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
		</div>
		<!--发布中-->
		<Tip></Tip>
	</div>
</template>
<script>
	import Simditor from '../../components/realse/simditor.vue'
	import Search from '../../components/realse/search.vue'
	import Tip from '../../components/realse/publishon.vue'
	import { publishW, savearticle, getTagsAndTagType } from '@/service/publish'
	import { getCookie } from '../../assets/js/cookie.js'

	export default {
		data() {
			return {
				articleTitle: "",
				search: "",
				publishLoading: false,
				cityList: [],
				model1: '',
				token: getCookie('token'),
				tag: [],
				tagthree: [],
			}
		},
		components: {
			Simditor,
			Search,
			Tip
		},
		mounted() {
			//标签
			this.tags()
			//			$("textarea").val('<div>lalal</div>')
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
				console.log(status, name, id, index, index1)
				console.log(this.tag[index1].dtagsList[index].seen)
				this.tag[index1].dtagsList[index].seen = !this.tag[index1].dtagsList[index].seen

				if(this.tag[index1].dtagsList[index].seen == true) {
					$(".max-nine:eq(" + index1 + ") .labelLi").eq(index).css("background", "#408ff1");

					//加入数组对象
					this.tagthree.push({
						tagName: name,
						tagId: id
					})
//					console.log(this.tagthree)
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
							$(".max-nine:eq(" + index1 + ") .labelLi").eq(index).css("background", "#b7b7b7");
							this.tagthree.splice(i, 1)
							//将其变为false，下次为true 再次点击添加样式
							this.tag[index1].dtagsList[index].seen = false
						}
					}
				} else {

					$(".max-nine:eq(" + index1 + ") .labelLi").eq(index).css("background", "#b7b7b7");
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
			//模糊查询接收数据
			getA(data) {
				this.search = data;
			},
			
			p(s) {
				return s < 10 ? '0' + s : s;
			},
			//预览
			handlePreview() {
				console.log(this.tagthree)
				//去除文本编译器的标签
				var dd = $("textarea").val().replace(/<\/?.+?>/g, "");

				var dds = dd.replace(/ /g, ""); //dds为得到后的内容
				var ddsd = dds.replace(/&nbsp;/ig, "");

					if(this.articleTitle.length <= 60 && this.articleTitle != "") {

						if(ddsd != "") {
							let date = new Date();
							let year = date.getFullYear();
							let month = date.getMonth() + 1;
							let day = date.getDate();
							let hour = date.getHours();
							let minute = date.getMinutes();

							localStorage.publishTime = year + '-' + this.p(month) + '-' + this.p(day) + ' ' + hour + ':' + minute;
							localStorage.search = this.search
							localStorage.articleTitle = this.articleTitle;
							localStorage.content = $("textarea").val();
							
							//标签
							localStorage.tag = JSON.stringify(this.tagthree)

							window.open("/preview/article", "_blank")
							this.$router.push({
								path: "",
							})

						} else {
							this.$message({
								showClose: true,
								message: '内容不能为空',
								type: 'error'
							});
						}

					} else {
						this.$message({
							showClose: true,
							message: '文章标题小于60字且不能为空',
							type: 'error'
						});
					}

			},
			canPublish() {
				if(this.articleTitle.length === 0 && this.articleTitle.length <= 30) {
					this.$Message.error('请输入文章总结');
					return false;
				} else {
					return true;
				}
			},

			//发布
			handlePublish() {
				//去除文本编译器的标签
				var dd = $("textarea").val().replace(/<\/?.+?>/g, "");

				var dds = dd.replace(/ /g, ""); //dds为得到后的内容
				var ddsd = dds.replace(/&nbsp;/ig, "");

				//				if(this.search == "") {
				//					this.$message({
				//						showClose: true,
				//						message: '请选择项目',
				//						type: 'error'
				//					});
				//				} else {
				if(this.articleTitle != "") {
					if(this.articleTitle.length <= 60) {
						if(ddsd == "") {
							this.$message({
								showClose: true,
								message: '内容不能为空',
								type: 'error'
							});
						} else {
							if(ddsd.toString().length < 25000) {
								//点击发布显示正在发布中
								$(".web-tip").show();

								setTimeout(() => {
									let data = {
										token: this.token,
										projectName: this.search,
										toHtmlTags: dds,
										postTitle: this.articleTitle,
										articleContents: $("textarea").val(),
										tagInfos: JSON.stringify(this.tagthree)
									}
									savearticle(data).then(res => {
										//发布成功
										if(res.code == 0) {
											localStorage.setItem("url", JSON.stringify(res.data))
											this.$router.push('/previewsuc');
										}
									}).catch(function(error) {
										//如果后台报错就关闭弹窗
										$(".web-tip").hide();

										alert(error.msg);

									});
								}, 500);

							} else {
								this.$message({
									showClose: true,
									message: '内容超过限制',
									type: 'error'
								});

							}
						}

					} else {
						this.$message({
							showClose: true,
							message: '文章标题小于60字且不能为空',
							type: 'error'
						});
					}
				} else {
					this.$message({
						showClose: true,
						message: '文章标题不能为空',
						type: 'error'
					});
				}

			}
		}
	}
</script>
<style lang="less">
	@import '../../views/realse/pub.less';
	@import '../../styles/common.less';
	.progess {
		text-align: left;
	}
	
	.ivu-row {
		text-align: left;
	}
</style>