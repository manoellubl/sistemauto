(function() {

	'use strict';

	/**
	 * Controller responsável pela view do perfil do usuário.
	 */
	angular.module('app').controller('ProfileController', [
		'$scope',
		'UserService',
		'MensagemService',
		ProfileController
	]);

	function ProfileController($scope, UserService, MensagemService) {
		
		/**
		 * Requisita os dados do usuário.
		 */
		UserService.get().then(function(info) {
			$scope.user = info.data;
		}, function(error) {
			if(error.data.message != undefined) {
                MensagemService.msg(error.data.message);
            }
		});
		
		/**
		 * Atualiza os dados do usuário.
		 */
		$scope.update = function() {
			UserService.update($scope.user).then(function(info) {
				MensagemService.msg("Salvo com sucesso");
			}, function(error) {
				if(error.data.message != undefined) {
                    MensagemService.msg(error.data.message);
                }
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
				if(error.data.message != undefined) {
                    MensagemService.msg(error.data.message);
                }
			});
		};
	}
})();