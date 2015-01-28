'use strict';

angular.module('eos')
  .controller('ProductCtrl', ['$scope', '$rootScope', '$stateParams', 'UserService', 'ProductsService', function ($scope, $rootScope, $stateParams, UserService, ProductsService) {
    $scope.user = null;
    $scope.userId = null;
    $scope.product = null;
    $scope.mainPhoto = null;
    $scope.reservation = false;

    $scope.showReservationForm = function() {
      $scope.reservation = true;
    };
    $scope.hideReservationForm = function() {
      $scope.reservation = false;
    };
    $scope.changeMainPhoto = function(photo) {
      $scope.mainPhoto = photo;
    };

    $scope.$on('product:show', function(evt, args) {
      $scope.mainPhoto = null;

      ProductsService.getProduct(args.productId)
        .then(function(product) {
          $scope.product = product;
        });
    });
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
