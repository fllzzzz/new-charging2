import {
	useCompStateWatcher
} from '@/hooks/compController';

import {
	useSaveRouter,
	use3DInit
} from '@/hooks/routerManager';

import routes from './routes';

import {
	createRouter,
	createWebHashHistory
} from 'vue-router'

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

router.beforeEach((to, from) => {
	useSaveRouter(from ,to);
	useCompStateWatcher(to);
	use3DInit(from, to);
})

export default router;