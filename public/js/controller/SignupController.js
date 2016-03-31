(function() {
	'use strict';
	
	/**
	 * Controller responsável pela view de signup.
	 */
  	angular.module('app').controller('SignupController', [
		'$scope',
		'$state',
		'UserService',
		'MensagemService',
		SignupController
	]);
	
	function SignupController($scope, $state, UserService, MensagemService) {
		
		// usuário que está se cadastrando.
		$scope.user = {};
		
		/**
		 * Cadastra o usuário no sistema.
		 */
		$scope.register = function() {
			UserService.postUser($scope.user).then(function(info) {
				$state.go('login');
			}, function(error) {
				MensagemService.msg(error.data.message);
			});
		};
	}
})();