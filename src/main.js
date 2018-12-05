import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueRouter from 'vue-router';
import {
  library
} from '@fortawesome/fontawesome-svg-core';
import {
  faSearch,
  faShoppingCart
} from '@fortawesome/free-solid-svg-icons'
import ElementUI from 'element-ui'
import './theme/index.css'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

library.add(faSearch,faShoppingCart);
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter);
Vue.component('fa-icon', FontAwesomeIcon);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')