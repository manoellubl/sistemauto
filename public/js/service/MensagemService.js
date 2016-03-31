(function() {
	'use strict';
	
	/**
	 * Controller
	 */
	angular.module('app').service('MensagemService', [
		//'$scope',
		//'$mdToast',
		MensagemService
	]);
	
	function MensagemService() {
		var self = this;

		this.msg = function() {
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