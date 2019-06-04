/**
 * Created by sunchunxiao on 2018/7/23.
 */

import router from '@/router/index'
import request from "./request";

//跳转到登录
export const jumpToLogin = (recordRedirect = true) => {
  let path = '/user/register'
  if (recordRedirect) {
    href += '?redirect=' + window.location.pathname
  }
  router.push({path})
}

// export default util
