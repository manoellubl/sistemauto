(function() {
	'use strict';
	
	/**
	 * Controller
	 */
	angular.module('app').controller('MensagemController', [
		'$scope',
		//'$mdToast',
		MensagemController
	]);
	
	function MensagemController($scope) {
		$scope.msg = function() {
    		var pinTo = "top right";
    		console.log(pinTo)
    	//	$mdToast.show(
      		//	$mdToast.simple()
        	//	.textContent('Simple Toast!')
        	//	.position(pinTo)
        	//	.hideDelay(3000)
    	//	);
    	};
  	}
})