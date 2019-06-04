/**
 * Created by sunchunxiao on 2018/9/12.
 */
import request from '../utils/request'

//话题主页
export const getDTagDetail = (params = {}) => {
  return request(`/H5/tags/getDTagDetail`, {
    body: {
      ...params
    },
  })
}

//话题评测,爆料,文章
export const getPostInfoWithTags = (params = {}) => {
  return request(`/H5/post/getPostInfoWithTags`, {
    body: {
      ...params
    },
  })
}

//右侧话题标签
export const getDTagsInfo = (params = {}) => {
  return request(`/H5/tags/getDTagsInfo`, {
    body: {
      ...params
    },
  })
}


