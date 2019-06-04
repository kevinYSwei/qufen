/**
 * Created by sunchunxiao on 2018/8/14.
 */

/*项目主页相关 路由*/
export const projectRouter = [
	/*测评详细部分（start）*/
	//文章
	{
		path: "/",
		meta: {
			title: '项目',
		},
		component: (resolve) => require(['@/components/layout/header.vue'], resolve),
		children: [
			//项目主页
			{
				path: '/summary/projectdetail',
				meta: {
					title: '项目主页'
				},
				component: (resolve) => require(['@/views/details/projectdetail.vue'], resolve),
				children: [
				{
					path: '/summary/evaluatingdetail',
					meta: {
						title: '项目评测'
					},
					component: (resolve) => require(['@/views/details/evaluatingdetail.vue'], resolve)
				},
				{
					path: '/summary/burstdetail',
					meta: {
						title: '项目爆料'
					},
					component: (resolve) => require(['@/views/details/burstdetail.vue'], resolve)
				},
				{
					path: '/summary/articledetail',
					meta: {
						title: '项目文章'
					},
					component: (resolve) => require(['@/views/details/articledetail.vue'], resolve)
				},
				
				]
			},
			//个人主页
			{
				path: "/onecenter",
				meta: {
					title: '个人主页',
				},
				component: (resolve) => require(['@/views/details/onecenter.vue'], resolve),
				children:[
				{
					path: '/summary/evaluatingcenter',
					meta: {
						title: '用户评测'
					},
					component: (resolve) => require(['@/views/details/evaluatingcenter.vue'], resolve)
				},
				{
					path: '/summary/burstcenter',
					meta: {
						title: '用户爆料'
					},
					component: (resolve) => require(['@/views/details/burstcenter.vue'], resolve)
				},
				{
					path: '/summary/articlecenter',
					meta: {
						title: '用户爆料'
					},
					component: (resolve) => require(['@/views/details/articlecenter.vue'], resolve)
				},]
			},
			//话题主页
			{
				path: "/topic",
				meta: {
					title: '话题主页',
				},
				component: (resolve) => require(['@/views/topic/index.vue'], resolve),
				children:[
				{
					path: '/topic/evaluating',
					meta: {
						title: '话题评测'
					},
					component: (resolve) => require(['@/views/topic/evaluating.vue'], resolve)
				},
				{
					path: '/topic/discuss',
					meta: {
						title: '话题爆料'
					},
					component: (resolve) => require(['@/views/topic/burst.vue'], resolve)
				},
				{
					path: '/topic/article',
					meta: {
						title: '话题文章'
					},
					component: (resolve) => require(['@/views/topic/article.vue'], resolve)
				},]
			},

		]
	},
	

]