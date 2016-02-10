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
			if (config.url.indexOf(ApiUrl.url) !== -1) { // apenas requisiçoes para o nosso server adiciona o token
				config.headers['x-access-token'] = window.localStorage.getItem('token-auth');
			}
			return config;
		};
	}
})();