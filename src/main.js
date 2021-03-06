import Vue from 'vue';

import './plugins/axios';
import './plugins/element-ui';
import './plugins/fontAwesome';
import './plugins/vueProgress';
import './plugins/directives';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
