<style lang="less">
	@import './common.less';
	
	.upload {
		width: 100px;
		height: 100px;
		padding-left: 190px;
		display: inline-block;
	}
	
	.applyOfficial {
		font-size: 14px;
		color: #57a3f3;
		letter-spacing: 0;
	}
	
	
</style>
<template>
	<div class="realseCommon">
		<div class="qf-ofiicial">
			<div class="qf-attention color">
				<Icon type="ios-navigate"></Icon>区分认证</div>
			<!--<p>当前正在进行第 {{ current + 1 }} 步</p>-->
			<div class="qf-select">
				<span class="check color">填写入驻资料</span>
				<span class="progress-per">项目方</span>
			</div>
		</div>
		<div class="realseContent">
			<div class="qf-type">
				<Steps :current="current">
					<Step title="选择类型"></Step>
					<Step title="提交材料"></Step>
					<Step title="等待审核"></Step>
				</Steps>
			</div>
			<!--展示信息-->
			<div>
				<div class="qf-title color">展示信息</div>
				<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
					<FormItem label="区分昵称" prop="name">
						<Input v-model="formValidate.name" placeholder="请输入项目名称,不要超过10个字"></Input>

					</FormItem>
					<FormItem label="认证信息" prop="message1">
						<Input v-model="formValidate.message1" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="示例：区分FIND官方账号请不要使用修饰性词汇，例如：最大最好。不要超过30个"></Input>
					</FormItem>

				</Form>

			</div>

			<!--机构材料-->
			<div>
				<div class="qf-title color">机构材料</div>
				<Form ref="formValidate" :model="qiye" :rules="ruleValidate" :label-width="80">
					<FormItem label="企业名称" prop="name1">
						<Input v-model="qiye.name1" placeholder="请输入营业执照上的全称，只支持中国大陆工商局或市场监督管理局登记的企业。"></Input>
					</FormItem>
					<FormItem label="营业执照注册号" prop="desc">
						<Input v-model="qiye.desc" placeholder="请输入15位营业执照注册号或18为统一社会信用代码。"></Input>
					</FormItem>
					<FormItem label="企业工商管理营业执照" prop="photo">
						<span class="please color">请上传中国大陆工商局或市场监督管理局颁发的最新工商营业执照。</span>
					</FormItem>

					<UploadR @aa="getA($event)"></UploadR>

					<FormItem label="认证公函" prop="photo">
						<span class="please color">下载填写<span class="applyOfficial"><a href="https://pic.qufen.top/%E5%AE%98%E6%96%B9%E8%AE%A4%E8%AF%81%E9%80%9A%E7%94%A8%E7%94%B3%E8%AF%B7%E5%85%AC%E5%87%BD%28%E9%A1%B9%E7%9B%AE%E5%8F%B7%29.docx">《官方认证通用申请公函》</a></span>，填写完成后加盖红色公章，请上传清晰的公函扫描件(图片)。</span>
					</FormItem>
					<UploadRe @bb="getB($event)"></UploadRe>
				</Form>

			</div>
			<!--运营者信息-->
			<div>
				<div class="qf-title color">运营者信息</div>
				<Form ref="formValidate" :model="operator" :rules="ruleValidate" :label-width="80">
					<FormItem label="运营者姓名" prop="name2">
						<Input v-model="operator.name2" placeholder="请填写实际运营人姓名"></Input>
					</FormItem>
					<FormItem label="运营人手机号码" prop="phone">
						<Input v-model="operator.phone" placeholder="请填写运营人手机号码"></Input>
						<div>
							<p>此号码将用于认证的资料核实，以及后续的服务。</p>
							<span>提交认证后会有客服电话与您联系，请保持电话畅通。联络不上将会影响您的审核结果</span>
						</div>
					</FormItem>
					<FormItem label="联系邮箱" prop="mail">
						<Input v-model="operator.mail" placeholder="请填联系邮箱"></Input>
					</FormItem>

				</Form>

			</div>
			<div class="btn">
				<Button type="primary" @click="next">提交审核</Button>
			</div>
		</div>
		<!--发布中-->
		<Tip></Tip>
	</div>

</template>

<script>
	import UploadR from "../../components/realse/uploadren1"
	import UploadRe from "../../components/realse/uploadren2"
	import Tip from '../../components/realse/message'
	import { submitAuthenTiForm } from '@/service/attention'
	import { getCookie } from '../../assets/js/cookie.js'
	export default {

		data() {
			return {
				current: 1,
				msg: "",
				w: "",
				a: "",
				b: "",
				formValidate: {
					name: '',
					phone: '',
					mail: '',
					city: '',
					desc: '',
					message1: ''
				},
				qiye: {
					desc: '',
					name1: ''
				},
				operator: {
					name2: '',
					phone: '',
					mail: '',
				},
				ruleValidate: {
					photo: [{
						required: true,
					}],
					name1: [{
						required: true,
						max: 100,
						message: '企业名称不能为空',
						trigger: 'blur'
					}],
					name: [{
						required: true,
						max: 10,
						message: '区分昵称不能超过10个字',
						trigger: 'blur'
					}],
					name2: [{
						required: true,
						max: 1000,
						message: '填写运营者姓名',
						trigger: 'blur'
					}],
					mail: [{
							required: true,
							message: '邮箱不能为空',
							trigger: 'blur'
						},
						{
							type: 'email',
							message: '不正确的电子邮件格式',
							trigger: 'blur'
						}
					],
					phone: [{
						required: true,
						message: '手机格式不正确',
						pattern: /^1[345786]\d{9}$/,
						trigger: 'blur'
					}],
					message1: [{
						required: true,
						message: '认证信息不能超过30 字!',
						type: 'string',
						max: 30,
						trigger: 'blur'
					}],

					desc: [{
							required: true,
							message: '请输入15位营业执照注册号或18为统一社会信用代码。',
							trigger: 'blur'
						},
						{
							type: 'string',
							pattern: /(\d{15})$|^[0-9A-Z]{18}$/g,
							message: '请输入15位营业执照注册号或18为统一社会信用代码。',
							trigger: 'blur'
						}
					]
				}
			}
		},
		components: {
			UploadR,
			UploadRe,
			Tip
		},
		mounted() {

		},
		methods: {
			//营业号
			getA(data) {
				this.a = data;
				console.log(this.a)
			},
			//认证公函
			getB(data1) {
				this.b = data1
				console.log(data1)
			},
			//提交信息
			next() {
				

				var reg = /^1[34578]\d{9}$/;
				var mail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/;
				var code1 = /(\d{15})$/
				var code2 = /^[0-9A-Z]{18}$/g;
				var _this = this;
				var token = getCookie('token')
				if(this.formValidate.name == '') {
					console.log(this.formValidate.name.length)
					this.$alert('请填写区分昵称', {
						confirmButtonText: '确定',
					});
				} else if(this.formValidate.name.length > 10) {
					this.$alert('区分昵称不能超过10个字', {
						confirmButtonText: '确定',
					});
				} else if(this.formValidate.message1.length > 30) {
					this.$alert('认证信息不能超过30个字', {
						confirmButtonText: '确定',
					});
				} else if(this.formValidate.message1 == '') {
					this.$alert('请填写认证信息', {
						confirmButtonText: '确定',
					});
				} else if(this.qiye.name1 == '') {
					this.$alert('请填写企业名称', {
						confirmButtonText: '确定',
					});

				} else if(this.qiye.desc == '' && !code1.test(this.qiye.desc)) {
					this.$alert('请填写营业执照注册号', {
						confirmButtonText: '确定',
					});

				}
				//				else if(!code2.test(this.qiye.desc)) {
				//					this.$alert('请填写正确的营业执照注册号', {
				//						confirmButtonText: '确定',
				//					});
				//				}
				else if(this.a == '') {
					this.$alert('请填写企业工商管理营业执照', {
						confirmButtonText: '确定',
					});

				} else if(this.b == '') {
					this.$alert('请填写认证公函', {
						confirmButtonText: '确定',
					});

				} else if(this.operator.name2 == '') {
					this.$alert('请填写运营者姓名', {
						confirmButtonText: '确定',
					});

				} else if(this.operator.name2.length > 10) {
					this.$alert('运营者姓名不能超过10个字', {
						confirmButtonText: '确定',
					});
				} else if(this.operator.phone == '') {
					this.$alert('请填写运营者手机号', {
						confirmButtonText: '确定',
					});
				} else if(!reg.test(this.operator.phone)) {
					this.$alert('运营者手机号格式不正确', {
						confirmButtonText: '确定',
					});
				} else if(this.operator.mail == '') {
					this.$alert('请填写邮箱', {
						confirmButtonText: '确定',
					});
				} else if(!mail.test(this.operator.mail)) {
					this.$alert('邮箱格式不正确', {
						confirmButtonText: '确定',
					});
				} else {
					//点击发布显示正在发布中
					$(".web-tip").show();
					
					setTimeout(() => {
						let data = {
							//用户token
							token: token,
							//评测类型  项目方
							type: "1",
							//区分昵称
							qufennickname: this.formValidate.name,
							//认证信息
							authinformation: this.formValidate.message1,
							//企业名称
							company: this.qiye.name1,
							//营业执照注册号
							registrationnum: this.qiye.desc,
							//企业工商管理营业执照
							licencepic: this.a,
							//认证公函
							missivepic: this.b,
							//运营者姓名
							operatorname: this.operator.name2,
							//运营者手机号
							number: this.operator.phone,
							//邮箱
							mail: this.operator.mail,
						}

						submitAuthenTiForm(data).then(res => {

							console.log(res.data)
							if(res.code == 0) {
								this.$router.push("/examine")
								console.log(res.data)
							}

						}).catch(function(error) {
							//点击发布显示正在发布中
							$(".web-tip").hide();
					
							alert(error.msg)
						});
					}, 1000);

				}

			},

			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						this.$Message.success('Success!');
					} else {
						this.$Message.error('Fail!');
					}
				})
			},
			handleReset(name) {
				this.$refs[name].resetFields();
			}
		}
	}
</script>