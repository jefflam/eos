'use strict';

angular.module('eos', ['ngAnimate', 'ngResource', 'ui.router', 'firebase'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('product', {
        url: '/product/:id',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('tracking', {
        url: '/tracking/:id',
        templateUrl: 'app/main/main.html',
        controller: 'TrackingCtrl'
      });
      // .state('admin', {
      //   url: '/admin',
      //   templateUrl: 'app/admin/admin.html',
      //   controller: 'AdminCtrl'
      // });

    $urlRouterProvider.deferIntercept();
    $urlRouterProvider.otherwise('/');
  })
  .run(['$rootScope', '$location', '$state', function($rootScope, $location, $state) {
    $rootScope.$on('$locationChangeSuccess', function(e, newUrl, oldUrl) {
      var itemId;

      if ($location.path().match('product')) {
        itemId = $location.path().split('/')[2];
      }

      if (
        ($location.path() === '' || $location.path() === '/' || $location.path() === '/#')
        && (newUrl === $location.absUrl())
        && (oldUrl === $location.absUrl())
        && (oldUrl === newUrl)
      ) {
        $state.go('home');
      } else if ($location.path().match('product') && newUrl === $location.absUrl() && oldUrl === $location.absUrl() && oldUrl === newUrl) {
        $state.go('product', {id: itemId});
      }
    });
  }])
  .constant('FIREBASE_URL', 'https://eossg-staging.firebaseio.com/');
