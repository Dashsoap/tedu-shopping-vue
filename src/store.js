import Vuex from 'vuex';
import Vue from 'vue';
import Axios from 'axios';
import Cookie from 'js-cookie';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		me: null,
	},
	mutations: {
		setMe(state, me) {
			state.me = me;
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
	},
});

export default store;
