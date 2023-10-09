import type {
	RouteRecordRaw
} from 'vue-router'

const routes :RouteRecordRaw[] = [
/* 	{
		name: 'tester',
		path: '/tester',
		children: [
			{
				name: 'view1',
				path: 'view1',
				component: () => import('@/views/tester/testerView1.vue'),
			}
		]
	}, */
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
			}
		]
	}
]

export default routes;