'use strict';

angular.module('eos')
  .controller('ProductsCtrl', ['$scope', 'ProductsService', function($scope, ProductsService) {
    $scope.products = [];

    ProductsService.getProducts()
      .then(function(products) {
        $scope.products = products;
      });
  }]);