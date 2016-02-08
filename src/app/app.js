(function(){
	'use strict';
	
	var app = angular.module('app', [
		'ngMaterial',
		'blockUI'
	]);

	app.config(function(blockUIConfig) {
		blockUIConfig.delay = 100;
	});
	// criar Jenkins na Openshift
	// usar o HEROKU mesmo :D
	// ApiEndPoint usando NODE_ENV para determinar se aponta para o remoto
})();