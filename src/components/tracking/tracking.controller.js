'use strict';

angular.module('eos')
  .controller('TrackingCtrl', ['$rootScope', '$scope', 'ProductsService', function($rootScope, $scope, ProductsService) {
    $scope.user = null;
    $scope.userId = null;
    $scope.reservedProducts = [];
    $scope.purchasedProducts = [];
    $scope.reservedProductsTab = true;
    $scope.purchasedProductsTab = false;

    ProductsService.getReservedProducts($scope.user)
      .then(function(reservedProducts) {
        $scope.reservedProducts = reservedProducts;
      });

    // $scope.showProduct = function(productId) {
    //   $rootScope.$broadcast('product:show', {productId: productId});
    // }

    $scope.$on('login:success', function(evt, args) {
      $scope.user = args.user.val();
      $scope.userId = args.user.key();
    });
  }]);