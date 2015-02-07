'use strict';

angular.module('eos')
  .controller('AdminCtrl', ['$rootScope', '$scope', 'ProductsService', function($rootScope, $scope, ProductsService) {
    $scope.user = null;
    $scope.userId = null;
    $scope.admin = null;
    $scope.currentProducts = [];
    $scope.currentProductsTab = true;
    $scope.newProductTab = false;
    $scope.editProductTab = false;
    $scope.new = {};
    $scope.edit = {};

    $scope.$on('admin:show', function(evt, args) {
      ProductsService.getProducts()
        .then(function(currentProducts) {
          $scope.currentProducts = currentProducts;
        });
    });
    $scope.$on('login:success', function(evt, args) {
      $scope.user = args.user.val();
      $scope.userId = args.user.key();
      $scope.admin = args.user.val().admin;
    });

    $scope.changeTab = function(tab, product) {
      if (tab === 'currentProducts') {
        $scope.currentProductsTab = true;
        $scope.newProductTab = false;
        $scope.editProductTab = false;

        // ProductsService.getProducts()
        //   .then(function(currentProducts) {
        //     $scope.currentProducts = currentProducts;
        //   });

      } else if (tab === 'newProduct') {
        $scope.currentProductsTab = false;
        $scope.newProductTab = true;
        $scope.editProductTab = false;
      } else if (tab === 'editProduct') {
        $scope.edit = product;
        $scope.currentProductsTab = false;
        $scope.newProductTab = false;
        $scope.editProductTab = true;
      }
    };

    $scope.addProduct = function() {
      var data = {
        title: $scope.new.title,
        description: $scope.new.description,
        category: $scope.new.category,
        originalPrice: $scope.new.originalPrice,
        discountedPrice: $scope.new.discountedPrice,
        ordersNeeded: $scope.new.ordersNeeded,
        status: $scope.new.status,
        images: {
          image1: $scope.new.image1,
          image2: $scope.new.image2,
          image3: $scope.new.image3,
          image4: $scope.new.image4
        }
      };

      ProductsService.addProduct(data)
        .then(function(rsp) {
          $scope.new = {};
          $scope.changeTab('currentProducts');
        })
        .catch(function(err) {
          console.log(err);
        });
    };

    $scope.editProduct = function(product) {
      var data = {
        id: $scope.edit.$id,
        title: $scope.edit.title,
        description: $scope.edit.description,
        category: $scope.edit.category,
        originalPrice: $scope.edit.originalPrice,
        discountedPrice: $scope.edit.discountedPrice,
        ordersNeeded: $scope.edit.ordersNeeded,
        status: $scope.edit.status,
        images: {
          image1: $scope.edit.images.image1,
          image2: $scope.edit.images.image2,
          image3: $scope.edit.images.image3,
          image4: $scope.edit.images.image4
        }
      };
      ProductsService.editProduct(data)
        .then(function(rsp) {
          $scope.edit = {};
          $scope.changeTab('currentProducts');
        })
        .catch(function(err) {
          console.log(err);
        });
    };
  }]);