/**
 * Created by sunchunxiao on 2018/6/6.
 */

import request from '../utils/request'

//发送请求  货币选择
export const publishCode = (params = {}) => {
  return request(`/kff/project/selectProjectName`, {
    body: {
      // ...data
      ...params
    },
  })
}

//接受参数   后台返回的评测项目
export const searchEvaluation= (params = {}) => {
  return request(`/kff/evaluation/searchEvaluationModel`, {
    body: {
      ...params
    },
  })
}
//发布完整评论  发布
export const publishW= (params = {}) => {
  return request(`/kff/evaluation/saveEvaluation`, {
    body: {
      ...params
    },
  })
}

//发布单项评论
export const publishD= (params = {}) => {
  return request(`/kff/evaluation/searchEvaluationModel`, {
    body: {
      ...params
    },
  })
}

//发布讨论
export const savediscuss= (params = {}) => {
  return request(`/kff/discuss/saveDiscuss`, {
    body: {
      ...params
    },
  })
}

//发布文章
export const savearticle= (params = {}) => {
  return request(`/kff/article/saveArticle`, {
    body: {
      ...params
    },
  })
}

//发布讨论的标签
export const publishtag= (params = {}) => {
  return request(`/kff/discuss/tagList`, {
    body: {
      ...params
    },
  })
}
//图片上传七牛云
export const upload= (params = {}) => {
  return request(`/kff/qiNiuUpload/sendToken`, {
    body: {
      ...params
    },
  })
}

//标签
export const getTagsAndTagType= (params = {}) => {
  return request(`/H5/tags/getTagsAndTagType`, {
    body: {
      ...params
    },
  })
}

