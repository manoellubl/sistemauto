(function(){
	'use strict';
	
	var app = angular.module('app', [
		'ngMaterial',
		'blockUI'
	]);

	app.config(function(blockUIConfig) {
		blockUIConfig.delay = 100;
	});
})();