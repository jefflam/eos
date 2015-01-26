'use strict';

angular.module('eos')
  .controller('NavbarCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.showSignup = function() {
      $rootScope.$broadcast('signup:show');
    }
    $scope.showLogin = function() {
      $rootScope.$broadcast('login:show');
    }
  }]);
