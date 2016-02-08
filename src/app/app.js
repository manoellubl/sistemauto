(function(){
	'use strict';
	
	var app = angular.module('app', [
		'ngMaterial',
		'angular-loading-bar',
		'blockUI'
	]);
	
	app.constant('ApiUrl', { url: 'http://localhost:8080/api' });

	app.config(function(blockUIConfig) {
		blockUIConfig.delay = 100;
	});

    app.run(function(cfpLoadingBar) {
        cfpLoadingBar.start();
    });
	
	app.run(function($rootScope, $state, UserService) {
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
            var isAuthRequired = toState.authRequired
         
            if (isAuthRequired && !UserService.isAuthenticated()) {
                $state.transitionTo('login');
                event.preventDefault();
            }
			// se estiver e tentar ir para login ou signup mandar para home
        });
	});
})();