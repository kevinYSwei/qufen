/**
 * Created by sunchuxniao on 2018/8/14.
 */
import request from '../utils/request'

//首页推荐  文章列表
export const recommend = (params = {}) => {
  return request(`/kff/home/recommendList`, {
    body: {
      ...params
    },
  })
}

//首页关注  
export const followList = (params = {}) => {
  return request(`/kff/home/followList`, {
    body: {
      ...params
    },
  })
}

// 文章详情
export const article = (params = {}) => {
  return request(`/kff/home/articleDetail`, {
    body: {
      ...params
    },
  })
}

// 爆料详情
export const discuss = (params = {}) => {
  return request(`/kff/home/discussDetail`, {
    body: {
      ...params
    },
  })
}
//测评
export const articleInfo = (params = {}) => {
  return request(`/kff/home/evaluationDetail`, {
    body: {
      ...params
    },
  })
}

//项目列表
export const project = (params = {}) => {
  return request(`/kff/project/getProjectByTabId`, {
    body: {
      ...params
    },
  })
}



//认证
export const reviewedL = (params = {}) => {
  return request(`/kff/authentication/reviewed`, {
    body: {
      ...params
    },
  })
}

//项目主页中关注
export const  saveFollow= (params = {}) => {
  return request(`/kff/follow/saveFollow`, {
    body: {
      ...params
    },
  })
}


//项目主页中取消关注
export const  cancelFollow= (params = {}) => {
  return request(`/kff/follow/cancelFollow`, {
    body: {
      ...params
    },
  })
}

//展示评测,文章评论列表接口
export const  postCommentList= (params = {}) => {
  return request(`/kff/home/postCommentList`, {
    body: {
      ...params
    },
  })
}

//展示爆料评论列表接口
export const  discussCommentList= (params = {}) => {
  return request(`/kff/home/discussCommentList`, {
    body: {
      ...params
    },
  })
}

//评论
export const  saveComment= (params = {}) => {
  return request(`/kff/comments/saveComment`, {
    body: {
      ...params
    },
  })
}
//点赞
export const  savePostPraise= (params = {}) => {
  return request(`/kff/praise/savePostPraise`, {
    body: {
      ...params
    },
  })
}