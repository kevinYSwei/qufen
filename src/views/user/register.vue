<template>
	<div class="cx-register">
		<Header></Header>
		<div class="registerLon">
			<div class="bgc">
				<div class="register-title">
					<img class="logo-title" src="../../assets/login/logo.png" />
					<span>投资区块链，一定要区分</span>
				</div>
				<div class="bac-wrapper">
					<!--注册-->
					<div class="bgc-wrap register-wrap">
						<h1>注册区分</h1>
						<p v-show="showTishi">{{tishi}}</p>
						<div class="wrap" style="margin-top: 35px;">
							<!--autocomplete="off" 禁止输入框显示用户历史记录-->
							<!--手机号-->
							<input autocomplete="off" v-model="registerphone" class="wrap-input a1" type="text" placeholder="请输入手机号">
							<img class="loginIcon" src="../../assets/login/icon1.png" />
						</div>
						<!--验证码-->
						<div class="wrap">
							<input class="wrap-input1" v-model="code" type="text" id="code" placeholder="请输入验证码">
							<img class="loginIcon" src="../../assets/login/icon2.png" />
							<span v-show="show" id="getBtn" class="getCode">获取验证码</span>
						</div>
						<!--密码-->
						<div class="wrap">
							<input class="wrap-input" v-model="password1" type="password" placeholder="请输入密码">
							<img class="loginIcon" src="../../assets/login/icon3.png" />
						</div>
						<div class="loginBtn" @click="register">立即注册</div>
						<div class="span toregister" style="text-align: right;" @click="ToLogin">已有账号？登录</div>
					</div>

				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import { login, register, getCode } from '@/service/user'
	import Header from '@/components/layout/header'
	import gt from '../../assets/js/gt.js'
	export default {
		data() {
			return {
				phone: '',
				password: '',
				registerphone: '',
				code: '',
				password1: '',
				newUsername: '',
				newPassword: '',
				tishi: '',
				showTishi: false,

				show: true,
				count: "",
				timer: null,
			}
		},
		components: {
			Header
		},
		mounted() {
			
			var handler = function(captchaObj) {
				captchaObj.onReady(function() {
					$("#wait").hide();
				}).onSuccess(function() {
					var result = captchaObj.getValidate();
					var _this = this
					if(!result) {
						return alert('请完成验证');
					} else {
						//发送获取验证码的接口请求
						var show = true
						if(show) { //倒计时内只能点一次

							getCode({
								phone: $(".a1").val(),
								module: "register"
							}).catch(function(error) {
								_this.$alert(error.msg, {
									confirmButtonText: '确定',
								});

							})
						}
						const TIME_COUNT = 60;
						var timer = null
						if(!timer) {

							var count = TIME_COUNT;
							show = false;
							timer = setInterval(() => {
								if(count > 0 && count <= TIME_COUNT) {
									count--;
									//									console.log(count)
									$(".getCode").html(count)
									//									console.log($(".getCode").html())
									if($(".getCode").html() == 0) {
										$(".getCode").html("获取验证码")
									}
								} else {
									show = true;
									clearInterval(timer);
									timer = null;
								}
							}, 1000)
						}
						console.log(result)
					}
					$.ajax({
//						url: 'http://192.168.10.153:803/kff/startCaptcha/checkStartCaptcha', //这里的地址是根据你的后台接口的地址
						url: '/wap/kff/startCaptcha/checkStartCaptcha',
						type: 'POST',
						dataType: 'json',
						data: {
							geetest_challenge: result.geetest_challenge,
							geetest_validate: result.geetest_validate,
							geetest_seccode: result.geetest_seccode
						},
						success: function(data) {
							if(data.data.data.status === 'success') {
//								console.log('登录成功');
							} else if(data.data.data.status === 'fail') {
//								console.log('登录失败，请完成验证');
								captchaObj.reset();
							}
						}
					});

				});
				$('#getBtn').click(function() {
//					console.log($(".a1").val())
//					console.log($(".getCode").html())
					var phone = $(".a1").val()
					var getCode = $(".getCode").html()
          var myreg = /^1[3456789]\d{9}$/;

					if(phone != '') {
						if(myreg.test(phone)) {
							if(getCode == "获取验证码") {
								// 调用之前先通过前端表单校验
								captchaObj.verify();
							}
						}else{
							alert("手机号码格式错误")
						}
					} else {
						alert("手机号不能为空")
					}

				});


				// 更多接口说明请参见：http://docs.geetest.com/install/client/web-front/
			}
			$.ajax({ //这个地址也是需要根据自己的后台接口地址来改动
//				url: "http://192.168.10.153:803/kff/startCaptcha/sendStartCaptcha?t=" + (new Date()).getTime(), // 加随机数防止缓存
				url: "/wap/kff/startCaptcha/sendStartCaptcha?t=" + (new Date()).getTime(),
				type: "get",
				dataType: "json",
				success: function(data) {
					//		console.log(data)
					var str = JSON.parse(data.data.resStr)
					//		console.log(str)
					// 调用 initGeetest 进行初始化
					// 参数1：配置参数
					// 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口

					initGeetest({
						// 以下 4 个配置参数为必须，不能缺少
						gt: str.gt,
						challenge: str.challenge,
						offline: !str.success, // 表示用户后台检测极验服务器是否宕机
						new_captcha: str.new_captcha, // 用于宕机时表示是新验证码的宕机

						product: "bind", // 产品形式，包括：float，popup
						width: "300px"
						// 更多配置参数说明请参见：http://docs.geetest.com/install/client/web-front/
					}, handler);
				}
			});

		},
		//		watch: {
		//			//监测主菜单路由变化
		//			$route: function() {
		//				this.activeIndex = this.$route.path
		//			}
		//		}
		methods: {

			//注册
			register() {
				var myreg = /^1[3456789]\d{9}$/;
				if(this.registerphone == "") {
					this.$message({
						type: 'error',
						message: '请输入手机号',
						duration: 1000
					});
				} else if(!myreg.test(this.registerphone)) {
					this.$message({
						type: 'error',
						message: '手机号码格式错误',
						duration: 1000
					});

				} else if(this.code == "") {
					this.$message({
						type: 'error',
						message: '请输入验证码',
						duration: 1000
					});

				} else if(this.password1 == "") {
					this.$message({
						type: 'error',
						message: '请输入密码',
						duration: 1000
					});

				} else {

					let data = {
						phoneNumber: this.registerphone,
						password: this.password1,
						dynamicVerifyCode: this.code
					}
					var _this = this
					register(data).then(res => {
						if(res.code == 0) {
//							console.log(res.msg)
							if(res.msg = 'Success') {
								this.$message('注册成功');
								this.$router.push('/user/login')
							}

						}

					}).catch(function(error) {

						_this.$alert(error.msg, {
							confirmButtonText: '确定',
						});
					});
				}
			},

			ToLogin() {
				this.$router.push('/user/login')
			}

		}
	}
</script>

<style lang="less">
	@import './common.less';
</style>
