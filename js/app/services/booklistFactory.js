/**
 * Created by boyan on 15-3-6.
 */
'use strict';
define(['app'], function (app) {

    var booklistFactory = function ($http) {
        var factory = {};

        factory.data = {books: []};

        factory.getBooks = function () {
            return factory.data.books;
        };
        factory.refreshBooks = function () {
            return $http.get("/bookspy/load.php").success(function (data) {
                factory.data.books = data;
            });
        };


        factory.addBook = function (data) {
            factory.data.books.push(data);
            console.log(factory.data.books);
        };
        return factory;
    };
    booklistFactory.$inject = ['$http'];
    app.factory('booklistFactory', booklistFactory);
});