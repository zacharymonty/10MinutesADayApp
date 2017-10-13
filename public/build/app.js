'use strict';

$(function () {
    angular.bootstrap(document, ['public']);
});
"use strict";

(function () {
    "use strict";

    angular.module("public", [
    // 3rd party
    "ui.router", "ui.bootstrap",

    //base / common
    "public.layout", //inside modules section
    "public.listing-management",
    //services
    "public.services",

    //views /controllers

    'public.home']

    //constants
    // "public.constants"
    ).config(RouteConfig).run(function ($rootScope, $document, $window) {
        $rootScope.$on('$stateChangeError', console.log.bind(console));
    });

    RouteConfig.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];

    function RouteConfig($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise("/");
        $locationProvider.html5Mode(true);
    }
})();
'use strict';

(function () {
    'use strict';

    angular.module('public.home', ['ui.router']).config(RouteConfig);

    RouteConfig.$inject = ['$stateProvider'];

    function RouteConfig($stateProvider) {
        $stateProvider.state('app.home', {
            url: '/',
            views: {
                'content@app': {
                    templateUrl: '/public/modules/home/home.html',
                    controller: 'homeController as homeCtrl'
                }
                // ncyBreadcrumb: {
                //     label: 'HOME'
                // }
            } });
    }
})();
"use strict";

/* global angular */
(function () {
    "use strict";

    angular.module("public.layout", ["ui.router"]).config(RouteConfig);

    RouteConfig.$inject = ["$stateProvider"];

    function RouteConfig($stateProvider) {
        $stateProvider.state("app", {
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
'use strict';

/* global angular */
(function () {
    'use strict';

    angular.module('public.listing-management', ['ui.router']).config(RouteConfig); //initialization step --needs the .config  - function passed to define .config

    RouteConfig.$inject = ['$stateProvider']; //has to match what ui-router gives 

    function RouteConfig($stateProvider) {
        $stateProvider.state('app.listings', {
            url: '/listings',
            views: {
                'content@app': {
                    templateUrl: '/public/modules/listing-management/listings.html',
                    controller: 'listingsController as listCtrl',
                    resolve: {
                        blah: function blah() {
                            debugger;
                        },
                        random: function random() {
                            debugger;
                        }
                    }
                }
            }
        }).state('app.new-listing', { //indicates a child state - related to the above 
            url: '/new-listing',
            views: {
                'content@app': {
                    templateUrl: '/public/modules/listing-management/new-listing.html',
                    controller: 'newListingController as newListCtrl'
                    // resolve: {
                    //     hackers: getAllHackers
                    // }
                }
            },
            ncyBreadcrumb: {
                label: 'LIST', // angular-breadcrumb's configuration
                parent: 'app.home'
            }
        });
    }

    function getAllListings(listingService) {
        debugger;
        return listingService.getAll().then(function (data) {
            return data.items;
        }).catch(function (error) {
            console.log(error);
        });
    }
})();
'use strict';

/* global angular */
(function () {
	'use strict';

	// ngFileUpload is required to run "Upload" in service module

	angular.module('public.services', []);
})();
"use strict";
'use strict';

(function () {
    'use strict';

    angular.module('public.listing-management').controller('listingsController', ListingsController);

    ListingsController.$inject = [];

    function ListingsController() {
        'use strict';

        var vm = this;
        vm.tagline = 'Current Listings';
        // vm.listing = random;
        // vm.service = greenscapeService;
    }
})();
"use strict";
'use strict';

(function () {
    'use strict';

    angular.module('public.services').factory('listingService', ListingServiceFactory);

    ListingServiceFactory.$inject = ['$http', '$q'];

    function ListingServiceFactory($http, $q) {
        return {
            getAll: getAll,
            getById: getById,
            insert: insert,
            update: update,
            remove: remove
        };

        function getAll() {
            return $http.get('/api/listings').then(xhrSuccess).catch(onError);
        }

        function getById(id) {
            return $http.get('/api/listings/' + id).then(xhrSuccess).catch(onError);
        }

        function insert(listingData) {
            return $http.post('/api/listings', listingData).then(xhrSuccess).catch(onError);
        }

        function update(listingData) {
            return $http.put('/api/listings/' + listingData._id, listingData).then(xhrSuccess).catch(onError);
        }

        function remove(id) {
            return $http.delete('/api/listings/' + id).then(xhrSuccess).catch(onError);
        }

        function xhrSuccess(response) {
            return response.data;
        }

        function onError(error) {
            return $q.reject(error.data);
        }
    }
})();