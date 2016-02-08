(function() {
	'use strict';
	
	angular.module('app').service('UserService', [
		'$http', 
		UserService
	]);
	
	function UserService($http) {
		
		this.postUser = function(user) {
			return $http.post('http://localhost:8080/api/user', user);	
		};
	}
})();