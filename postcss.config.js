const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
	plugins: {
		'postcss-px-to-viewport': {
			viewportWidth: 1920,
			unitPrecision: 5,
			unitToConvert: 'px',
			viewportUnit: 'vw',
			fontViewportUnit: 'vw',
			minPixelValue: 0.1,
			selectorBlackList: [
				'.el-badge__content.is-fixed',
				'.el-table__cell',
				'.inspect-table-container'
			],
			propList: ['*'],
		}
	}
});