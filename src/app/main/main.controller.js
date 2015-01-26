'use strict';

angular.module('eos')
  .controller('MainCtrl', ['$scope', '$rootScope', 'ProductsService', function($scope, $rootScope, ProductsService) {
    $scope.signupBox = false;
    $scope.loginBox = false;
    $rootScope.noScroll = false;

    function hideOverlay() {
      $scope.signupBox = false;
      $scope.loginBox = false;
      $rootScope.noScroll = false;
    }

    $scope.hideOverlay = function() {
      hideOverlay();
    }

    $scope.$on('signup:show', function(evt, args) {
      $scope.signupBox = true;
      $rootScope.noScroll = true;
    });
    $scope.$on('login:show', function(evt, args) {
      $scope.loginBox = true;
      $rootScope.noScroll = true;
    });
    $scope.$on('signup:success', function(evt, args) {
      hideOverlay();
    });
  }]);
