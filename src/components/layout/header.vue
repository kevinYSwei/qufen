<template>
	<div>
		<div class="app-wrap">
			<el-container>
				<el-header>
					<!--头部-->
					<el-row>
						<el-col :span="3">
							<img style="cursor: pointer;" @click="dian" src="../../assets/login/logo.png" class="logo">
						</el-col>
						<el-col :span="15">
							<el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
								<template v-for="(menu,index) in menuData">
									<el-menu-item :index="menu.path" :key="index">{{menu.name}}</el-menu-item>

								</template>
								<div class="understand" @click="next">了解区分</div>
								<div class="nav-wrap">
									<input class="nav-input" type="text" placeholder="搜索您感兴趣的内容">
									<img class="navIcon" src="../../assets/login/search.png" />
								</div>
							</el-menu>
						</el-col>
						<el-col :span="2">
							<div class="logout" @click="app">
								<img class="nav-phone" src="../../assets/down/mobile.png" />
								<a href="javascript:void(0)">下载APP</a>
							</div>
						</el-col>
						<el-col :span="2">
							<div class="logout" @click="release">
								<img class="nav-release" src="../../assets/login/release.png" />
								<a href="javascript:void(0)"> 发布 </a>
							</div>
						</el-col>
						<el-col :span="2">
							<div class="logout">
								<div @click="go" class="headerOcenter">
									<img class="nav-release" src="../../assets/login/onecenter.png" />
								</div>
								<!--<a href="#"></a>-->
								<div class="header-select">
									<Dropdown trigger="click" style="margin-left: 20px">
										<img class="headerImg" :src="src" />
										<img class="layoutV" src="" />
										<a class="cx-username cxuser" href="javascript:void(0)">{{userNick}}</a>
										<DropdownMenu slot="list">
											<DropdownItem><span @click="onecenter">个人主页</span></DropdownItem>
											<DropdownItem><span @click="attention">认证</span></DropdownItem>

											<DropdownItem>
												<a href="javascript:void(0)" @click="quit">点击注销</a>
											</DropdownItem>
										</DropdownMenu>
									</Dropdown>
								</div>
							</div>
						</el-col>
					</el-row>
				</el-header>
				<router-view/>
			</el-container>
		</div>
	</div>

</template>

<script>
	import { menuData } from '@/common/menu'
	import { reviewedL } from '@/service/home'
	export default {
		data() {
			return {
				activeIndex: '',
				menuData,
				userNick: '',
				src: "",
				userType: '',
				token: this.$cookieStore.getCookie('token'),
				clicked: undefined //标识，初始化默认选中第一项
			};
		},

		mounted() {
//			console.log(this.token)
			//登录后
			if(this.$cookieStore.getCookie('username') &&this.$cookieStore.getCookie('token')  ) {
				$(".header-select").css("display", "block")
				$(".headerOcenter").css("display", "none")
			} else {
				$(".header-select").css("display", "none")
				$(".headerOcenter").css("display", "block")
			}

			//头像
			this.src =this.$cookieStore.getCookie('img')
			//用户名
			this.userNick = unescape(this.$cookieStore.getCookie('user'))
			//加V
			this.userType =this.$cookieStore.getCookie('userType')
			//普通用户
			if(this.userType == 1) {
				$(".layoutV").css("display", "none")
			}
			//项目方
			if(this.userType == 2) {
				$(".layoutV").attr("src", "../../static/img/p.gif")
			}
			//评测媒体
			if(this.userType == 3) {
				$(".layoutV").attr("src", "../../static/img/F.gif")
			}
			//机构号
			if(this.userType == 4) {
				$(".layoutV").attr("src", "../../static/img/V.gif")
			}

			this.handleSelect()
		},
		updated(){
			
			var username = $(".cxuser").html()
			var length = username.length
//			console.log(length)
			if(length<=3){
				$(".cxuser ").removeClass("cx-username")
			}
		},
		methods: {
			//下载app
			app(){
				this.$router.push('/download')	
			},
			next(){
				window.open('https://g.qufen.top', "_blank")
			},
			onecenter() {
				var id =this.$cookieStore.getCookie('uid')
				window.open('/onecenter?id=' + id, "_blank")
			},
//			未登录时点击头像
			go(){
				this.$router.push("/user/login")
			},
			dian(){
				this.$router.push("/discovery")
			},
			changeTab(index) {
				if(index == index) {
					this.clicked = this.clicked === index ? undefined : index
				}
			},
			attention() {
				var _this = this
				this.$router.push("/attentionselect")
				let data = {
					token: this.token
				}
				reviewedL(data).then(res => {
					if(res.code == 0) {
						//成功
						if(res.data.status == 2) {
							this.$router.push("/examine")
						}
						// 待审核
						else if(res.data.status == 1) {

							this.$router.push("/examine")
						}
						//审核不通过
						else if(res.data.status == 3) {
							this.$router.push("/examine")
						}
						//未提交审核
						else if(res.data.status == 4) {
							_this.$router.push("/attentionSelect")
						}
					}
				}).catch(function(error) {
					alert(error.msg);
				});

			},
			quit() {
				this.$cookieStore.delCookie('username')
				this.$cookieStore.delCookie('token')
				this.$cookieStore.delCookie('changeLogin')
				this.$cookieStore.delCookie('user')
				this.$cookieStore.delCookie('userType')
				this.$cookieStore.delCookie('img')
				this.$cookieStore.delCookie('uid')
//				delCookie('username')
//				delCookie('token')
//				delCookie('changeLogin')
//				delCookie('user')
//				delCookie('userType')
//				delCookie('img')
//				delCookie('uid')
				this.$router.push("/user/login");
			},
			handleSelect(key, keyPath) {
				if(key == '/discovery') {
					this.activeIndex = menuData[0].path
				} else if(key == '/attention') {
					this.activeIndex = menuData[1].path
				} else if(key == '/project') {
					this.activeIndex = menuData[2].path
				}
				//				console.log(key, keyPath);
			},
			release() {
				if(this.$cookieStore.getCookie('username')) {
//					window.open('/quhomelist', "_blank")
					this.$router.push('/quhomelist')

				} else {
					this.$router.push('/user/login')
				}

			}
		},

		watch: {
			//监测主菜单路由变化
			$route: function() {
				this.activeIndex = this.$route.path || menuData[0].path
			}
		}
	}
</script>

<style>
	.bor {
		border-bottom: 2px solid #409EFF!important;
	}



	.app-wrap {
		height: 100%;
	}

	.el-container.is-vertical {
		height: 100%;
	}

	.el-header,
	.el-footer {
		background-color: #B3C0D1;
		color: #333;
		text-align: center;
		line-height: 60px;
	}

	.el-aside {
		background-color: #D3DCE6;
		color: #333;
		height: 750px;
		text-align: center;
		line-height: 200px;
	}

	.el-main {
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
	}

	body>.el-container {
		margin-bottom: 40px;
	}

	.ivu-select-dropdown {
		top: 70px!important;
	}

	.layout {
		height: 100%;
		background: #f5f7f9;
		position: relative;
		border-radius: 4px;
	}

	.header-select {
		display: none;
	}

	.layout-logo {
		display: inline-block;
		width: 300px;
		height: 60px;
		float: left;
		border-radius: 3px;
		color: #000;
		font-size: 24px;
		cursor: pointer;
	}

	.layout-logo img {
		width: 12%;
		display: inline-block;
		margin-top: 7px;
		float: left;
	}

	.layout-nav {
		width: 200px;
		height: 60px;
		text-align: center;
	}

	.ivu-layout-header {
		position: relative;
		background: #fff;
	}

	.ivu-dropdown {
		/*width: 70px;*/
		position: absolute;
		right: -10px;
	}

	.cx-username {
		width: 46px;
		position: absolute;
		left: 36px;
		height: 50px;
		line-height: none!important;
		/*text-overflow: ellipsis;
		display: -webkit-box;*/
		/*! autoprefixer: off */
		/*-webkit-box-orient: vertical;*/
		/*  autoprefixer: on */
		/*-webkit-line-clamp: 1;*/
	}
	.cxuser{
		width: 46px;
		position: absolute;
		left: 36px;
		height: 50px;
		line-height: none!important;
	}

	.cx-username:after {
		content: "...";
		position: absolute;
		right: -5px;
		top: 0px;
		/*display: none;*/
	}
	.ivu-dropdown-rel{
		width: 87px;
		height: 50px;
		overflow: hidden;
	}
	.ivu-dropdown-rel>a {
		color: #fff;
	}

	.ivu-menu-dark {
		background: #fff;
	}

	.ivu-dropdown-rel>a {
		color: #000;
	}

	.ivu-dropdown-item {
		padding: 7px 26px;
	}

	.ivu-dropdown-item span {
		display: inline-block;
		padding: 6px 35px;
	}

	.headerImg {
		width: 30px;
		height: 30px;
		border: 1px solid #ddd;
		border-radius: 50%;
		float: left;
		margin-top: 14px;
		margin-right: 10px;
	}

	.layoutV {
		width: 12px;
		position: absolute;
		left: 24px;
		top: 32px;
	}
	.nav-phone{
		width: 14px;
		position: absolute;
		top: 19px;
		left: 0;
	}
	.nav-wrap {
		float: left;
		margin-top: 16px;
		position: relative;
		margin-left: 26px;
	}

	.nav-wrap input::-webkit-input-placeholder {
		font-size: 13px;
		color: rgb(126, 126, 126);
	}

	.el-row {
		width: 1100px;
		margin: 0 auto;
	}

	.nav-input {
		color: rgb(126, 126, 126);
		display: block;
		width: 320px;
		height: 30px;
		line-height: 30px;
		border-radius: 4px;
		font-size: 16px;
		margin: 0 auto;
		outline: none;
		border: none;
		border-bottom: 1px solid rgb(228, 228, 228);
		padding-left: 20px;
		box-sizing: border-box;
		background-color: rgb(246, 246, 246);
	}

	.nav-input:focus {
		outline: none;
	}
	.understand{
		width: 100px;
		outline: none;
		cursor: pointer;
		color: rgb(133,144,166);
		float: left;
		font-size: 14px;

	}
	.navIcon {
		width: 6%;
		position: absolute;
		right: 9px;
		top: 5px;
	}

	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
		min-height: 400px;
	}

	.logo {
		width: 70px;
		margin-top: 13px;
	}

	.logout {
		cursor: pointer;
		position: relative;
	}

	.logout a {
		color: rgb(133, 144, 166);
	}

	.nav-release {
		width: 20px;
		position: absolute;
		top: 19px;
		left: 0;
	}

	.el-header {
		background-color: #fff!important;
		border-bottom: 1px solid #dcdfe2;
		box-shadow: 0 1px 3px 0 rgba(23, 81, 153, .05);
	}

	.el-container.is-vertical {
		background-color: rgb(246, 246, 246);
	}
	/*固定头部*/
	/*.el-footer, .el-header{
		background-color: #fff;
	}*/

	.el-header,
	.el-footer {
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 100;
		background-color: #fff;
	}

	.el-menu--horizontal {
		height: 60px;
		background-color: #fff!important;
		box-sizing: border-box;
		border-bottom: 1px solid #dcdfe2;
		/*box-shadow:0 1px 3px 0 rgba(23,81,153,.05);*/
	}

	.el-menu--horizontal>.el-menu-item {
		height: 59px!important;
		color: rgb(133,144,166)!important;
		font-weight: 600;
		 /*border-bottom: 2px solid #409EFF!important;*/
	}
	.el-menu--horizontal>.el-menu-item.is-active{
		border-bottom: 2px solid #409EFF!important;
		color: rgb(59,136,246)!important;
	}
	.el-menu--horizontal li {
		color: rgb(133, 144, 166)!important;
		background-color: #fff!important;
	}

	/*@media only screen and (max-width: 1600px) {
		.el-row {
			width: 1100px;
		}
		.nav-wrap{
			margin-left:15px;
		}
	}*/
</style>
