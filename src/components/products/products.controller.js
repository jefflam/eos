'use strict';

angular.module('eos')
  .controller('ProductsCtrl', ['$rootScope', '$scope', 'ProductsService', function($rootScope, $scope, ProductsService) {
    $scope.products = [];
    $scope.productFilter = 'reservation';

    ProductsService.getProducts()
      .then(function(products) {
        $scope.products = products;
      });

    $scope.showProduct = function(productId) {
      $rootScope.$broadcast('product:show', {productId: productId});
      // $rootScope.$emit('product:show', {productId: productId});
    }
  }]);