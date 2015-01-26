'use strict';

angular.module('eos', ['ngAnimate', 'ngResource', 'ui.router', 'firebase'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
      // .state('product', {
      //   url: '/',
      //   templateUrl: 'app/main/main.html',
      //   controller: 'MainCtrl'
      // });

    $urlRouterProvider.otherwise('/');
  })
  .constant('FIREBASE_URL', 'https://eossg-staging.firebaseio.com/');
