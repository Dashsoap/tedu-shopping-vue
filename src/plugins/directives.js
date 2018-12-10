import Vue from 'vue';

Vue.directive('response', {
	inserted: (el, { arg }) => {
		let finalRate = arg || 16 / 9;
		el.style.height = `${Math.round(el.clientWidth / finalRate)}px`;
	},
});
