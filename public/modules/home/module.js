(function () {
    'use strict'
    angular.module('public.home', ['ui.router'])
        .config(RouteConfig);

    RouteConfig.$inject = ['$stateProvider'];

    function RouteConfig($stateProvider) {
        $stateProvider
            .state('app.home', {
                url: '/',
                views: {
                    'content@app': {
                        templateUrl: '/public/modules/home/home.html',
                        controller: 'homeController as homeCtrl'
                    }
                }
                // ncyBreadcrumb: {
                //     label: 'HOME'
                // }
            })
    }
})();