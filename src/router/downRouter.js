/**
 * Created by sunchunxiao on 2018/3/31.
 */

/*下载app路由*/
export const downRouter = [
  //下载
  {
    path: "/download",
    meta: {
      title: '注册',
    },
    component: (resolve) => require(['@/views/down/index.vue'], resolve)
  },

]
