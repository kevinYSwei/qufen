/**
 * Created by sunchunxiao on 2018/7/30.
 */
import request from '../utils/request'

//登录
export const login = (params = {}) => {
  return request(`/kff/user/login`, {
    body: {
      ...params
    },
  })
}

//注册
export const register = (params = {}) => {
  return request(`/kff/user/register`, {
    body: {
      ...params
    },
  })
}

export const getCode = (params = {}) => {
  return request('/kff/dynamicValidateCode/sendAliyun',{
    body: {
      ...params
    }
  })
}

