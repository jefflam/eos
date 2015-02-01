'use strict';

angular.module('eos')
  .controller('TrackingCtrl', ['$rootScope', '$scope', 'ProductsService', function($rootScope, $scope, ProductsService) {
    $scope.user = null;
    $scope.userId = null;
    $scope.reservedProducts = [];
    $scope.purchasedProducts = [];
    $scope.reservedProductsTab = true;
    $scope.purchasedProductsTab = false;

    $scope.$on('tracking:show', function(evt, args) {
      ProductsService.getReservedProducts($scope.userId)
        .then(function(reservedProducts) {
          $scope.reservedProducts = reservedProducts;
        });
    });

    $scope.changeTab = function(tab) {
      if (tab === 'reservedProducts') {
        $scope.reservedProductsTab = true;
        $scope.purchasedProductsTab = false;

        ProductsService.getReservedProducts($scope.userId)
          .then(function(reservedProducts) {
            $scope.reservedProducts = reservedProducts;
          });
      } else if (tab === 'purchasedProducts') {
        $scope.reservedProductsTab = false;
        $scope.purchasedProductsTab = true;
        ProductsService.getPurchasedProducts($scope.userId)
          .then(function(purchasedProducts) {
            $scope.purchasedProducts = purchasedProducts;
          });
      }
    }

    $scope.purchaseProduct = function(product) {
      var data = {
        userId: $scope.userId,
        productId: product.id,
        userProductRefId: product.userProductRefId
      };

      ProductsService.purchaseProduct(data)
        .then(function(rsp) {
          console.log('Successfully purchased');
        });
    }

    $scope.$on('login:success', function(evt, args) {
      $scope.user = args.user.val();
      $scope.userId = args.user.key();
    });
  }]);