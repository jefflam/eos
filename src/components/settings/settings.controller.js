'use strict';

angular.module('eos')
  .controller('SettingsCtrl', ['$scope', '$rootScope', 'UserService', function($scope, $rootScope, UserService) {
    $scope.user = null;
    $scope.userId = null;
    $scope.error = '';

    console.log($scope.user);

    $scope.saveChanges = function() {
      var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      var data = {
        name: $scope.name,
        email: $scope.email,
        password: $scope.password,
        address1: $scope.address1,
        address2: $scope.address2,
        address3: $scope.address3,
        country: $scope.country
      };

      if ($scope.name === '') {
          $scope.error = 'Please enter your name.';
          return;
      }
      if ($scope.email === '') {
          $scope.error = 'Please enter your email.';
          return;
      }
      if (!emailRegex.test($scope.email)) {
          $scope.error = 'Your email address seems to be wrongly formatted. Please check and try again.';
          return;
      }
      if ($scope.password === '' || $scope.password.length < 8) {
          $scope.error = 'Please enter a password that is at least 8 letters long.';
          return;
      }
      if ($scope.password !== $scope.passwordAgain) {
          $scope.error = 'Your passwords do not match. Please check again.';
          return;
      }

      UserService.editUser($scope.userId, data)
        .then(function(user) {
          $scope.name = '';
          $scope.email = '';
          $scope.address1 = '';
          $scope.address2 = '';
          $scope.address3 = '';
          $scope.country = '';
          $scope.password = '';
          $scope.passwordAgain = '';
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
      console.log($scope.user);
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