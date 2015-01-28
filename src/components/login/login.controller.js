'use strict';

angular.module('eos')
  .controller('LoginCtrl', ['$scope', '$rootScope', 'UserService', function($scope, $rootScope, UserService) {
    $scope.email = '';
    $scope.password = '';
    $scope.error = '';

    $scope.forgotPassword = function() {
      $rootScope.$broadcast('show-forgot-password');
    }

    $scope.login = function() {
      var data = {
        email: $scope.email,
        password: $scope.password
      };

      UserService.userLogin(data)
        .then(function(user) {
          console.log(user);
          $scope.email = '';
          $scope.password = '';
          $scope.error = '';
          $rootScope.$broadcast('login:success', {user: user});
        })
        .catch(function(err) {
          console.log(err);
          $scope.error = err.message;
        });
    };
  }]);