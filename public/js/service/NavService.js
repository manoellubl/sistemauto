(function() {
	'use strict';

	/**
	 * Service encapsulando os itens da Navbar do sistema.
	 */
	angular.module('app').service('NavService', [
		'$q',
		NavService
	]);

	function NavService($q) {
		var menuItems = [{
				name: 'MENU_DASHBOARD',
				icon: 'dashboard',
				sref: '.dashboard'
			}, {
				name: 'MENU_PROFILE',
				icon: 'person',
				sref: '.profile'
			}, {
				name: 'MENU_STUDENTS',
				icon: 'account_box',
				sref: '.student'
			}, {
				name: 'MENU_INSTRUCTORS',
				icon: 'perm_identity',
				sref: '.instructor'
			}		
			];
	
		this.loadAllItems = function() {
			return $q.when(menuItems);
		};
  	}
})();