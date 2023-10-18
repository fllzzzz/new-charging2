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
				path: 'inspect-data/:model',
				component: () => import('@/views/InspectData.vue'),
				props: true
			},
			{
				name: 'overview',
				path: 'overview',
				component: () => import('@/views/AppOverview.vue')
			},
			{
				name: 'monitor',
				path: 'monitor',
				component: () => import('@/views/AppMonitor.vue')
			},
			{
				name: 'inspect',
				path: 'inspect/:model',
				component: () => import('@/views/AppInspect.vue')
			},
			{
				name: 'immediate-controller',
				path: 'immediate-controller',
				component: () => import('@/views/AppImmediateController.vue')
			},
			{
				name: 'scene-controller',
				path: 'scene-controller',
				component: () => import('@/views/AppSceneController.vue')
			},
			{
				name: 'fusion-replay',
				path: 'fusion-replay',
				component: () => import('@/views/AppFusionReplay.vue')
			},
			{
				name: 'senseless-tracking',
				path: 'senseless-tracking',
				component: () => import('@/views/AppSenselessTracking.vue')
			},
		]
	}
]

export default routes;