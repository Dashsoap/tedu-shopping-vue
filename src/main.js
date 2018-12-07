import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faShoppingCart, faAddressCard, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import ElementUI from 'element-ui';
import './theme/index.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueProgressBar from 'vue-progressbar';

library.add(faSearch, faShoppingCart, faAddressCard, faTimesCircle);
Vue.config.productionTip = false;

const options = {
	color: '#EA6F5A',
	transition: {
		speed: '0.3s',
		opacity: '1s',
		termination: 400,
	},
	autoRevert: true,
	inverse: false,
};

Vue.use(VueProgressBar, options);
Vue.use(ElementUI);
Vue.component('fa-icon', FontAwesomeIcon);
new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
