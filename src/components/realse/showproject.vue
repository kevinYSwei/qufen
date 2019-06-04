<style lang="less">
	.comment {
		.ivu-dropdown-rel {
			width: 200px;
			height: 30px;
			line-height: 30px;
			border: 1px solid #c1c1c1;
			border-radius: 2px;
		}
		.routerV {
			overflow: hidden;
		}
	}

	.ivu-menu-horizontal .ivu-menu-item,
	.ivu-menu-horizontal .ivu-menu-submenu {
		padding: 0;
	}

	.showproject {
		padding: 20px 30px;
	}

	.ivu-input-group .ivu-input {
		width: 25%;
		text-align: center;
		position: absolute!important;
		left: 0 !important;
	}

	.ivu-select-dropdown {
		width: 170px!important;
	}
	/*发布完整评论的输入框字体*/

	.ivu-input {
		color: #333;
	}

	.ivu-select-single .ivu-select-selection {
		margin-left: 55px;
		text-align: center;
		width: 170px;
	}

	.layout-logo {
		display: inline-block;
		width: 300px;
		height: 60px;
		float: left;
		border-radius: 3px;
		color: #000;
		font-size: 24px;
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
		position: absolute;
		right: -13px;
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

	.ivu-layout-content {
		min-height: 0!important;
	}

	.ivu-layout-sider {
		min-width: 260px!important;
		background-color: #f5f7f9!important;
	}

	.ivu-menu {
		z-index: inherit!important;
	}

	.ivu-menu-vertical {
		width: 260px!important;
	}

	.ivu-menu-submenu {
		padding: 20px 0 0 20px;
	}

	.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item {
		padding: 0!important;
		height: 55px;
		line-height: 55px;
	}

	.showA {
		padding: 16px 90px;
	}
	.cx-showproject {
		width: 1500px;
		margin: 0 auto;
		padding-top: 60px;
	}
	.cx-showproject a {
		color: #000;
	}

	.router-link-active {
		color: #2d8cf0!important;
	}

	.ivu-menu-vertical.ivu-menu-light:after {
		width: 0!important;
	}

	.ivu-menu-light {
		background-color: #f5f7f9!important;
	}

	.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
		background-color: rgb(246, 246, 246);
		
	}
	.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):after{
		background: none;
	}

	.cx-showproject .ivu-menu-vertical .ivu-menu-submenu-title {
		padding: 24px;
		text-align: center;
		font-weight: bolder;
		font-size: 15px;
		color: #000;
	}

	.fontWeight {
		font-weight: 500;
	}

	.showImg {
		width: 16px;
		margin-left: -34px;
		margin-right: 10px;
	}

	.ivu-icon-ios-arrow-down:before {
		content: ""!important;
	}
	.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):after{
		background: none!important;
	}
	.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){
		background: none!important;
	}
</style>
<template>
	<div class="cx-showproject">
		<Layout>
			<Sider hide-trigger :style="">
				<Menu :open-names="['1']" accordion>
					<Submenu name="1">
						<template slot="title" class="showA">
							<img class="showImg" src="../../assets/login/content.png" alt="" /> 内容管理
						</template>

						<MenuItem name="1-1">
						<router-link class="showA" to="/showproject">发表评测 </router-link>
						</MenuItem>

						<MenuItem name="1-2">
						<router-link class="showA" to="/addproject">发表文章</router-link>
						</MenuItem>
						<MenuItem name="1-3">
						<router-link class="showA" to="/discussion">发表讨论</router-link>
						</MenuItem>
					</Submenu>
				</Menu>
			</Sider>
			<Layout :style="{padding: '0 0 24px 24px'}">
				<Content :style="{padding: '24px', minHeight: '1000px'}">
					<router-view></router-view>
				</Content>
			</Layout>
		</Layout>

	</div>
</template>
<script>
	export default {
		data() {
			return {
				theme1: 'light'
			}
		}
	}
</script>
