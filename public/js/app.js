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
    'ngMask',
		'ui.router', 
		'ngMaterial',
        'pascalprecht.translate'
	]);
	
	// localmente colocar http://localhost:8080/api
  // para o http://sistemauto.herokuapp.com/api
  //app.constant('ApiUrl', { url: 'http://localhost:8080/api' });
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
	});

    app.config(function($translateProvider) {
        $translateProvider.translations('en', {
            LOGIN_EMAIL: 'Email',
            LOGIN_PASSWORD: 'Password',
            LOGIN_ENTER: 'Login',
            LOGIN_REGISTER: 'Register',
            SIGNUP_NAME: 'Name',
            SIGNUP_EMAIL: 'Email',
            SIGNUP_PASSWORD: 'Password',
            SIGNUP_CNPJ: 'CNPJ',
            SIGNUP_REGISTER: 'Register',
            SIGNUP_COMPANYNAME: 'Company Name',
            PROFILE_COMPANY: 'Company Name',
            PROFILE_NAME: 'Manager',
            PROFILE_EMAIL: 'Email',
            PROFILE_CNPJ: 'CNPJ',
            PROFILE_ADDRESS: 'Address',
            PROFILE_NEIGHBORHOOD: 'Neighborhood',
            PROFILE_CITY: 'City',
            PROFILE_STATE: 'State',
            PROFILE_CEP: 'Postal Code',
            PROFILE_ABOUT: 'About us',
            PROFILE_SAVE: 'Save',
            PROFILE_CANCEL: 'Cancel',
            STUDENT_ADDRESS: 'Address',
            STUDENT_CPF: 'CPF',
            STUDENT_BIRTHDATE: 'Birth Date',
            STUDENT_RG: 'RG',
            STUDENT_NEIGHBORHOOD: 'Neighborhood',
            STUDENT_CITY: 'City',
            STUDENT_STATE: 'State',
            STUDENT_CEP: 'Postal Code',
            STUDENT_EMAIL: 'Email',
            STUDENT_DRIVER_LICENSE_CLASS: 'Driver license class',
            STUDENT_SITUATION: 'Situation',
            STUDENT_VALUE: 'Value',
            STUDENT_CANCEL: 'Cancel',
            STUDENT_SAVE: 'Save',
            MENU_DASHBOARD: 'Dashboard',
            MENU_PROFILE: 'Profile',
            MENU_STUDENTS: 'Students',
            MENU_INSTRUCTORS: 'Instructors'
        });
        $translateProvider.translations('pt-br', {
            LOGIN_EMAIL: 'Email',
            LOGIN_PASSWORD: 'Senha',
            LOGIN_ENTER: 'Entrar',
            LOGIN_REGISTER: 'Registrar',
            SIGNUP_NAME: 'Nome',
            SIGNUP_EMAIL: 'Email',
            SIGNUP_PASSWORD: 'Senha',
            SIGNUP_CNPJ: 'CNPJ',
            SIGNUP_REGISTER: 'Registrar',
            SIGNUP_COMPANYNAME: 'Empresa',
            PROFILE_COMPANY: 'Empresa',
            PROFILE_NAME: 'Admin',
            PROFILE_EMAIL: 'Email',
            PROFILE_CNPJ: 'CNPJ',
            PROFILE_ADDRESS: 'Endereço',
            PROFILE_NEIGHBORHOOD: 'Bairro',
            PROFILE_CITY: 'Cidade',
            PROFILE_STATE: 'Estado',
            PROFILE_CEP: 'CEP',
            PROFILE_ABOUT: 'Sobre',
            PROFILE_SAVE: 'Salvar',
            PROFILE_CANCEL: 'Cancelar',
            STUDENT_ADDRESS: 'Endereço',
            STUDENT_CPF: 'CPF',
            STUDENT_BIRTHDATE: 'Data de Nascimento',
            STUDENT_RG: 'RG',
            STUDENT_NEIGHBORHOOD: 'Bairro',
            STUDENT_CEP: 'CEP',
            STUDENT_CITY: 'Cidade',
            STUDENT_STATE: 'Estado',
            STUDENT_EMAIL: 'Email',
            STUDENT_DRIVER_LICENSE_CLASS: 'Tipo de habilitação',
            STUDENT_SITUATION: 'Situação',
            STUDENT_VALUE: 'Valor',
            STUDENT_CANCEL: 'Cancelar',
            STUDENT_SAVE: 'Salvar',
            MENU_DASHBOARD: 'Painel',
            MENU_PROFILE: 'Perfil',
            MENU_STUDENTS: 'Alunos',
            MENU_INSTRUCTORS: 'Instrutores'
        });
        $translateProvider.preferredLanguage('pt-br');
    });
	
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
          })
          .state('home.student', {
              url: '/student',
              templateUrl: '../view/students.html',
              controller: 'StudentController',
              controllerAs: 'vm',
              data: {
                  title: 'Student'
              },
              authRequired: true
          })

          .state('home.instructor', {
             url: '/instructor',
              templateUrl: '../view/instructor.html',
               controller: 'InstructorController',
               controllerAs: 'vm',
               data: {
                   title: 'Instructor'
               },
               authRequired: true
            });

        $urlRouterProvider.otherwise('/dashboard');

        $mdThemingProvider
          .theme('default')
            .primaryPalette('teal', {
              'default': '800'
            })
            .accentPalette('amber', {
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
