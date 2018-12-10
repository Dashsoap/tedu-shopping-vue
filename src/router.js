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
				roles: [
					'NORMAL',
				],
			},
		},
		{
			path: '/admin',
			name: 'admin',
			component: () => import('./pages/Admin/Admin.vue'),
			redirect: '/admin/user',
			meta: {
				roles: [
					'ADMIN',
				],
			},
			children: [
				{
					path: '/admin/user',
					name: 'admin-user',
					component: () => import('./pages/Admin/User/User.vue'),
					meta: {
						roles: [
							'ADMIN',
						],
					},
				},
				{
					path: '/admin/goods',
					name: 'admin-goods',
					component: () => import('./pages/Admin/Goods/Goods.vue'),
					meta: {
						roles: [
							'ADMIN',
						],
					},
				},
			],
		},
		{
			path: '*',
			name: '404',
			component: () => import('./pages/404.vue'),
		},
	],
});

export default router;
