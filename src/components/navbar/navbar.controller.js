'use strict';

angular.module('eos')
  .controller('NavbarCtrl', ['$scope', '$rootScope', 'UserService', function ($scope, $rootScope, UserService) {
    $scope.user = null;
    $scope.userId = null;
    $scope.admin = null;
    $scope.trackingSubMenuMobile = false;
    $scope.profileSubMenuMobile = false;

    $scope.showTrackingSubMenuMobile = function() {
      $scope.trackingSubMenuMobile = !$scope.trackingSubMenuMobile;
    };
    $scope.showProfileSubMenuMobile = function() {
      $scope.profileSubMenuMobile = !$scope.profileSubMenuMobile;
    };
    $scope.showTracking = function(mobile) {
      if (mobile) {
        $scope.trackingSubMenuMobile = false;
        $scope.profileSubMenuMobile = false;
      }
      $rootScope.$broadcast('tracking:show');
    };
    $scope.showSettings = function(mobile) {
      if (mobile) {
        $scope.trackingSubMenuMobile = false;
        $scope.profileSubMenuMobile = false;
      }
      $rootScope.$broadcast('settings:show');
    };
    $scope.showSignup = function(mobile) {
      if (mobile) {
        $scope.trackingSubMenuMobile = false;
        $scope.profileSubMenuMobile = false;
      }
      $rootScope.$broadcast('signup:show');
    };
    $scope.showLogin = function(mobile) {
      if (mobile) {
        $scope.trackingSubMenuMobile = false;
        $scope.profileSubMenuMobile = false;
      }
      $rootScope.$broadcast('login:show');
    };
    $scope.showAdmin = function(mobile) {
      if (mobile) {
        $scope.trackingSubMenuMobile = false;
        $scope.profileSubMenuMobile = false;
      }
      $rootScope.$broadcast('admin:show');
    };
    $scope.logout = function(mobile) {
      if (mobile) {
        $scope.trackingSubMenuMobile = false;
        $scope.profileSubMenuMobile = false;
      }
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
      $scope.admin = args.user.val().admin;
    });
    $scope.$on('signup:success', function(evt, args) {
      $scope.user = args.user.val();
      $scope.userId = args.user.key();
    });
    $scope.$on('logout:success', function(evt, args) {
      $scope.user = null;
      $scope.userId = null;
      $scope.admin = null;
    });
  }]);
