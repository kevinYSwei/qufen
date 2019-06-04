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

					<!--登录-->
					<!--autocomplete="off" 禁止输入框显示用户历史记录-->
					<div class="bgc-wrap register-wrap" v-show="showLogin">
						<h1>登录区分</h1>
						<p v-show="showTishi">{{tishi}}</p>
						<div class="wrap" style="margin-top: 35px;">
							<!--autocomplete="off" 禁止输入框显示用户历史记录-->
							<input class="wrap-input" type="text" placeholder="请输入手机号" v-model="phone">
							<img class="loginIcon" src="../../assets/login/icon1.png" />
						</div>
						<div class="wrap">
							<input class="wrap-input" type="password" placeholder="请输入密码" v-model="password">
							<img class="loginIcon" src="../../assets/login/icon3.png" />
						</div>

						<div class="loginBtn" @click="login">立即登录</div>
						<div class="span">
							<!--<input type="checkbox" name="autolog" id="autolog" />下次自动登录-->
							<!--<span class="forgetpas">忘记密码</span>-->
							<el-popover title="请下载区分APP修改密码" placement="top-start" width="150" trigger="click">
								<img class="hover-img" src="../../assets/common/download.png" alt="" />
								<span class="toregister1" slot="reference" style="margin-left: 26px;">忘记密码</span>
							</el-popover>
							<span class="toregister" style="margin-left: 26px;" @click="ToRegister">注册</span>

							<!--<el-popover title="请扫码注册区分" placement="top-start" width="150" trigger="click">
								<img class="hover-img" src="../../assets/common/register.png" alt="" />
								<span class="toregister" slot="reference" style="margin-left: 26px;">注册</span>
							</el-popover>-->
						</div>

					</div>

				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import { login, register, getCode } from '@/service/user'
	import Header from '@/components/layout/header'
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
				showLogin: true,
				showRegister: false,
				show: true,
				count: "",
				timer: null,
			}
		},
		components: {
			Header
		},
		mounted() {
			//			if(getCookie('rmbUser') == "true") {
			//				$("#autolog").attr("checked", true);
			//				this.phone = getCookie("username");
			//
			//			}

		},
		//		watch: {
		//			//监测主菜单路由变化
		//			$route: function() {
		//				this.activeIndex = this.$route.path
		//			}
		//		}
		methods: {

			login() {
				var myreg = /^1[3456789]\d{9}$/;

				var timer = 60 * 60 * 24

				this.$cookieStore.setCookie('username', this.phone, timer)
				if(this.phone == "" || this.password == "") {
					this.$message({
						type: 'error',
						message: '请输入手机号或密码',
						duration: 1000
					});

				} else {

					let data = {
						loginName: this.phone,
						password: this.password
					}
					var _this = this
					if(myreg.test(this.phone)) {
						login(data).then(res => {
							if(res.code == 0) {
								this.$cookieStore.setCookie('changeLogin', 100, timer)
								this.$cookieStore.setCookie('img', res.data.userModel.icon, timer)
								this.$cookieStore.setCookie('user', res.data.userModel.userNick, timer)
								this.$cookieStore.setCookie('userType', res.data.userModel.userType, timer)
								this.$cookieStore.setCookie('token', res.data.s, timer)
								this.$cookieStore.setCookie('uid', res.data.userModel.uid, timer)
								this.$router.push("/discovery")

							}
						}).catch(function(error) {
							//						alert(error.msg)
							_this.$message({
								type: 'error',
								message: error.msg,
								duration: 1500
							});
						});
					} else {
						this.$message({
							type: 'error',
							message: '手机号码格式错误',
							duration: 1000
						});

					}

				}

			},

			ToRegister() {
				this.$router.push('/user/register')
			},

		}
	}
</script>

<style lang="less">
	@import './common.less';
</style>
