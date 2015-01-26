'use strict';

angular.module('eos')
  .controller('ProductsCtrl', ['$scope', 'ProductService', function($scope, ProductService) {
    $scope.products = [];

    ProductService.getProducts()
      .then(function(products) {
        $scope.products = products;
        console.log(products);
      });
  }]);