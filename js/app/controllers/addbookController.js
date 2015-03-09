/**
 * Created by boyan on 15-3-6.
 */
'use strict';
define(['app', 'angular'], function (app, angular) {
    var addbookController = function ($scope, booksFactory) {
        function ($scope, booksFactory) {
            $scope.addNewBook = function () {
                booksFactory.addBook({
                    title: $scope.newBook.title,
                    author: $scope.newBook.author,
                    isbn: $scope.newBook.isbn,
                    haveIt: true
                });
            };
        }
    };
    addbookController.$inject = ['$scope', 'booklistFactory'];
    app.controller('AddbookController', addbookController);
});