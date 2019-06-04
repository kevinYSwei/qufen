/**
 * Created by sunchunxiao on 2018/6/6.
 */

import request from '../utils/request'


//重新填写
export const submitattention = (params = {}) => {
  return request(`/kff/authentication/submitAuthenTiFormAgain`, {
    body: {
      ...params
    },
  })
}

//项目方  评测媒体  机构号
export const submitAuthenTiForm = (params = {}) => {
  return request(`/kff/authentication/submitAuthenTiForm`, {
    body: {
      ...params
    },
  })
}
