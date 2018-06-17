module.exports = {
	maximumFileSizeToCacheInBytes: 10485760,
	staticFileGlobs: [
		"assets/fonts/**/*.*",
		"assets/scripts/**/*.*",
		"assets/styles/**/*.*",
		"favicon.ico"
	],
	runtimeCaching: [{
		urlPattern: /^https:\/\/raw.githubusercontent.com\/gdgphilippines\/main-files\/master/,
		handler: 'cacheFirst'
	}]
};