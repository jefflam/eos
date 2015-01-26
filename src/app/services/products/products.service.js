'use strict';

angular.module('eos')
  .factory('ProductsService', ['$http', '$q', '$firebase', 'FIREBASE_URL', function($http, $q, $firebase, FIREBASE_URL) {
    var service = {
      getProducts: function() {
        var q = $q.defer();
        var productsRef = new Firebase(FIREBASE_URL + 'products');
        var products = [];

        console.log(productsRef);
        q.resolve();

        return q.promise;
      }
    };
    return service;
  }]);