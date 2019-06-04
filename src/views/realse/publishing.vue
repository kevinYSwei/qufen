<style lang="less">
	@import '../../styles/common.less';
	@import './pub.less';
	.xm {
		text-align: left;
	}
	
	.evaluation .add {
		display: inline-block;
		width: 200px;
		text-align: center;
		color: #2d8cf0;
		border: 1px solid #2d8cf0!important;
	}
	
	.el-dialog__body .el-input__inner {
		width: 80%;
		border: none;
		border-bottom: 1px solid #dcdfe6;
		border-radius: 0;
	}
	
	.el-dialog {
		width: 45%;
	}
	
	.el-dialog__body {
		padding: 30px 0;
	}
	
	.pcDele {
		width: 65px;
		height: 25px;
		line-height: 25px;
		font-size: 14px;
		text-align: center;
		cursor: pointer;
		display: inline-block;
		background: lightblue;
		border-radius: 15px;
		margin-left: 10px;
	}
	
	.pcDele:hover {
		box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
	}
	
	.el-message {
		width: 350px;
		height: 50px;
		top: 200px;
	}
	
	.el-message--warning .el-message__content {
		color: red;
		font-size: 18px;
	}
	
	.pc-title {
		font-size: 15px;
	}
	
	.pclis {
		padding: 15px 0 10px 20px;
		display: none;
	}
	/*.scale {
		background: #408ff1;
	}*/
</style>
<template>
	<div>
		<div class="xm">
			<div class="pos progess"><img class="" src="../../assets/preview/red.png" />项目</div>
			<!--模糊查询币种-->
			<Search @aa="getA($event)"></Search>
			<span class="select">请选择相应的区块链项目</span>
		</div>
		<div class="evaluation">
			<h3 class="progess">自定义维度</h3>
			<p class="screen">请对当前项目进行评分，也可以自建评测纬度。
				<!--<a target="_blank" class="special" style="color: #3c89f6;" href="https://app.qufen.top/user/model">模型说明></a>-->
			</p>
			<div class="addevaluation">
				<el-button class="add" type="text" @click="logFormVisible"> + 添加维度 </el-button>
				<span> 可以新增评测纬度，比例之和为1，最多8个纬度（可不设置）</span>
				<el-dialog title="自定义维度" :visible.sync="dialogFormVisible">
					<el-form :model="form">
						<el-form-item label="名称" :label-width="formLabelWidth">
							<el-input class="weid" v-model="form.name" value="" auto-complete="off" placeholder="填写维度名称"></el-input>
						</el-form-item>
						<el-form-item label="权重" :label-width="formLabelWidth">
							<el-input v-model="form.weight" auto-complete="off" placeholder="填写权重(0-1)，最多两位小数"></el-input>
						</el-form-item>
						<el-form-item label="分数" :label-width="formLabelWidth">
							<el-input v-model="form.score" auto-complete="off" placeholder="填写分数(1-10)，最多一位小数"></el-input>
						</el-form-item>

					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button type="primary" @click="FormVisible" :visible.sync="visible">保存</el-button>
						<el-button @click="dialogFormVisible = false">取 消</el-button>
					</div>
				</el-dialog>
			</div>
			<!--評分-->
			<!--评测分数-->
			<div class="pcZ pcWid">
				<div class="pc-title margin-top-10"><img class="previewSelect" src="../../assets/preview/red.png" />综合评分</div>
				<el-slider @change="change1(m)" :max="10" :step="0.1" style="width: 50%;display: inline-block;margin-left:6px" type="range" v-model="m" :show-tooltip="false" :disabled='disabled'></el-slider>
				<div class="label"><label class="store">{{m}}<span class="littleStore">分</span></label><span class="cp1">BBB</span></div>
				<!--<span class="cp"></span>-->
			</div>
			<div class="pcInfo">
				<div class="pc2 pcWid pclis">
					<div class="pcWid" v-for="(item,index) in listData" v-if="listData">
						<div class="pc-title"><span class="span-title">{{item.title}}</span> / {{item.percent}}%</div>
						<el-slider :max="10" :step="0.1" style="width: 50%;display: inline-block;margin-left:7px" v-model="item.value" :show-tooltip="false" @change="change(item.value,item.percent,index)"></el-slider>
						<div class="label"><label for="point1" class="store">{{item.value}}<span class="littleStore">分</span></label>
							<span class="cp">{{item.score1}}</span>
							<el-button @click="deleteA(index)" type="danger" icon="el-icon-delete" round></el-button>
						</div>
					</div>
				</div>
			</div>

			<div>
				<div class="evaluationContent">
					<div class="progess margin-top-10"><img class="previewSelect" src="../../assets/preview/red.png" />评测标题</div>
					<Input type="text" placeholder="请输入标题，建议标题字数在60个字以内" v-model="articleTitle" class="margin-top-20" />
				</div>
				<h3 class="progess margin-top-20 margin-bottom-10"><img class="previewSelect" src="../../assets/preview/red.png"/>评测报告</h3>
				<simditor></simditor>
				<!--<simditor :value.sync='value' v-ref:simditor></simditor>-->
			</div>
			<div class="margin-top-20">
				<h3 class="p">选择标签<span class="newTags">选择标签，最多三个</span></h3>
				<div class="max-nine" v-for="(item,index1) in tag">
					<div class="previewfontSize">{{item.typeName}}</div>
					<ul class="label">
						<li class="labelLi" v-for="(item1,index) in item.dtagsList" @click="dian(item1.tagName,item1.tagId,index,index1)">{{item1.tagName}}</li>
					</ul>
				</div>
				<Row class="margin-top-20 publish-button-con">
					<span class="publish-button"><Button @click="handlePublish" icon="ios-checkmark" style="width:90px;" type="primary">发布</Button></span>
					<span class="publish-button"><Button style="width:90px;margin-left: 10px;" @click="handlePreview">预览</Button></span>
				</Row>
			</div>
		</div>
		<Tip></Tip>
	</div>
</template>

<script>
	import simditor from '../../components/realse/simditor.vue'
	import Search from '../../components/realse/search.vue'
	import Tip from '../../components/realse/publishon.vue'
	import { publishW, getTagsAndTagType } from '@/service/publish'
	import { getCookie } from '../../assets/js/cookie.js'
	export default {
		data() {
			return {
				isScale: undefined,
				value3: 8,
				changev: 0,
				search: "",
				m: 6,
				disabled: false,
				a: "",
				tag: [],
				tagthree: [],
				score: [],
				loading: false,
				dialogFormVisible: false,
				publishLoading: "false",
				articleTitle: "",
				visible: "false",
				num: 1,
				listData: [],
				listData1: [],
				form: {
					name: '',
					region: '',
					weight: '',
					score: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				formLabelWidth: '120px',
				model1: '',
				arr: [],
				token: getCookie('token'),
				num: 0,
				weight: [],
				q: 0,
				p: "",
				flag: false

			}
		},
		components: {
			simditor,
			Search,
			Tip
		},
		mounted() {
			this.tags()

		},
		updated() {
			if(this.listData.length != 0) {
				this.disabled = true
				$(".pclis").css("display", "block")
			} else {
				this.disabled = false
			}
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

			//动态添加维度
			FormVisible() {
				var num = 0,
					num1 = 0,
					num3 = 0;

				var reg = /^0\.(0[1-9]|[1-9]{1,2})$/;
				var reg1 = /^10$|^(\d)$|^([1-9]\d|\d)(.\d{1})$/
				this.dialogFormVisible = false;
				if(this.listData.length < 8) {
					if(this.num == 0) {
						if(reg.test(this.form.weight)) {
							//判断
							if(reg1.test(this.form.score) && this.form.score - 0 <= 10) {
								this.listData.push({
									title: this.form.name,
									percent: parseInt((this.form.weight) * 100),
									value: (this.form.score - 0),
									score1: ""
								});
								// $(".pc2").animate({width:"80px"},5000);
								if(this.form.score >= 0 && this.form.score < 3) {
									this.listData[0].score1 = "D"
								}
								if(this.form.score >= 3 && this.form.score < 4) {
									this.listData[0].score1 = "C"
									$(".cp").eq(0).css("background", "lightskyblue");
								}
								if(this.form.score >= 4 && this.form.score < 5) {
									this.listData[0].score1 = "CC"
									$(".cp").eq(0).css("background", "lightskyblue");
								}
								if(this.form.score >= 5 && this.form.score < 6) {
									this.listData[0].score1 = "CCC"
									$(".cp").css("background", "dodgerblue");
								}
								if(this.form.score >= 6 && this.form.score < 7) {
									this.listData[0].score1 = "B"
									$(".cp").css("background", "lightcoral");
								}
								if(this.form.score >= 7 && this.form.score < 8) {
									this.listData[0].score1 = "BB"
									$(".cp").css("background", "lightcoral");
								}
								if(this.form.score >= 8 && this.form.score < 8.5) {
									this.listData[0].score1 = "BBB"
									$(".cp").css("background", "lightcoral");
								}
								if(this.form.score >= 8.5 && this.form.score < 9) {
									this.listData[0].score1 = "A"
									$(".cp").css("background", "lightcoral");
								}
								if(this.form.score >= 9 && this.form.score < 9.5) {
									this.listData[0].score1 = "AA"
									$(".cp").css("background", "lightcoral");
								}
								if(this.form.score >= 9.5 && this.form.score <= 10) {
									this.listData[0].score1 = "AAA"
									$(".cp").css("background", "lightcoral");
								}

								this.weight.push(this.form.weight - 0)
								//								console.log(this.weight)
								this.score.push(this.form.weight * this.form.score)
								this.m = (this.score[0].toFixed(1)) - 0
								this.change1(this.m)
								this.num++
							} else {
								this.$alert('填写分数(1-10)，最多一位小数，请重新填写', {
									confirmButtonText: '确定',
								});
							}

						} else {
							this.$alert('填写权重(0-1)，最多两位小数，请重新填写', {
								confirmButtonText: '确定',
							});

						}

					} else {
						if($(".span-title").html() == this.form.name) {
							this.$message({
								showClose: true,
								message: '名称不能一致',
								type: 'error',
								duration: 1000
							});
						} else if($(".span-title").eq(1).html() == this.form.name) {
							this.$message({
								showClose: true,
								message: '名称不能一致',
								type: 'error',
								duration: 1000
							});
						} else if($(".span-title").eq(2).html() == this.form.name) {
							this.$message({
								showClose: true,
								message: '名称不能一致',
								type: 'error',
								duration: 1000
							});
						} else if($(".span-title").eq(3).html() == this.form.name) {
							this.$message({
								message: "名称不能一致",
								type: "warning",
								duration: 1000
							});
						} else if(!reg.test(this.form.weight)) {
							this.$message({
								showClose: true,
								message: '填写权重(0-1)，最多两位小数',
								type: 'error',
								//几秒后关闭
								duration: 1000
							});
						} else if(reg1.test(this.form.score) && this.form.score - 0 <= 10) {

							this.listData.push({
								title: this.form.name,
								percent: (this.form.weight) * 100,
								value: (this.form.score - 0),
								score1: ""
							});
							// console.log(this.listData)
							if(this.form.score >= 0 && this.form.score < 3) {
								this.listData[this.num].score1 = "D"
							}
							if(this.form.score >= 3 && this.form.score < 4) {
								this.listData[this.num].score1 = "C"
								$(".cp").eq(this.num).css("background", "lightskyblue");
							}
							if(this.form.score >= 4 && this.form.score < 5) {
								this.listData[this.num].score1 = "CC"

								$(".cp").eq(this.num).css("background", "lightskyblue");
							}
							if(this.form.score >= 5 && this.form.score < 6) {
								this.listData[this.num].score1 = "CCC"
								$(".cp").eq(this.num).css("background", "dodgerblue");
							}
							if(this.form.score >= 6 && this.form.score < 7) {
								this.listData[this.num].score1 = "B"
								$(".cp").eq(this.num).css("background", "lightcoral");
							}
							if(this.form.score >= 7 && this.form.score < 8) {
								this.listData[this.num].score1 = "BB"
								$(".cp").eq(this.num).css("background", "lightcoral");
							}
							if(this.form.score >= 8 && this.form.score < 8.5) {
								this.listData[this.num].score1 = "BBB"

								$(".cp").eq(this.num).css("background", "lightcoral");
							}
							if(this.form.score >= 8.5 && this.form.score < 9) {
								this.listData[this.num].score1 = "A"

								$(".cp").eq(this.num).css("background", "lightcoral");
							}
							if(this.form.score >= 9 && this.form.score < 9.5) {
								this.listData[this.num].score1 = "AA"

								$(".cp").eq(this.num).css("background", "lightcoral");
							}
							if(this.form.score >= 9.5 && this.form.score <= 10) {
								this.listData[this.num].score1 = "AAA"

								$(".cp").eq(this.num).css("background", "lightcoral");
							}
							this.score.push((this.form.weight * this.form.score).toFixed(2) - 0)
							for(let i = 0; i < this.score.length; i++) {
								num1 = this.score[i] - 0 + num1
							}
							this.m = num1.toFixed(1) - 0
							this.change1(this.m)
							this.weight.push(this.form.weight - 0)
							//							console.log(this.weight)
							for(let i = 0; i < this.weight.length; i++) {
								num = this.weight[i] + num
								//								console.log(num)
							}
							//算出来每个的值然后取最后的值
							this.q = num.toFixed(1) - 0
							console.log(this.q)
							//如果这个值大于一，线从listdata里删除，权重数组里也要删除
							if(this.q > 1) {
								this.$alert('权重总和不能超过1,请重新填写', {
									confirmButtonText: '确定',
								});
								this.listData.pop()
								this.score.pop()
								this.weight.pop()
								for(let i = 0; i < this.score.length; i++) {
									num3 = this.score[i] - 0 + num3
								}
								this.m = num3.toFixed(1) - 0
								this.change1(this.m)
							} else {
								this.num++
							}

						} else {
							this.$message({
								showClose: true,
								message: '填写分数(1-10)，最多一位小数，请重新填写',
								type: 'error',
								//几秒后关闭
								duration: 1000
							});
						}
					}

				} else {
					this.$alert('不能超过八条', {
						confirmButtonText: '确定',
					});
				}

			},
			logFormVisible() {
				this.dialogFormVisible = true
				this.form.weight = "";
				this.form.name = "";
				this.form.score = ""
			},

			//添加维度后删除某一项
			deleteA(index) {
				this.num--;
				var num1 = 0;
				this.listData.splice(index, 0)
				this.score.splice(index, 1)
				this.weight.splice(index, 1)
				//删除的时候将对应的权重和分数分别从数组后删除，然后在重新计算对用的分数
				for(let i = 0; i < this.score.length; i++) {
					num1 = this.score[i] - 0 + num1
				}
				this.m = num1.toFixed(1) - 0
				this.change1(this.m)
				this.$confirm('是否删除此项自定义维度?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(() => {
					this.listData.splice(index, 1)
					this.$message({
						type: 'success',
						message: '删除成功!',
						duration: 1500
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除',
						duration: 1500
					});
				});

			},
			showModal: function() {
				this.isModalVisible = true
			},
			closeModal: function() {
				this.isModalVisible = false
			},

			change1(value) {

				this.changev = value
				console.log(this.changev)
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
			change(value, percent, index) {
				var num = 0;
				//框架的进度条默认100,换成十进制
				var a = parseFloat(percent / 100)

				var value1 = this.listData[index].value
				//项目定位
				if(index == index) {
					this.score[index] = ((this.listData[index].value) * a).toFixed(2) - 0
					for(let i = 0; i < this.score.length; i++) {
						if(this.score[i] == null) {
							this.score[i] = 0;
						}
						num = this.score[i] + num
					}
					this.m = num.toFixed(1) - 0;
					this.change1(this.m)
				}

				if(value1 >= 0 && value1 < 3) {
					$(".cp").eq(index).html("D")
				}
				if(value1 >= 3 && value1 < 4) {
					$(".cp").eq(index).html("C");
					$(".cp").eq(index).css("background", "lightskyblue");
				}
				if(value1 >= 4 && value1 < 5) {
					$(".cp").eq(index).html("CC")
					$(".cp").eq(index).css("background", "dodgerblue");

				}
				if(value1 >= 5 && value1 < 6) {
					$(".cp").eq(index).html("CCC")
					$(".cp").eq(index).css("background", "dodgerblue");
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
			p1(s) {
				return s < 10 ? '0' + s : s;
			},
			//预览
			handlePreview() {
				//去除文本编译器的标签
				var dd = $("textarea").val().replace(/<\/?.+?>/g, "");

				var dds = dd.replace(/ /g, ""); //dds为得到后的内容
				var ddsd = dds.replace(/&nbsp;/ig, "");
				if(this.search != "") {
					if(this.changev != 0) {
						if(this.articleTitle.length !== 0) {
							if(this.articleTitle.length <= 60) {
								if(ddsd != "") {
									let date = new Date();
									let year = date.getFullYear();
									let month = date.getMonth() + 1;
									let day = date.getDate();
									let hour = date.getHours();
									let minute = date.getMinutes();

									localStorage.publishTime = year + '-' + this.p1(month) + '-' + this.p1(day) + ' ' + this.p1(hour) + ':' + this.p1(minute);
									//项目
									localStorage.search = this.search
									//自定义评分项
									this.arr = [];
									for(let i = 0; i < this.listData.length; i++) {
										//									console.log(this.listData)
										this.arr.push({
											modelId: this.listData[i].modelId,
											modelName: this.listData[i].title,
											modelWeight: this.listData[i].percent,
											score: this.listData[i].value
										});
									}
									localStorage.scoreList = JSON.stringify(this.arr) //标题
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
							message: "请评分",
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
			//发布
			handlePublish() {
				this.arr = [];
				for(let i = 0; i < this.listData.length; i++) {
					this.arr.push({
						modelId: this.listData[i].modelId,
						modelName: this.listData[i].title,
						modelWeight: this.listData[i].percent,
						score: this.listData[i].value
					});
				}

				//去除文本编译器的标签
				var dd = $("textarea").val().replace(/<\/?.+?>/g, "");

				var dds = dd.replace(/ /g, ""); //dds为得到后的内容
				var ddsd = dds.replace(/&nbsp;/ig, "");
				//				console.log(ddsd,ddsd.length)
				if(this.search != "") {
					if(this.changev != 0) {
						if(this.articleTitle != "") {
							if(this.articleTitle.length <= 60) {
								if(this.listData.length == 0) {
									if(ddsd == "") {
										this.$message({
											showClose: true,
											message: "发布内容不能为空",
											type: 'error',
											duration: 1000
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
													let data = {
														token: this.token,
														projectName: this.search,
														modelType: 4,
														totalScore: this.m,
														postTitle: this.articleTitle,
														evauationContent: $("textarea").val(),
														evaluationTags: JSON.stringify(this.tagthree)
													}
													publishW(data).then(res => {
														//发布成功
														if(res.code == 0) {
															console.log(res.data)
															localStorage.setItem("url", JSON.stringify(res.data))
															this.$router.push('/previewsuc');
														}
													}).catch(function(error) {
														//如果后台报错就关闭弹窗
														$(".web-tip").hide();

														alert(error.msg)

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
												message: "内容不能为空",
												type: 'error',
												duration: 1000
											});

										}
									}

								} else {
									if(this.q == 1) {
										console.log(this.q)
										if(ddsd == "") {
											this.$message({
												showClose: true,
												message: "发布内容不能为空",
												type: 'error',
												duration: 1000
											});

										} else {
											if(dds.toString().length < 25000) {
												this.$confirm('为了保证区分平台项目分析的公正性，您的内容一旦发布将不可修改和删除，请对您的内容和打分再次确认?', '尊敬的项目分析师：', {
													confirmButtonText: '确认发布',
													cancelButtonText: '再斟酌下  ',
													type: 'warning',
													center: true
												}).then(() => {
													//点击发布显示正在发布中
													$(".web-tip").show();
													setTimeout(() => {
														let data = {
															token: this.token,
															projectName: this.search,
															modelType: 4,
															postTitle: this.articleTitle,
															totalScore: this.m,
															evauationContent: $("textarea").val(),
															professionalEvaDetail: JSON.stringify(this.arr),
															tagInfos: JSON.stringify(this.tagthree)
														}
														publishW(data).then(res => {
															if(res.code == 0) {
																localStorage.setItem("url", JSON.stringify(res.data))
																this.$router.push('/previewsuc');
															}
														}).catch(function(error) {
															//如果后台报错就关闭弹窗
															$(".web-tip").hide();

															alert(error.msg)
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
													message: "内容不符合，不能为空",
													type: 'error',
													duration: 1000
												});

											}

										}

									} else {
										this.$message({
											showClose: true,
											message: "权重总和要为1",
											type: 'error',
											duration: 1000
										});

									}
								}
							} else {
								this.$message({
									showClose: true,
									message: "标题小于60字",
									type: 'error',
									duration: 1000
								});

							}

						} else {
							this.$message({
								showClose: true,
								message: "标题不能为空",
								type: 'error',
								duration: 1000
							});

						}
					} else {
						this.$message({
							showClose: true,
							message: "请评分",
							type: 'error',
							duration: 1500
						});
					}

				} else {
					this.$message({
						showClose: true,
						message: "请选择项目",
						type: 'error',
						duration: 1000
					});
				}

			},

		}
	}
</script>