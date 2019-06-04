/**
 * Created by sunchunxiao on 2018/8/14.
 */
import request from '../utils/request'

//项目主页
export const  projectIndex= (params = {}) => {
  return request(`/kff/project/index`, {
    body: {
      ...params
    },
  })
}

//项目主页中的评测列表
export const  evaluationList= (params = {}) => {
  return request(`/kff/project/evaluationList`, {
    body: {
      ...params
    },
  })
}

//项目主页中的爆料列表
export const  discussList= (params = {}) => {
  return request(`/kff/project/discussList`, {
    body: {
      ...params
    },
  })
}

//项目主页中的文章列表
export const  articleList= (params = {}) => {
  return request(`/kff/project/articleList`, {
    body: {
      ...params
    },
  })
}

//获取用户信息接口
export const  getUserInfo= (params = {}) => {
  return request(`/kff/user/getUserInfo`, {
    body: {
      ...params
    },
  })
}




