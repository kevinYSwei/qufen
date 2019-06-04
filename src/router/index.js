import Vue from 'vue'
import Router from 'vue-router'
import {mainRouter} from './router_config'
import {userRouter} from './userRouter'     //用户路由
import {detailsRouter} from './detailsRouter'     //文章路由
import {writeRouter} from './writeRouter'     //文章 路由
import {projectRouter} from './projectRouter'     //项目 路由
import {downRouter} from './downRouter'     //下载app路由
import { getCookie } from '../assets/js/cookie.js'
Vue.use(Router)
// 模块路由合并
const routes = [
  ...userRouter,
  ...mainRouter,
  ...detailsRouter,
	...writeRouter,
	...projectRouter,
	...downRouter
]
const router = new Router({
	mode:'history',
  routes: routes
})



//路由钩子 -- 进入前： 权限校验
   router.beforeEach((to, from, next) => {	
   	if(to.matched.some( m => m.meta.auth)){ // 判断该路由是否需要登录权限
   		//这里不能用store.state 因为vuex刷新后又货到初始值的状态，所以存到session缓存中
   	if(getCookie("changeLogin")==100){
   			next() // 正常跳转到你设置好的页面
   		}else{
   			console.log(getCookie("changeLogin"))
   			next({path:'/user/register',query:{ Rurl: to.fullPath} })
   		}
   	}else{
   		next()
   	}

   });
//路由钩子 -- 进入前： 权限校验
//router.beforeEach((to, from, next) => {
//// 鉴权
//if (to.meta.auth) {
//  // 跳转到登录页
//} else {
//  next()
//}
//})

//路由钩子 --- 进入后： 回到顶部
router.afterEach(() => {
  window.scrollTo(0, 0)
})


export default router

