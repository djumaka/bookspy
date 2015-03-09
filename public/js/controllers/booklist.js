'use strict';
angular.module('booksList', [])
    .controller('BookslistCtrl', ['$scope', 'booksFactory', function ($scope, booksFactory) {

        // load data from server or take the cached version
        if (booksFactory.getBooks().length == 0) {
            booksFactory.refreshBooks().then(function (response) {
                $scope.booksList = response.data;
            });
        } else {
            $scope.booksList = booksFactory.getBooks();
        }

        $scope.refreshList = function () {
            booksFactory.refreshBooks().then(function (response) {
                console.log(response.data);
                $scope.booksList = response.data;
                $scope.filter.title = '';
            });
        }
    }])
    .controller('AddBookCtrl', ['$scope', 'booksFactory', function ($scope, booksFactory) {
        $scope.addNewBook = function () {
            booksFactory.addBook({
                title: $scope.newBook.title,
                author: $scope.newBook.author,
                isbn: $scope.newBook.isbn,
                haveIt: true
            });
        };
    }])
    .factory('booksFactory', ['$http', function ($http) {
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
    }]);