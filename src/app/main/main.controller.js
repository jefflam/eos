'use strict';

angular.module('eos')
  .controller('MainCtrl', ['$scope', 'ProductsService', function($scope, ProductsService) {
    ProductsService.getProducts()
      .then(function(products) {
        console.log(products);
      });
  }]);
