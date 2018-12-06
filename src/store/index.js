import Vuex from 'vuex';
import Vue from 'vue';
import Axios from 'axios';

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
			try {
				const { data } = await Axios.get('/api/me');
				context.commit('setMe', data);
			} catch ({ response }) {}
		},
	},
});

/** 注入Vue实例 */
Vue.prototype.$store = store;

export default store;
