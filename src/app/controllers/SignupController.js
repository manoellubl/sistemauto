(function() {
	'use strict';
	
  	angular.module('app').controller('SignupController', [
		'$scope',
		'$state',
		'UserService',
		SignupController
	]);
	
	function SignupController($scope, $state, UserService) {
		var self = this;
		
		$scope.user = {};
		
		$scope.register = function() {
			UserService.postUser($scope.user).then(function(info) {
				$state.go('login');
			}, function(error) {
				console.log('error', error);
			});
		};
	}
})();