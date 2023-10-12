import type {
	RouteRecordRaw
} from 'vue-router'

const routes :RouteRecordRaw[] = [
	{
		name: 'tester',
		path: '/tester',
		children: [
			{
				name: 'view1',
				path: 'view1',
				component: () => import('@/views/TesterView1.vue'),
			}
		]
	},
	{
		name: 'index',
		path: '/',
		redirect: '/map',
		component: () => import('@/views/AppIndex.vue'),
		children: [
			{
				name: 'map',
				path: 'map',
				component: () => import('@/views/AppMap.vue')
			},
			{
				name: 'inspect-data',
				path: '/inspect-data/:model',
				component: () => import('@/views/InspectData.vue'),
				props: true
			},
			{
				name: 'overview',
				path: 'overview',
				component: () => import('@/views/AppOverview.vue')
			},
		]
	}
]

export default routes;