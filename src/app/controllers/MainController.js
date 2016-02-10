(function() {
	'use strict';

	/**
	 * Controller principal do sistema. As demais view's
	 * são filhas da view a qual este controller é responsável.
	 */
	angular.module('app').controller('MainController', [
		'navService', 
		'$scope', 
		'UserService',
		MainController
	]);

	function MainController(navService, $scope, UserService) {
		
		// itens do menu
		$scope.menuItems = [];

		/**
		 * Realiza o logout do sistema.
		 */
		$scope.logout = function() {
			UserService.logout().then(function(info) {
				$state.go('login');
			}, function(error) {

			});
		};

		// obtém do service os itens do menu
		navService.loadAllItems().then(function(menuItems) {
			$scope.menuItems = [].concat(menuItems);
		});
	}
})();