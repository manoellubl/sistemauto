(function() {
    'use strict';

	angular.module('app').service('Interceptor',[
		'ApiUrl',
		'$q',
		'$rootScope',
		InterceptorService
	]);

	function InterceptorService(ApiUrl, $q, $rootScope) {
		this.request = function(config) {
			console.log(">>>>>>>>>>>>>>>>>>>>>>");
			console.log('request', config.url);
			if (config.url.indexOf("/api") !== -1 || config.url.indexOf("localhost") !== -1) { // apenas requisiçoes para o nosso server adiciona o token
				config.headers['x-access-token'] = window.localStorage.getItem('token-auth');
			}
			return config;
		};
	}
})();