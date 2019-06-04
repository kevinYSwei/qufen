<template>
	<div id="app">
		<!--<div class="app-wrap">
			<el-container>
				<el-header>

					<Header></Header>
				</el-header>
				<router-view/>
			</el-container>
		</div>-->
		<!--<router-view/>-->
		<router-view/>
	</div>
</template>

<script>
	import Header from '@/components/layout/header.vue'

	export default {
		name: 'app',
		components: {
			Header
		},
		mounted() {
//			if(this._isMobile()) {
//				alert("手机端");
//				window.location.href = "https://m.qufen.top/main/home"
//			} else {
////				this.$router.replace('https://main.qufen.top');
//				alert("pc端");
////				window.location.href = "https://main.qufen.top"
////				window.location.href = "http://localhost:8080/user/register"
//				return
//			}

		},
		methods: {
			_isMobile() {
				let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
				return flag;
			}
		}
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		/*text-align: center;*/
		color: #2c3e50;
		height: 100%;
		background-color: rgb(246, 246, 246);
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
</style>