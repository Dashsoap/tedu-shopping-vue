import Vue from 'vue';

import VueProgressBar from 'vue-progressbar';

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
