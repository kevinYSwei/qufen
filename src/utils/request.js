import axios from 'axios'
import {jumpToLogin} from '@/utils/common'

const specialCode = []

let defaultOpts = {
  method: 'post',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
}
};
// 响应拦截
axios.interceptors.response.use((res) => {
  return res
}, (error) => {
  let message = (error.response.data && error.response.data.msg) || error.msg
  return Promise.reject(error)
})

// option = {method,body,header}
const request = (url, options = {}) => {
  //测试地址
  var url = "/wap" + url;

 //本地 栋栋
 //var url = "http://192.168.10.153:803" + url;

   //var url = "http://192.168.10.128:8081/wap" + url;

  // 数据单据处理 get请求 params
  // let body = {'params': options.body}
  let body = {'data': options.body}
  delete  options.body

  // form表单格式提交
  if (options.isForm) {
    defaultOpts = Object.assign(defaultOpts, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
    delete options.isForm
  }

  return axios(Object.assign({url}, defaultOpts, body, options))
    .then(res => {

      if (res.data.code == 0) {
        return res.data
      } else {
        // Toast(res.data.msg)
        if (res.data.code === specialCode) {
          jumpToLogin()
        }
        return Promise.reject(res.data)
      }
    })
}

export default request
