'use strict';

angular.module('eos')
  .controller('ProductsCtrl', ['$rootScope', '$scope', 'ProductsService', function($rootScope, $scope, ProductsService) {
    $scope.products = [];

    ProductsService.getProducts()
      .then(function(products) {
        $scope.products = products;
      });

    $scope.showProduct = function(productId) {
      $rootScope.$broadcast('product:show', {productId: productId});
      // $rootScope.$emit('product:show', {productId: productId});
      console.log(productId)
    }
  }]);