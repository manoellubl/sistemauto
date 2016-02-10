(function(){
	'use strict';
	
	var app = angular.module('app', [
		'ngMaterial',
		'angular-loading-bar',
		'blockUI'
	]);
	
	app.constant('ApiUrl', { url: 'http://sistemauto.herokuapp.com/api' });

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
	
	 app.run(function($rootScope, $mdToast) {
        $rootScope.$on('response:sucess:POST', function() {
			$mdToast.showSimple('Cadastrado com sucesso');
        });

        $rootScope.$on('response:error:POST', function() {
			$mdToast.showSimple('Falha no cadastro');
        });
		
		$rootScope.$on('response:sucess:PUT', function() {
			$mdToast.showSimple('Atualizado com sucesso');
        });

        $rootScope.$on('response:error:PUT', function() {
			$mdToast.showSimple('Falha na atualização');
		});
    });
	
	app.config(function($httpProvider) {
		$httpProvider.interceptors.push('Interceptor');
	})
})();