'use strict';

angular.module('eos')
  .factory('ProductsService', ['$http', '$q', '$firebase', 'FIREBASE_URL', function($http, $q, $firebase, FIREBASE_URL) {
    var service = {
      getProducts: function() {
        var q = $q.defer();
        var productsRef = new Firebase(FIREBASE_URL + 'products');
        var sync = $firebase(productsRef);
        var syncArray = sync.$asArray();

        syncArray.$loaded(function() {
          q.resolve(syncArray);
        });
        return q.promise;
      }
    };
    return service;
  }]);