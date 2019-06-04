<style lang="less">
	@import '../../styles/common.less';
	@import './pub.less';
	#tinymceEditer_ifr {
		height: 350px;
	}
	/*.ivu-row {
		margin: 40px 0;
	}*/
	
	.ivu-input-group .ivu-input {
		width: 25%;
		text-align: center;
	}
	
	.ivu-card-shadow {
		box-shadow: none;
	}
	
	.little {
		font-size: 14px;
	}
	
	.pc-title {
		font-size: 15px;
	}
	
	.evaluation .el-slider__runway.disabled .el-slider__bar {
		background-color: #000;
	}
	
	.pcInfo {
		width: 800px;
		margin-top: 15px;
		box-shadow: 0 2px 7px 0 rgba(103, 166, 255, 0.37);
	}
	
	.pcInfo:hover {
		box-shadow: 0 2px 12px 0 rgba(103, 166, 255, 0.27);
	}
</style>
<template>
	<div>
		<div class="xm">
			<div class="pos progess"><img class="previewSelect" src="../../assets/preview/red.png" />项目</div>
			<!--模糊查询币种-->
			<Search @aa="getA($event)"></Search>
			<span class="select">请选择相应的区块链项目</span>
		</div>
		<div class="evaluation">
			<div class="progess"><img class="previewSelect" src="../../assets/preview/red.png" />综合评估</div>
			<p class="screen">经过科学筛选，区分提供以下几个测评维度，可按照FIND模型进行评测。
				<a target="_blank" class="special" style="color: #3c89f6;" href="https://app.qufen.top/user/model">模型说明></a>
			</p>
			<!--评测分数-->
			<div class="pcZ pcWid">
				<div class="pc-title">综合评分</div>
				<el-slider @change="change1(m)" :max="10" style="width: 50%;display: inline-block;margin-left:6px" type="range" v-model="value3" :show-tooltip="false" disabled></el-slider>
				<div class="label"><label class="store">{{m}}<span class="littleStore">分</span></label><span class="cp1">BBB</span></div>
			</div>
			<!--评分-->
			<div class="pcInfo">
				<div class="pc1 pcWid">
					<div class="pcWid" v-for="(item,index) in listData" v-if="listData">
						<div class="pc-title">{{item.title}} / {{item.percent}}%</div>
						<el-slider :max="10" :step="0.1" style="width: 50%;display: inline-block;margin-left:7px" v-model="item.value" :show-tooltip="false" @change="change(item.value,item.percent,index)"></el-slider>
						<div class="label"><label for="point1" class="store">{{item.value}}<span class="littleStore">分</span></label>
							<span class="cp">BBB</span>
						</div>
					</div>
				</div>

			</div>
			<!--编译器-->
			<div>
				<div class="evaluationContent">
					<div class="progess margin-top-20"><img class="previewSelect" src="../../assets/preview/red.png" />评测标题</div>
					<!--	<Input type="text" placeholder="请输入标题，建议标题字数在60个字以内" v-model="articleTitle" @on-blur="handleArticletitleBlur" class="margin-top-20" />-->
					<Input type="text" placeholder="请输入标题，建议标题字数在60个字以内" v-model="articleTitle" class="margin-top-20" />
				</div>
				<div class="margin-top-20 progess margin-bottom-10"><img class="previewSelect" src="../../assets/preview/red.png" />评测报告</div>
				<Simditor></Simditor>
			</div>
			<div class="margin-top-20">
				<h3 class=" p">选择标签<span class="newTags ">选择标签，最多三个</span></h3>
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
	import Simditor from '../../components/realse/simditor.vue'
	import Search from '../../components/realse/search.vue'
	import Tip from '../../components/realse/publishon.vue'
	import { searchEvaluation, publishW, getTagsAndTagType } from '@/service/publish'
	import { getCookie } from '../../assets/js/cookie.js'
	export default {
		name: 'index',
		data() {
			return {
				value3: 8,
				changev: 0,
				search: "",
				m: "",
				a: "",
				score: [],
				articleTitle: "",
				publishTime: '',
				publishLoading: false,
				publishTimeType: 'immediately',
				content: '',
				listData: [],
				cityList: [],
				model1: '',
				token: getCookie('token'),
				arr: [],
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
			//接受参数   后台返回的评测项目
			searchEvaluation().then(res => {
				if(res.code == 0) {
					var num2 = 0;
					var result2 = res.data.sysEvuationModel
					for(let i = 0; i < result2.length; i++) {
						this.listData.push({
							title: result2[i].detailName,
							percent: result2[i].detailWeight,
							modelId: result2[i].modelId,
							value: 8
						})

					}
					//给总分默认值为8分 随后拉取的时候在各自相加
					for(let i = 0; i < this.listData.length; i++) {
						var a = this.listData[i].percent / 100 * 8
						this.score.push(a)
						num2 = this.score[i] + num2
					}
					this.m = num2
				}
			}).catch(function(error) {
				console.log(error.msg);
			});
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
					console.log(this.tagthree)
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
			//标题
			//			handleArticletitleBlur() {
			//				if(this.articleTitle.length !== 0) {
			//					// this.articleError = '';
			//					localStorage.articleTitle = this.articleTitle; // 本地存储文章标题
			//					if(!this.articlePathHasEdited) {
			//						let date = new Date();
			//						let year = date.getFullYear();
			//						let month = date.getMonth() + 1;
			//						let day = date.getDate();
			//						this.fixedLink = window.location.host + '/' + year + '/' + month + '/' + day + '/';
			//						this.articlePath = this.articleTitle;
			//						this.articlePathHasEdited = true;
			//						this.showLink = true;
			//					}
			//				} else {
			//					this.$Message.error('文章标题不可为空哦');
			//				}
			//			},
			p(s) {
				return s < 10 ? '0' + s : s;
			},
			//预览
			handlePreview() {
				//去除文本编译器的标签
				var dd = $("textarea").val().replace(/<\/?.+?>/g, "");

				var dds = dd.replace(/ /g, ""); //dds为得到后的内容
				//替换空格
				var ddsd = dds.replace(/&nbsp;/ig, "");
				if(this.search != "") {
					if(this.changev != 0) {
						if(this.articleTitle.length !== 0) {
							if(this.articleTitle.length <= 60) {
								if(ddsd != "") {

									if(1) {
										let date = new Date();
										let year = date.getFullYear();
										let month = date.getMonth() + 1;
										let day = date.getDate();
										let hour = date.getHours();
										let minute = date.getMinutes();

										localStorage.publishTime = year + '-' + this.p(month) + '-' + this.p(day) + ' ' + this.p(hour) + ':' + this.p(minute);

									} else {
										localStorage.publishTime = this.publishTime; // 本地存储发布时间
									}
									//项目
									localStorage.search = this.search
									//评分项
									for(let i = 0; i < this.listData.length; i++) {
										if(this.arr.length < 4) {
											this.arr.push({
												modelId: this.listData[i].modelId,
												modelName: this.listData[i].title,
												modelWeight: this.listData[i].percent,
												score: this.listData[i].value,

											});
										}

									}
									localStorage.scoreList = JSON.stringify(this.arr)
									//标题
									localStorage.articleTitle = this.articleTitle;
									//内容
									localStorage.content = $("textarea").val();
									//总分
									localStorage.totalscore = this.m
									//标签
									localStorage.tag = JSON.stringify(this.tagthree)

									window.open("/preview/evaluating", "_blank")
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
									message: '标题小于60字',
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
					} else {
						this.$message({
							showClose: true,
							message: "请先评分后再提交评测",
							type: 'error',
							duration: 1500
						});
					}

				} else {
					this.$message({
						showClose: true,
						message: '请选择项目',
						type: 'error'
					});
				}

			},
			change1(value) {
				//				console.log(value)
				if(value >= 0 && value < 3) {
					$(".cp1").html("D")
				}
				if(value >= 3 && value < 4) {
					$(".cp1").html("C");
					$(".cp1").css("background", "lightskyblue");
				}
				if(value >= 4 && value < 5) {
					$(".cp1").html("CC")
					$(".cp1").css("background", "lightslategray");

				}
				if(value >= 5 && value < 6) {
					$(".cp1").html("CCC")
					$(".cp1").css("background", "dodgerblue");
				}
				if(value >= 6 && value < 7) {
					$(".cp1").html("B");
					$(".cp1").css("background", "lightcoral");
				}
				if(value >= 6 && this.value < 7) {
					$(".cp1").html("B");
					$(".cp1").css("background", "lightcoral");
				}
				if(value >= 7 && value < 8) {
					$(".cp1").html("BB");
					$(".cp1").css("background", "lightcoral");
				}
				if(value >= 8 && value < 8.5) {
					$(".cp1").html("BBB");
					$(".cp1").css("background", "lightcoral");
				}
				if(value >= 8.5 && value < 9) {
					$(".cp1").html("A");
					$(".cp1").css("background", "lightcoral");
				}
				if(value >= 9 && value < 9.5) {
					$(".cp1").html("AA");
					$(".cp1").css("background", "lightcoral");
				}
				if(value >= 9.5 && value <= 10) {
					$(".cp1").html("AAA");
					$(".cp1").css("background", "lightcoral");
				}

			},
			//改变进度条
			change(value, percent, index) {

				this.changev = value
				console.log(this.changev)
				var num = 0;
				//框架的进度条默认100,换成十进制
				var a = parseFloat(percent / 100)
				var value1 = this.listData[index].value

				//项目评分
				if(index == index) {
					this.score[index] = ((this.listData[index].value) * a).toFixed(1) - 0
					for(let i = 0; i < this.score.length; i++) {
						//给个初始值
						if(this.score[i] == null) {
							this.score[i] = 0;
						}
						num = this.score[i] + num
					}
					this.m = num.toFixed(1);
					this.change1(this.m)
				}

				//评分样式改变
				if(value1 >= 0 && value1 < 3) {
					$(".cp").eq(index).html("D")
					$(".cp").eq(index).css("background", "lightslategray");
				}
				if(value1 >= 3 && value1 < 4) {
					$(".cp").eq(index).html("C");
					$(".cp").eq(index).css("background", "lightskyblue");
				}
				if(value1 >= 4 && value1 < 5) {
					$(".cp").eq(index).html("CC")
					$(".cp").eq(index).css("background-image", "linear-gradient(-180deg, #02b7ea 0%, #4372ff 100%)");

				}
				if(value1 >= 5 && value1 < 6) {
					$(".cp").eq(index).html("CCC")
					$(".cp").eq(index).css("background-image", "linear-gradient(-180deg, #02b7ea 0%, #4372ff 100%)");
				}
				if(value1 >= 6 && value1 < 7) {
					$(".cp").eq(index).html("B");
					$(".cp").eq(index).css("background", "lightcoral");
				}
				if(value1 >= 6 && value1 < 7) {
					$(".cp").eq(index).html("B");
					$(".cp").eq(index).css("background", "lightcoral");
				}
				if(value1 >= 7 && value1 < 8) {
					$(".cp").eq(index).html("BB");
					$(".cp").eq(index).css("background", "lightcoral");
				}
				if(value1 >= 8 && value1 < 8.5) {
					$(".cp").eq(index).html("BBB");
					$(".cp").eq(index).css("background", "lightcoral");
				}
				if(value1 >= 8.5 && value1 < 9) {
					$(".cp").eq(index).html("A");
					$(".cp").eq(index).css("background", "lightcoral");
				}
				if(value1 >= 9 && value1 < 9.5) {
					$(".cp").eq(index).html("AA");
					$(".cp").eq(index).css("background", "lightcoral");
				}
				if(value1 >= 9.5 && value1 <= 10) {
					$(".cp").eq(index).html("AAA");
					$(".cp").eq(index).css("background", "lightcoral");
				}

			},

			//发布
			handlePublish() {

				for(let i = 0; i < this.listData.length; i++) {
					if(this.arr.length < 4) {
						this.arr.push({
							modelId: this.listData[i].modelId,
							modelName: this.listData[i].title,
							modelWeight: this.listData[i].percent,
							score: this.listData[i].value,

						});
					}

				}
				//去除文本编译器的标签
				var dd = $("textarea").val().replace(/<\/?.+?>/g, "");

				var dds = dd.replace(/ /g, ""); //dds为得到后的内容
				//替换空格
				var ddsd = dds.replace(/&nbsp;/ig, "");
				//				console.log(ddsd.toString().length,ddsd)
				if(this.search == "") {
					this.$message({
						showClose: true,
						message: '请选择项目',
						type: 'error'
					});
				} else {
					if(this.changev != 0) {
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

										this.$confirm('为了保证区分平台项目分析的公正性，您的内容一旦发布将不可修改和删除，请对您的内容和打分再次确认?', '尊敬的项目分析师', {
											confirmButtonText: '确认发布',
											cancelButtonText: '再斟酌下  ',
											type: 'warning',
											center: true
										}).then(() => {
											//点击发布显示正在发布中
											$(".web-tip").show();

											setTimeout(() => {
												//发送请求  发布文章publishW
												let data = {
													token: this.token,
													projectName: this.search,
													modelType: 2,
													totalScore: this.m,
													postTitle: this.articleTitle,
													evauationContent: $("textarea").val(),
													professionalEvaDetail: JSON.stringify(this.arr),
													evaluationTags: JSON.stringify(this.tagthree)
												}

												publishW(data).then(res => {

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

										}).catch(() => {
											this.$message({
												type: 'info',
												message: '已取消',
												duration: 1500
											});
										});

									} else {
										this.$message({
											showClose: true,
											message: '内容不符合，不能为空',
											type: 'error'
										});

									}
								}
							} else {
								this.$message({
									showClose: true,
									message: '标题小于60字',
									type: 'error'
								});

							}

						} else {
							this.$message({
								showClose: true,
								message: '标题不能为空',
								type: 'error'
							});
						}
					} else {
						this.$message({
							showClose: true,
							message: "请先评分后再提交评测",
							type: 'error',
							duration: 1500
						});
					}

				}

			},

		}
	}
</script>