(function() {
	'use strict';
	
	/**
	 * Controller responsável pela view de login no sistema.
	 */
  	angular.module('app').controller('LoginController', [
		'$scope',
		'$state',
		'UserService',
		LoginController
	]);
	
	function LoginController($scope, $state, UserService) {
		
		// usuário do form de login
		$scope.user = {};
		
		/**
		 * Realiza o login do usuário no sistema
		 */
		$scope.login = function() {
			UserService.login($scope.user).then(function(info) {
				$state.go('home.profile');
			}, function(error) {
				// TODO modal de erro
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