(function(){
	'use strict';
	
	var app = angular.module('app', [
		'ngMaterial',
		'angular-loading-bar',
		'blockUI',
		'ngAnimate', 
		'ngCookies', 
		'ngTouch',
  		'ngSanitize', 
		'ui.router', 
		'ngMaterial'
	]);
	
	// localmente colocar http://localhost:8080/api
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
	
	app.config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider,
                    $mdIconProvider) {
    $stateProvider
		.state('login', {
			url: '/login',
			templateUrl: '../view/login.html',
			controller: 'LoginController',
			authRequired: false
		})
		.state('signup', {
			url: '/signup',
			templateUrl: '../view/signup.html',
			controller: 'SignupController',
			authRequired: false
		})
      .state('home', {
        url: '',
        templateUrl: '../view/main.html',
        controller: 'MainController',
        abstract: true
      })
      .state('home.dashboard', {
        url: '/dashboard',
        templateUrl: '../view/dashboard.html',
        data: {
          title: 'Dashboard'
        },
		authRequired: true
      })
      .state('home.profile', {
        url: '/profile',
        templateUrl: '../view/profile.html',
        controller: 'ProfileController',
        controllerAs: 'vm',
        data: {
          title: 'Profile'
        },
		authRequired: true
      });

    $urlRouterProvider.otherwise('/dashboard');

    $mdThemingProvider
      .theme('default')
        .primaryPalette('grey', {
          'default': '600'
        })
        .accentPalette('teal', {
          'default': '500'
        })
        .warnPalette('defaultPrimary');

    $mdThemingProvider.theme('dark', 'default')
      .primaryPalette('defaultPrimary')
      .dark();

    $mdThemingProvider.theme('grey', 'default')
      .primaryPalette('grey');

    $mdThemingProvider.theme('custom', 'default')
      .primaryPalette('defaultPrimary', {
        'hue-1': '50'
    });

    $mdThemingProvider.definePalette('defaultPrimary', {
      '50':  '#FFFFFF',
      '100': 'rgb(255, 198, 197)',
      '200': '#E75753',
      '300': '#E75753',
      '400': '#E75753',
      '500': '#E75753',
      '600': '#E75753',
      '700': '#E75753',
      '800': '#E75753',
      '900': '#E75753',
      'A100': '#E75753',
      'A200': '#E75753',
      'A400': '#E75753',
      'A700': '#E75753'
    });

    $mdIconProvider.icon('user', '../asset/images/user.svg', 64);
  });
})();