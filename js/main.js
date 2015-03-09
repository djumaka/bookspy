/**
 * Created by boyan on 15-3-6.
 */
document.getElementById('topNav').style.display = 'none';
require.config({
    baseUrl: './js/app',
    urlArgs: 'v=1.0',
    paths: {
        angular: "angular.min",
        angularrouter: "angular-route.min"
    },
    shim: {
        angular: {
            exports: "angular"
        },
        angularrouter: {
            deps: ['angular'],
            exports: "angularrouter"
        }
    }
});

require(
    [
        'angularrouter',
        'controllers/booklistController',
        'app',
        'services/routeResolver'
    ],
    function () {
        angular.bootstrap(document, ['booksApp']);
        document.getElementById('topNav').style.display = 'block';
    });