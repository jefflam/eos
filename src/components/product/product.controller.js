'use strict';

angular.module('eos')
  .controller('ProductCtrl', ['$scope', '$rootScope', '$stateParams', 'UserService', 'ProductsService', function ($scope, $rootScope, $stateParams, UserService, ProductsService) {
    $scope.user = null;
    $scope.userId = null;
    $scope.product = null;
    $scope.mainPhoto = null;
    $scope.reservation = false;
    $scope.variety = null;
    $scope.quantity = null;
    $scope.error = null;
    $scope.productId = null;

    $scope.showReservationForm = function() {
      $scope.reservation = true;
    };
    $scope.hideReservationForm = function() {
      $scope.reservation = false;
    };
    $scope.changeMainPhoto = function(photo) {
      $scope.mainPhoto = photo;
    };
    $scope.reserveProduct = function() {
      if ($scope.variety === null || $scope.variety === undefined || $scope.variety === '') {
        $scope.error = 'Please choose a variety.';
        return;
      } else if ($scope.quantity === null || $scope.quantity === undefined || $scope.quantity === '') {
        $scope.error = 'Please decide a quantity.';

        // if (!data.quantity.match(/^[0-9]*$/)) {
        //   $scope.error = 'Quantity in numbers only, please';
        //   return;
        // }
        return;
      }

      var data = {
        userId: $scope.userId,
        productId: $scope.productId,
        variety: $scope.variety,
        quantity: $scope.quantity
      };

      ProductsService.reserveProduct(data)
        .then(function(rsp) {
          console.log(rsp);
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    $scope.$on('product:show', function(evt, args) {
      $scope.mainPhoto = null;
      $scope.productId = args.productId;

      ProductsService.getProduct($scope.productId)
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
