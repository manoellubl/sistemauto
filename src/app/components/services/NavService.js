(function() {
	'use strict';

	/**
	 * Service encapsulando os itens da Navbar do sistema.
	 */
	angular.module('app').service('NavService', [
		'$q',
		NavService
	]);

	function NavService($q){
		var menuItems = [{
				name: 'Dashboard',
				icon: 'dashboard',
				sref: '.dashboard'
			}, {
				name: 'Profile',
				icon: 'person',
				sref: '.profile'
			}
		];
	
		this.loadAllItems = function() {
			return $q.when(menuItems);
		};
  	}
})();