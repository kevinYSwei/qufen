<style lang="less">
	.comment {
		background-color: #fff;
		margin-top: 30px;
		.ivu-dropdown-rel {
			width: 200px;
			height: 30px;
			line-height: 30px;
			border: 1px solid #c1c1c1;
			border-radius: 2px;
		}
		.routerV {
			overflow: hidden;
			padding: 24px;
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
	
	/*.ivu-select-dropdown {
		width: 170px!important;
	}*/
	/*发布完整评论的输入框字体*/

	.ivu-input {
		color: #333;
	}

	.ivu-select-single .ivu-select-selection {
		margin-left: 55px;
		text-align: center;
		width: 170px;
	}

	.showprojectH {
		font-weight: 400;
		padding-bottom: 10px;
	}
</style>
<template>
	<div>
		<h1 class="showprojectH">发布评测</h1>
		<!--active-name="2"-->
		<Menu mode="horizontal" :theme="theme1" >

			<MenuItem name="1">
        <router-link to="/publishing" class="showproject">
           发表精评
        </router-link>
			</MenuItem>
			<!--发表单项评论-->
			<!--<MenuItem name="2">-->
			<!--<router-link to="/pubcomment" class="showproject">-->
				<!--发表单项评测-->
			<!--</router-link>-->
			<!--</MenuItem>-->
			<MenuItem name="2">
        <router-link to="/publish" class="showproject">
          发表FIND评测
        </router-link>

			</MenuItem>

		</Menu>
		<div class="comment">
			<router-view class="routerV"></router-view>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				theme1: 'light'
			}
		},

	}
</script>
