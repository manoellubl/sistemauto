(function() {
	'use strict';

	/**
	 * Controller principal do sistema. As demais view's
	 * são filhas da view a qual este controller é responsável.
	 */
	angular.module('app').controller('MainController', [
		'$scope',
		'$state',
		'NavService', 
		'UserService',
		'MensagemService',
		'$translate',
		MainController
	]);

	function MainController($scope, $state, NavService, UserService, MensagemService, $translate) {

		// itens do menu
		$scope.menuItems = [];

		/**
		 * Realiza o logout do sistema.
		 */
		$scope.logout = function() {
			UserService.logout().then(function(info) {
				UserService.clear();
				$state.go('login');
			}, function(error) {
				UserService.clear();
			});
		};

		$scope.setLanguage = function(language) {
			$translate.use(language);
		};

		// obtém do service os itens do menu
		NavService.loadAllItems().then(function(menuItems) {
			$scope.menuItems = [].concat(menuItems);
		});
	}
})();