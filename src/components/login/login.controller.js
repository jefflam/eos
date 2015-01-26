'use strict';

angular.module('eos')
  .controller('LoginCtrl', ['$scope', 'ProductsService', function($scope, ProductsService) {
    $scope.products = [];

    ProductsService.getProducts()
      .then(function(products) {
        $scope.products = products;
      });
  }]);