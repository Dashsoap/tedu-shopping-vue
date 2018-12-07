import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faShoppingCart, faAddressCard, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faSearch, faShoppingCart, faAddressCard, faTimesCircle);
Vue.component('fa-icon', FontAwesomeIcon);
