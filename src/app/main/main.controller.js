'use strict';

angular.module('eos')
  .controller('MainCtrl', ['$scope', '$rootScope', '$state', 'UserService', function($scope, $rootScope, $state, UserService) {
    $scope.signupBox = false;
    $scope.loginBox = false;
    $scope.productBox = false;
    $scope.trackingBox = false;
    $scope.settingsBox = false;
    $rootScope.noScroll = false;

    function hideOverlay() {
      $scope.signupBox = false;
      $scope.loginBox = false;
      $scope.productBox = false;
      $scope.trackingBox = false;
      $scope.settingsBox = false;
      $rootScope.noScroll = false;
      $state.go('home');
    }

    $scope.hideOverlay = function() {
      hideOverlay();
    };

    $scope.$on('signup:show', function(evt, args) {
      $scope.signupBox = true;
      $rootScope.noScroll = true;
    });
    $scope.$on('login:show', function(evt, args) {
      $scope.loginBox = true;
      $rootScope.noScroll = true;
    });
    $scope.$on('product:show', function(evt, args) {
      $scope.productBox = true;
      $rootScope.noScroll = true;
    });
    $scope.$on('tracking:show', function(evt, args) {
      $scope.trackingBox = true;
      $rootScope.noScroll = true;
    });
    $scope.$on('settings:show', function(evt, args) {
      $scope.settingsBox = true;
      $rootScope.noScroll = true;
    });
    $scope.$on('login:success', function(evt, args) {
      hideOverlay();
    });
    $scope.$on('signup:success', function(evt, args) {
      hideOverlay();
    });

    UserService.getAuth()
      .then(function(user) {
        $rootScope.$broadcast('login:success', {user: user});
      })
      .catch(function(err) {
        console.log(err);
      });
  }]);
