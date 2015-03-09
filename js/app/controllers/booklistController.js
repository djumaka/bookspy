'use strict';
define(['app', 'angular', 'services/booklistFactory', 'services/routeResolver'], function (app, angular) {
    var booklistController = function ($scope, $route, booksFactory, routeResolverProvider) {
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
        function addRoute(path, route) {
            $route.routes[path] = angular.extend({
                    reloadOnSearch: true
                },
                route,
                path && pathRegExp(path, route));

            // create redirection for trailing slashes
            if (path) {
                var redirectPath = (path[path.length - 1] == '/') ? path.substr(0, path.length - 1) : path + '/';

                $route.routes[redirectPath] = angular.extend({
                        redirectTo: path
                    },
                    pathRegExp(redirectPath, route));
            }

            return this;
        };

        function pathRegExp(path, opts) {
            var insensitive = opts.caseInsensitiveMatch,
                ret = {
                    originalPath: path,
                    regexp: path
                },
                keys = ret.keys = [];

            path = path.replace(/([().])/g, '\\$1')
                .replace(/(\/)?:(\w+)([\?\*])?/g, function (_, slash, key, option) {
                    var optional = option === '?' ? option : null;
                    var star = option === '*' ? option : null;
                    keys.push({
                        name: key,
                        optional: !!optional
                    });
                    slash = slash || '';
                    return '' + (optional ? '' : slash) + '(?:' + (optional ? slash : '') + (star && '(.+?)' || '([^/]+)') + (optional || '') + ')' + (optional || '');
                })
                .replace(/([\/$\*])/g, '\\$1');

            ret.regexp = new RegExp('^' + path + '$', insensitive ? 'i' : '');
            return ret;
        }

        addRoute('/add', routeResol`verProvider.resolve('Addbook'));
        console.log($route);
    };
    booklistController.$inject = ['$scope', '$route', 'booklistFactory', 'routeResolver'];
    app.controller('BooklistController', booklistController);

});