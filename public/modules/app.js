
(function () {
    "use strict";
    angular
        .module("public", [
            // 3rd party
            "ui.router",
            "ui.bootstrap",

            //base / common
            "public.layout", //inside modules section
            "public.listing-management",
            "public.journal",
            //services
            "public.services", 

            //views /controllers

            'public.home',



            //constants
            // "public.constants"
        ])
        .config(RouteConfig)
        .run(function ($rootScope, $document, $window) {
            $rootScope.$on('$stateChangeError', console.log.bind(console));
        });

    RouteConfig.$inject = [
        "$stateProvider",
        "$urlRouterProvider",
        "$locationProvider"
    ];

    function RouteConfig($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise("/");
        $locationProvider.html5Mode(true);
    }

   
})();