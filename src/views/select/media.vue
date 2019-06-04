<style lang="less">
	@import './common.less';
	
</style>
<template>
	<div class="media realseCommon">
		<div class="qf-ofiicial">
			<div class="qf-attention color">
				<Icon type="ios-navigate"></Icon>区分认证</div>
			<!--<p>当前正在进行第 {{ current + 1 }} 步</p>-->
			<div class="qf-select">
				<span class="check color">填写入驻资料</span>
				<span class="progress-per">测评媒体</span>
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
					<FormItem label="认证信息" prop="desc">
						<Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="示例：区分FIND官方账号请不要使用修饰性词汇，例如：最大最好。不要超过30个"></Input>
					</FormItem>

				</Form>

			</div>

			<!--机构材料-->
			<div>
				<div class="qf-title color">机构材料</div>
				<Form ref="formValidate" :model="institution" :rules="ruleValidate" :label-width="80">
					<FormItem label="媒体名称" prop="name1">
						<Input v-model="institution.name1" placeholder="请输入媒体名称"></Input>
					</FormItem>
					<FormItem label="媒体渠道" prop="message">
						<Input v-model="institution.message" placeholder="列举已注册的媒体渠道"></Input>
					</FormItem>
					<FormItem label="测评内容链接" prop="link1">
						<Input v-model="institution.link1" placeholder="评测内容链接"></Input>
					</FormItem>
					<FormItem label="辅助材料" prop="photo">
						<span class="please color">上传在其他内容平台（例如微信公众号、头条号或百家号等）管理后台的截图，证明管理资质。</span>
					</FormItem>
					<!--<div class="upload">-->
					<UploadR @aa="getA($event)"></UploadR>
					<!--</div>-->
					<!--运营者信息-->
					<div>
						<div class="qf-title color">运营者信息</div>
						<Form ref="operator" :model="operator" :rules="ruleValidate" :label-width="80">
							<FormItem label="运营者姓名" prop="name2">
								<Input v-model="operator.name2" placeholder="请填写实际运营人姓名"></Input>
							</FormItem>
							<FormItem label="微信号" prop="num">
								<Input v-model="operator.num" placeholder="运营者微信号，便于我们的运营人员联系。"></Input>
							</FormItem>
							<FormItem label="联系邮箱" prop="mail">
								<Input v-model="operator.mail" placeholder="请填联系邮箱"></Input>
							</FormItem>
						</Form>

					</div>

				</Form>
				<div class="btn">
					<Button type="primary" @click="next">提交审核</Button>
				</div>
			</div>
		</div>
		<!--发布中-->
		<Tip></Tip>
	</div>

</template>

<script>
	import UploadR from "../../components/realse/uploadren1"
	import Tip from '../../components/realse/message'
	import { submitAuthenTiForm } from '@/service/attention'
	import { getCookie } from '../../assets/js/cookie.js'
	export default {
		data() {
			return {
				current: 1,
				material: "",
				formValidate: {
					name: '',
					phone: '',
					desc: ''
				},
				institution: {
					link1: '',
					name1: '',
					message: ''
				},
				operator: {
					name2: '',
					num: '',
					phone: '',
					mail: ''
				},
				ruleValidate: {
					photo: [{
						required: true,
					}],
					name: [{
						required: true,
						max: 10,
						message: '区分昵称不能超过10个字',
						trigger: 'blur'
					}],
					name1: [{
						required: true,
						max: 100,
						message: '媒体名称不能为空',
						trigger: 'blur'
					}],
					name2: [{
						required: true,
						max: 1000,
						message: '填写运营者姓名',
						trigger: 'blur'
					}],
					num: [{
						required: true,
						message: '请输入微信号',
						trigger: 'blur'
					}],
					link1: [{
						required: true,
						message: '输入评测内容',
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
					city: [{
						required: true,
						message: '请填写你的地址',
						trigger: 'blur'
					}],
					message: [{
						required: true,
						message: '列举已注册的媒体渠道',
						trigger: 'blur'
					}],
					desc: [{
							required: true,
							message: '请输入认证信息',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 30,
							message: '认证信息不能超过30 字!',
							trigger: 'blur'
						}
					]
				}
			}
		},
		components: {
			UploadR,
			Tip
		},
		methods: {
			getA(data) {

				this.material = data;
				console.log(this.material)
			},
			//提交信息
			next() {
				var mail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/;
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
				} else if(this.formValidate.desc == '') {
					this.$alert('请填写认证信息', {
						confirmButtonText: '确定',
					});
				} else if(this.formValidate.desc.length > 30) {
					this.$alert('认证信息不能超过30个字', {
						confirmButtonText: '确定',
					});
				} else if(this.institution.name1 == '') {
					this.$alert('请填写媒体名称', {
						confirmButtonText: '确定',
					});
				} else if(this.institution.message == '') {
					this.$alert('请填写媒体渠道', {
						confirmButtonText: '确定',
					});
				} else if(this.institution.link1 == '') {
					this.$alert('请填写媒体内容链接', {
						confirmButtonText: '确定',
					});
				} else if(this.material == '') {
					this.$alert('请上传辅助材料', {
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
				} else if(this.operator.num == '') {
					this.$alert('请填写微信号', {
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
							//评测类型   评测媒体
							type: "2",
							//区分昵称
							qufennickname: this.formValidate.name,
							//认证信息
							authinformation: this.formValidate.desc,
							//媒体名称
							medianame: this.institution.name1,
							//媒体渠道
							mediachannel: this.institution.message,
							//测评内容链接
							link: this.institution.link1,
							//辅助材料
							assistpic: this.material,
							//运营者姓名
							operatorname: this.operator.name2,
							//微信号
							wechat: this.operator.num,
							//联系邮箱
							mail: this.operator.mail,

						}
						submitAuthenTiForm(data).then(res => {
							console.log(res.data)
							if(res.code == 0) {
								this.$router.push("/examine")
								console.log(res.data)

							} else {
								this.msg = res.msg
								this.$message({
									showClose: true,
									message: this.msg,
									type: 'error',
								});

							}

						}).catch(function(error) {
							//点击发布显示正在发布中
							$(".web-tip").hide();
//							console.log(error);
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