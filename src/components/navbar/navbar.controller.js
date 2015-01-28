'use strict';

angular.module('eos')
  .controller('NavbarCtrl', ['$scope', '$rootScope', 'UserService', function ($scope, $rootScope, UserService) {
    $scope.user = null;
    $scope.userId = null;

    $scope.showTracking = function() {
      $rootScope.$broadcast('tracking:show');
    };
    $scope.showSettings = function() {
      $rootScope.$broadcast('settings:show');
    };
    $scope.showSignup = function() {
      $rootScope.$broadcast('signup:show');
    };
    $scope.showLogin = function() {
      $rootScope.$broadcast('login:show');
    };
    $scope.logout = function() {
      UserService.userLogout()
        .then(function(rsp) {
          console.log('Logged out successfully');
          $rootScope.$broadcast('logout:success');
        })
        .catch(function(err) {
          console.log('Error logging out');
        });
    };

    $scope.$on('login:success', function(evt, args) {
      $scope.user = args.user.val();
      $scope.userId = args.user.key();
    });
    $scope.$on('signup:success', function(evt, args) {
      $scope.user = args.user.val();
      $scope.userId = args.user.key();
    });
    $scope.$on('logout:success', function(evt, args) {
      $scope.user = null;
      $scope.userId = null;
    });
  }]);
