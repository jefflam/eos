'use strict';

angular.module('eos')
  .controller('SignupCtrl', ['$scope', '$rootScope', 'UserService', function($scope, $rootScope, UserService) {
    $scope.name = '';
    $scope.email = '';
    $scope.password = '';
    $scope.passwordAgain = '';
    $scope.error = '';

    $scope.signup = function() {
      var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      var data = {
        name: $scope.name,
        email: $scope.email,
        password: $scope.password
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

      UserService.createNewUser(data)
        .then(function(user) {
          console.log(user.val());
          $scope.name = '';
          $scope.email = '';
          $scope.password = '';
          $scope.passwordAgain = '';
          $scope.error = '';
          $rootScope.$broadcast('signup-success', {user: user});
        })
        .catch(function(err) {
          console.log(err);
          $scope.error = err.message;
        });
    };
  }]);