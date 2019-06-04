/**
 * Created by zhengchangshun on 2018/3/31.
 */

/*用户相关 路由*/
export const userRouter = [

  
 //验证码登录
//{
//  path: "/user/codeLogin",
//  meta: {
//    title: '验证码登录',
//  },
//  component: (resolve) => require(['@/views/user/codeLogin.vue'], resolve)
//},
  //注册 
  {
    path: "/user/register",
    meta: {
      title: '注册',
    },
    component: (resolve) => require(['@/views/user/register.vue'], resolve)
  },
  //登录
  {
    path: "/user/login",
    meta: {
      title: '注册',
    },
    component: (resolve) => require(['@/views/user/login.vue'], resolve)
  }

]
