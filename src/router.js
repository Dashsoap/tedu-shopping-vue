import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from './pages/Index/Index';

Vue.use(VueRouter);

const router = new VueRouter({
	routes: [
		{
			path: '/',
			name: 'index',
			component: Index,
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('./pages/Login/Login.vue'),
		},
		{
			path: '/register',
            name: 'register',
			component: () => import('./pages/Register/Register.vue'),
		},
		{
			path: '/address',
			name: 'address',
			component: () => import('./pages/Address/Address.vue'),
			meta: {
				auth: true,
			},
		},
		{
			path: '*',
			name: '404',
			component: () => import('./pages/404.vue'),
		},
	],
});

export default router;
