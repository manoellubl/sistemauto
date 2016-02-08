(function() {
	'use strict';
	
  	angular.module('app').controller('LoginController', [
		'$scope',
		'$state',
		LoginController
	]);
	
	function LoginController($scope, $state) {
		var self = this;
		
		$scope.login = function() {
			
		};
		
		$scope.register = function() {
			$state.go('signup');
		};
	}
})();