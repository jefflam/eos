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
      },
      getProduct: function(productId) {
        var q = $q.defer();
        var productsRef = new Firebase(FIREBASE_URL + 'products/' + productId);
        var sync = $firebase(productsRef);
        var syncObject = sync.$asObject();

        q.resolve(syncObject);
        return q.promise;
      },
      getReservedProducts: function(userId) {
        var q = $q.defer();
        var productsRef = new Firebase(FIREBASE_URL + 'users/' + userId + '/reservations');
        var sync = $firebase(productsRef);
        var syncObject = sync.$asObject();

        q.resolve(syncObject);
        return q.promise;
      },
      getPurchasedProducts: function(userId) {
        var q = $q.defer();
        var productsRef = new Firebase(FIREBASE_URL + 'users/' + userId + '/purchases');
        var sync = $firebase(productsRef);
        var syncObject = sync.$asObject();

        q.resolve(syncObject);
        return q.promise;
      }
    };
    return service;
  }]);