/**
 * Created by sunchunxiao on 2018/7/26.
 */

/*项目主页相关 路由*/
export const detailsRouter = [
	/*测评详细部分（start）*/
	//文章
	{
		path: "/project",
		meta: {
			title: '发现',
		},
		component: (resolve) => require(['@/components/layout/header.vue'], resolve),
		children: [
			//文章
			{
				path: '/project/article',
				meta: {
					title: '文章'
				},
				component: (resolve) => require(['@/views/details/article.vue'], resolve)
			},
			//爆料
			{
				path: '/project/discuss',
				meta: {
					title: '爆料'
				},
				component: (resolve) => require(['@/views/details/burst.vue'], resolve)
			},
			//评测
			{
				path: '/project/articleInfo',
				meta: {
					title: '爆料'
				},
				component: (resolve) => require(['@/views/details/evaluating.vue'], resolve)
			},
			
			
			//预览文章
			{
				path: '/preview/article',
				meta: {
					title: '文章'
				},
				component: (resolve) => require(['@/views/preview/article.vue'], resolve)
			},
			//爆料
			{
				path: '/preview/burst',
				meta: {
					title: '爆料'
				},
				component: (resolve) => require(['@/views/preview/burst.vue'], resolve)
			},
			//评测
			{
				path: '/preview/evaluating',
				meta: {
					title: '爆料'
				},
				component: (resolve) => require(['@/views/preview/evaluating.vue'], resolve)
			},
			

		]
	},

]