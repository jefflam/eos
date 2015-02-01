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
        var productsRef = new Firebase(FIREBASE_URL + 'users/' + userId + '/products');
        var productRef;
        var products = [];

        productsRef.on('value', function(reservedProducts) {
          for (var productId in reservedProducts.val()) {
            if (reservedProducts.val().hasOwnProperty(productId)
              && reservedProducts.val()[productId].status === 'reserved') {
              productRef = new Firebase(FIREBASE_URL + 'products/' + reservedProducts.val()[productId].productId);
              productRef.on('value', function(product) {
                var _product = product.val();
                _product['userProductRefId'] = productId;
                products.push(_product);
              });
            }
          }
          q.resolve(products);
        });

        return q.promise;
      },
      getPurchasedProducts: function(userId) {
        var q = $q.defer();
        var productsRef = new Firebase(FIREBASE_URL + 'users/' + userId + '/products');
        var productRef;
        var products = [];

        productsRef.on('value', function(purchasedProducts) {
          for (var productId in purchasedProducts.val()) {
            if (purchasedProducts.val().hasOwnProperty(productId)
              && reservedProducts.val()[productId].status === 'purchased') {
              productRef = new Firebase(FIREBASE_URL + 'products/' + purchasedProducts.val()[productId].productId);
              productRef.on('value', function(product) {
                products.push(product.val());
              });
            }
          }
          q.resolve(products);
        });

        return q.promise;
      },
      reserveProduct: function(data) {
        var q = $q.defer();
        var usersProductsRef = new Firebase(FIREBASE_URL + 'users/' + data.userId + '/products');
        var productsRef = new Firebase(FIREBASE_URL + 'products/' + data.productId);
        data.quantity = parseInt(data.quantity);

        var newUsersProductsRef = productsRef.child('users').push({
          userId: data.userId,
          quantity: data.quantity,
          variety: data.variety,
          status: 'reserved',
        });
        usersProductsRef.push({
          productId: data.productId,
          quantity: data.quantity,
          variety: data.variety,
          status: 'reserved',
          refId: newUsersProductsRef.key()
        });

        productsRef.child('currentOrders').transaction(function(currentValue) {
          currentValue = (currentValue || 0) + data.quantity;
          q.resolve(productsRef);
          return currentValue;
        });
        return q.promise;
      },
      purchaseProduct: function(data) {
        var q = $q.defer();
        var usersProductsRef = new Firebase(FIREBASE_URL + 'users/' + data.userId + '/products/' + data.userProductRefId);
        var productsRef = new Firebase(FIREBASE_URL + 'products/' + data.productId + '/users/');

        usersProductsRef.update({
          status: 'purchased'
        });
        usersProductsRef.on('value', function(currentValue) {
          productsRef.child(currentValue.val().refId).update({
            status: 'purchased'
          });
          q.resolve(productsRef);
          return currentValue;
        });

        return q.promise;
      },
    };
    return service;
  }]);