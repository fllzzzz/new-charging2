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
				name: 'inspect-history',
				path: '/inspect-history',
				component: () => import('@/views/InspectHistory.vue')
			},
		]
	}
]

export default routes;