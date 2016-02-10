(function() {

	'use strict';

	/**
	 * Controller responsável pela view do perfil do usuário.
	 */
	angular.module('app').controller('ProfileController', [
		'$scope',
		'UserService',
		ProfileController
	]);

	function ProfileController($scope, UserService) {
		
		/**
		 * Requisita os dados do usuário.
		 */
		UserService.get().then(function(info) {
			$scope.user = info.data;
		}, function(error) {
			
		});
		
		/**
		 * Atualiza os dados do usuário.
		 */
		$scope.update = function() {
			UserService.update($scope.user).then(function(info) {
				
			}, function(error) {
				
			});
		};
	}
})();