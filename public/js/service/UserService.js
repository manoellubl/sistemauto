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
		
		var self = this;
		
		this.user = undefined;
		
		/**
		 * Realiza a requisição http para autenticar no sistema.
		 * @param {Object} com email e senha para autenticar
		 * 
		 * @return {Promise} promessa da requisição.
		 */
		this.login = function(data) {
			var deferred = $q.defer();
			
			$http.post(ApiUrl.url + '/authenticate/login', data).then(function(info) {
				setToken(info.data.token);
				setId(info.data.id);
				deferred.resolve({});
			}, function(error) {
				deferred.reject(error);
			});
			
			return deferred.promise;
		};
		
		/**
		 * Realiza a requisição http para realizar logout no sistema.
		 * 
		 * @return {Promise} promessa da requisição.
		 */
		this.logout = function() {
			var deferred = $q.defer();
			
			$http.post(ApiUrl.url + '/authenticate/logout').then(function(info) {
				setToken(null);
				deferred.resolve(info);
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
		 * Obtém o id do usuário logado.
		 * 
		 * @return {String} identificador do usuário logado.
		 */
		function getId() {
			return window.localStorage.getItem('user-id');
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
			return $http.post(ApiUrl.url + '/user', user);	
		};
		
		/**
		 * Determina se o usuário está autenticado.
		 */
		this.isAuthenticated = function() {
			return window.localStorage.getItem('token-auth') !== null;	
		};
		
		/**
		 * Obtém o usuário logado.
		 * 
		 * @return {promise} da requisição do servidor logado.
		 */
		this.get = function() {
			var deferred = $q.defer();
			if (self.user !== undefined) {
				deferred.resolve({
					data: self.user
				});
			} else {
				$http.get(ApiUrl.url + '/user/' + getId()).then(function(info) {
					self.user = info.data;
					deferred.resolve(info);
				}, function(error) {
					deferred.reject(error);
				});
			}
			return deferred.promise;
		};
		
		/**
		 * Atualiza os dados do usuário logado.
		 * 
		 * @param {Object} objeto encapsulando os dados do usuário.
		 * 
		 * @return {promise} promessa da requisição.
		 */
		this.update = function(data) {
			var deferred = $q.defer();
			
			$http.put(ApiUrl.url + '/user/' + getId(), data).then(function(info) {
				self.user = info.data;
				deferred.resolve(info);
			}, function(error) {
				deferred.reject(error);
			});
			
			return deferred.promise;
		};

		/**
		 * Limpa todos os dados do usuário logado
		 */
		this.clear = function() {
			window.localStorage.removeItem('token-auth');
			window.localStorage.removeItem('user-id');
			window.location.reload();
		};
	}
})();