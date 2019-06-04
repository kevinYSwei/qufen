/**
 * Created by sunchunxiao on 2018/6.7.
 */

export const writeRouter = [
	//用户登录
	{
		path: "/quhomelist",

		component: (resolve) => require(['@/components/layout/header.vue'], resolve),
		children: [{
				path: '/quhomelist',
				meta: {
					title: '左边导航'
				},
				component: (resolve) => require(['@/components/realse/showproject.vue'], resolve),
				children: [{
					path: '/quhomelist',
					meta: {
						title: '左边导航'
					},
					component: (resolve) => require(['@/components/realse/showprojectInfo.vue'], resolve),
					children: [{
						path: '/quhomelist',
						meta: {
							title: '左边导航'
						},
						component: (resolve) => require(['@/views/realse/publishing.vue'], resolve),

					}]

				}]
			},
			{
				path: '/attentionselect',
				meta: {
					title: '选择三方认证'
				},
				component: (resolve) => require(['@/views/select/attentionselect.vue'], resolve)
			},
			{
				path: '/official',
				meta: {
					title: '项目方'
				},
				component: (resolve) => require(['@/views/select/official.vue'], resolve)
			},
			{
				path: '/media',
				meta: {
					title: '评测媒体'
				},
				component: (resolve) => require(['@/views/select/media.vue'], resolve)
			},
			{
				path: '/organization',
				meta: {
					title: '评测媒体'
				},
				component: (resolve) => require(['@/views/select/organization.vue'], resolve)
			},
			{
				path: '/examine',
				meta: {
					title: '评测媒体'
				},
				component: (resolve) => require(['@/views/select/examine.vue'], resolve)
			},
			{

				path: '/showproject',
				meta: {
					title: '左边导航'
				},
				component: (resolve) => require(['@/components/realse/showproject.vue'], resolve),
				children: [{
						path: '/showproject',
						meta: {
							title: '左边导航'
						},
						component: (resolve) => require(['@/components/realse/showprojectInfo.vue'], resolve),
						children: [{
								path: '/showproject',
								meta: {
									title: '发表完整评论'
								},
								component: (resolve) => require(['@/views/realse/publishing.vue'], resolve)
							},
							{
								path: '/publishing',
								meta: {
									title: '发表精评'
								},
								component: (resolve) => require(['@/views/realse/publishing.vue'], resolve)
							},
							{
								path: '/publish',
								meta: {
									title: '发表FIND评测'
								},
								component: (resolve) => require(['@/views/realse/publish.vue'], resolve)
							},
							{
								path: '/previewsuc',
								meta: {
									title: '发布成功'
								},
								component: (resolve) => require(['@/views/realse/previewsuc.vue'], resolve)
							},
						]
					},
					{
						path: "/discussion",
						meta: {
							title: '发布爆料',
						},
						component: (resolve) => require(['@/views/realse/discussion.vue'], resolve)
					},
					{
						path: "/addproject",
						meta: {
							title: '发布文章',
						},
						component: (resolve) => require(['@/views/realse/addproject.vue'], resolve)
					},

				]
			},

		]
	},

	//{
	//		    path: "/m_index",
	//		    meta: {
	//		      title: '发布讨论',
	//		    },
	//		    component: (resolve) => require(['@/components/mindex.vue'], resolve)
	// }
]