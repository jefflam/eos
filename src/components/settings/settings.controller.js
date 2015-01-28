'use strict';

angular.module('eos')
  .controller('SettingsCtrl', ['$scope', '$rootScope', 'UserService', function($scope, $rootScope, UserService) {
    $scope.user = null;
    $scope.userId = null;
    $scope.error = '';

    $scope.saveChanges = function() {
      var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      var data = {
        name: $scope.user.name,
        email: $scope.user.email,
        address1: $scope.user.address1,
        address2: $scope.user.address2,
        address3: $scope.user.address3,
        country: $scope.user.country
      };

      if ($scope.user.name === '') {
          $scope.error = 'Please enter your name.';
          return;
      }
      if ($scope.user.email === '') {
          $scope.error = 'Please enter your email.';
          return;
      }
      if (!emailRegex.test($scope.user.email)) {
          $scope.error = 'Your email address seems to be wrongly formatted. Please check and try again.';
          return;
      }
      // if ($scope.password === '' || $scope.password.length < 8) {
      //     $scope.error = 'Please enter a password that is at least 8 letters long.';
      //     return;
      // }
      // if ($scope.password !== $scope.passwordAgain) {
      //     $scope.error = 'Your passwords do not match. Please check again.';
      //     return;
      // }

      UserService.editUser($scope.userId, data)
        .then(function(user) {
          UserService.getUser($scope.userId)
            .then(function(user) {
              $rootScope.$broadcast('login:success', {user: user});
            });
          $scope.error = '';
        })
        .catch(function(err) {
          console.log(err);
          $scope.error = err.message;
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