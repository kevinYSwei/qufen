// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './css/reset.css'
import $ from 'jquery'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import 'babel-polyfill'
import {getCookie,setCookie,delCookie} from '@/assets/js/cookie.js'


//七牛
import * as qiniu from 'qiniu-js'


Vue.config.productionTip = false
Vue.prototype.$cookieStore = {
	setCookie,
	getCookie,
	delCookie
}

// 加载插件
Vue.use(iView)
Vue.use(ElementUI)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
