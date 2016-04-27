(function() {
	'use strict';
	
	/**
	 * Controller responsável pela view de login no sistema.
	 */
  	angular.module('app').controller('LoginController', [
		'$scope',
		'$state',
		'UserService',
		'MensagemService',
		LoginController
	]);
	
	function LoginController($scope, $state, UserService, MensagemService) {
		
		// usuário do form de login
		$scope.user = {};
		
		/**
		 * Realiza o login do usuário no sistema
		 */
		$scope.login = function() {
			UserService.login($scope.user).then(function(info) {
				$state.go('home.profile');
			}, function(error) {
				if (error.data.message != undefined) {
                    MensagemService.msg(error.data.message);
                }
			});
		};
		
		/**
		 * Redireciona para a tela de cadastro de usuário
		 */
		$scope.register = function() {
			$state.go('signup');
		};
	}
})();