(function() {
	'use strict';
	
	/**
	 * Service responsável pela lógica com dados do usuário
	 */
	angular.module('app').service('UserService', [
		'$http', 
		'$q',
		'ApiUrl',
		UserService
	]);
	
	function UserService($http, $q, ApiUrl) {
		
		/**
		 * Realiza a requisição http para autenticar no sistema.
		 * @param {Object} com email e senha para autenticar
		 */
		this.login = function(data) {
			var deferred = $q.defer();
			
			$http.post(ApiUrl + '/authenticate/login', data).then(function(info) {
				setToken(info.data.token);
				setId(info.data.id);
				deferred.resolve({});
			}, function(error) {
				deferred.reject(error);
			});
			
			return deferred.promise;
		};
		
		/**
		 * Armazena o token do usuário
		 * @param {String} chave única para autenticação.
		 */
		function setToken(token) {
			window.localStorage.setItem('token-auth', token);
		}
		
		/**
		 * Armazena o id do usuário logado.
		 * @param {String} identificador do usuário logado.
		 */
		function setId(id) {
			window.localStorage.setItem('user-id', id);
		}
		
		/**
		 * Realiza o cadastro de um usuário no sistema.
		 */
		this.postUser = function(user) {
			return $http.post(ApiUrl + '/user', user);	
		};
		
		/**
		 * Determina se o usuário está autenticado.
		 */
		this.isAuthenticated = function() {
			return window.localStorage.getItem('token-auth') !== null;	
		};
	}
})();