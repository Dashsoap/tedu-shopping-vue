// vue.config.js
module.exports = {
	// 选项...
	devServer: {
		proxy: {
			'/api': {
				target: 'http://tedu.sxyori.com',
				ws: true,
				changeOrigin: true,
			},
		},
	},
};
