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

		$scope.updateAddress = function(cep) {
			UserService.getAddressByCep(cep).then(function(info) {
				$scope.user.address = info.data.logradouro;
				$scope.user.neighborhood = info.data.bairro;
				$scope.user.city = info.data.localidade;
				$scope.user.state = info.data.uf;
				console.log(info);
			}, function(error) {
				console.log(error);
			});
		};
	}
})();