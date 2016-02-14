(function() {
    'use strict';

	/**
	 * Service de Interceptação de requisições http. Adiciona
	 * ao header o token de autenticação.
	 */
	angular.module('app').service('Interceptor', [
		'ApiUrl',
		'$q',
		'$rootScope',
		InterceptorService
	]);

	function InterceptorService(ApiUrl, $q, $rootScope) {
		
		/**
		 * Intercepta requisições
		 */
		this.request = function(config) {
			if (config.url.indexOf(ApiUrl.url) !== -1) { // apenas requisiçoes para o nosso server adiciona o token
				config.headers['x-access-token'] = window.localStorage.getItem('token-auth');
			}
			return config;
		};
		
		/**
		 * Intercepta response's de sucesso.
		 */
		this.response = function(response) {
			$rootScope.$broadcast('response:sucess:' + response.config.method);
			return response;
		};

		/**
		 * Intercepta response's de erro.
		 */
		this.responseError = function(response) {
			$rootScope.$broadcast('response:error:' + response.config.method);
			return $q.reject(response);
		};
	}
})();