import routes from './routes';

import {
	createRouter,
	createWebHashHistory
} from 'vue-router'

export default createRouter({
	history: createWebHashHistory(),
	routes
});