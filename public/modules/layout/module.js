/* global angular */
(function () {
    "use strict";

    angular.module("public.layout", ["ui.router"]).config(RouteConfig);

    RouteConfig.$inject = ["$stateProvider"];

    function RouteConfig($stateProvider) {
        $stateProvider
            .state("app", {
                views: {
                    root: {
                        templateUrl: "/public/modules/layout/layout.tpl.html"
                        // resolve: {
                        //     navbars: getAllNavbars,
                        // }
                    }
                }
            });


    }
})();