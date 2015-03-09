'use strict';

define(['angular', 'services/routeResolver'], function (angular, routeResolver) {
    var app = angular.module('booksApp', ['ngRoute', 'routeResolverServices'])
        .config(['$routeProvider', 'routeResolverProvider', '$controllerProvider',
            '$compileProvider', '$filterProvider', "$provide", "$httpProvider",
            function ($routeProvider, routeResolverProvider, $controllerProvider, $compileProvider,
                      $filterProvider, $provide, $httpProvider) {
                app.register =
                {
                    controller: $controllerProvider.register,
                    directive: $compileProvider.directive,
                    filter: $filterProvider.register,
                    factory: $provide.factory,
                    service: $provide.service
                };

                //Define routes - controllers will be loaded dynamically
                var route = routeResolverProvider.route;

                $routeProvider
                    .when('/list', route.resolve('Booklist'))
                    .otherwise({
                        redirectTo: '/list'
                    });
            }
        ]);

    app.run(['$rootScope', '$location',// 'authService',
        function ($rootScope, $location) {

            //Client-side security. Server-side framework MUST add it's
            //own security as well since client-based security is easily hacked
            /*
             $rootScope.$on("$routeChangeStart", function (event, next, current) {
             if (next && next.$$route && next.$$route.secure) {
             if (!authService.user.isAuthenticated) {
             $rootScope.$evalAsync(function () {
             authService.redirectToLogin();
             });
             }
             }
             });
             */

        }]);

    return app;
});