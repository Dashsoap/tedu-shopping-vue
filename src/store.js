import Vuex from 'vuex';
import Vue from 'vue';
import Axios from 'axios';
import Cookie from 'js-cookie';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		me: null,
		cart: {},
	},
	mutations: {
		setMe(state, me) {
			state.me = me;
		},
		/**
         * 设置购物车项
         * @param {Object} state 
         * @param {*} item 购物车项
         */
		setCarts(state, item) {
			state.cart[item._id] = item;
			state.cart = { ...state.cart };
		},
	},
	actions: {
		async login(context) {
			const { data } = await Axios.get('/api/me');
			context.commit('setMe', data);
		},
		logout(context) {
			Cookie.remove('token');
			context.commit('setMe', null);
		},
		async setCarts({ commit }, { good_id, count }) {
			const { data } = await Axios.post('/api/cart', {
				good_id,
				count,
			});
			const res = await Axios.get(`/api/goods/${good_id}`);
			commit('setCarts', {
				...data,
				good: res.data,
			});
		},
		async getCarts({ commit }) {
			const { data } = await Axios.get('/api/cart');
			data.forEach((item) => {
				Axios.get(`/api/goods/${item.good_id}`).then((res) => {
					commit('setCarts', {
						_id: item._id,
						count: item.count,
						good: res.data,
					});
				});
			});
		},
		async deleteCarts({ commit }, item) {
			await Axios.delete(`/api/cart/${item._id}`);
			item.count = 0;
			commit('setCarts', item);
		},
	},
});

export default store;
