var app = angular.module('App', ['ui.router', 'ngResource', 'ngMaterial', 'ui.bootstrap', 'ngStorage']);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider

        .state('home', {
            url: '/',
            templateUrl: '/app/home/views/home.index.html',
            controller: 'homeController'
        })

        .state('acts', {
            url: '/acts',
            templateUrl: '/app/home/views/home.index.html',
            controller: 'homeController'
        })

        .state('login', {
            url: '/login',
            templateUrl: '/app/login/views/login.html',
            controller: 'LoginController'
        })

        .state('users', {
            url: '/users',
            templateUrl : '/app/users/views/users.index.html',
            controller: 'userIndexController'
        })

        .state('usercreate', {
            url: '/users/create',
            templateUrl : '/app/users/views/users.create.html',
            controller: 'userCreateController'
        })

        .state('actcreate', {
            url: '/act/create',
            templateUrl : '/app/act/views/act.create.html',
            controller: 'actCreateController'
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});


app.run(function($rootScope, $location, $state, $localStorage) {

    $rootScope.$on( '$stateChangeStart', function(e, toState  , toParams, fromState, fromParams) {

        if(!$localStorage.login && toState.name !== 'login'){
            e.preventDefault();
            $state.go('login');
        }else{
            $rootScope.LOGGED_USER = $localStorage.login;
            return;
        }
    });
});