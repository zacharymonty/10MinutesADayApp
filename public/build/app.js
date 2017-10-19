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
    "public.listing-management", "public.journal",
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
'use strict';

/* global angular */
(function () {
    'use strict';

    angular.module('public.journal', ['ui.router']).config(RouteConfig); //initialization step --needs the .config  - function passed to define .config

    RouteConfig.$inject = ['$stateProvider']; //has to match what ui-router gives 

    function RouteConfig($stateProvider) {
        $stateProvider.state('app.journal', {
            url: '/new-journal',
            views: {
                'content@app': {
                    templateUrl: '/public/modules/journals/new-journal.html',
                    controller: 'newJournalController as journalCtrl'
                    // resolve: {
                    //     listings: getAllListings
                    // }
                }
            }
        }).state('app.journal-list', {
            url: '/journal-list',
            views: {
                'content@app': {
                    templateUrl: '/public/modules/journals/journal-list.html',
                    controller: 'journalListController as journalListCtrl'
                    // resolve: {
                    //     listings: getAllListings
                    // }
                }
            }
        }).state('app.journal-detail', {
            url: '/journal-detail/:id',
            views: {
                'content@app': {
                    templateUrl: '/public/modules/journals/journal-detail.html',
                    controller: 'journalDetailController as journalDetailCtrl'
                    // resolve: {
                    //     listings: getAllListings
                    // }
                }
            },
            resolve: {
                journal: getJournalById
            }

        }).state('app.update-journal', {
            url: '/update-journal/:id',
            views: {
                'content@app': {
                    templateUrl: '/public/modules/journals/update-journal.html',
                    controller: 'updateJournalController as updateJournalCtrl'
                    // resolve: {
                    //     listings: getAllListings
                    // }
                }
            },
            resolve: {
                journal: getJournalById
            }

        });
    }

    function getAllJournals(journalService) {
        debugger;
        return journalService.getAll().then(function (data) {
            return data;
        }).catch(function (error) {
            console.log(error);
        });
    }

    function getJournalById(journalService, $stateParams) {
        return journalService.getById($stateParams.id).then(function (data) {
            return data.item;
        }).catch(function (error) {
            console.log(error);
        });
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
                    controller: 'listingsController as listCtrl'
                    // resolve: {
                    //     listings: getAllListings
                    // }
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
    // console.log("module loading")
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

    angular.module('public.journal').controller('journalDetailController', JournalDetailController);

    JournalDetailController.$inject = ['journal'];

    function JournalDetailController(journal) {
        'use strict';

        var vm = this;
        vm.journal = journal;
    }
})();
'use strict';

(function () {
    'use strict';

    angular.module('public.journal').controller('journalListController', JournalListController);

    JournalListController.$inject = ['journalService'];

    function JournalListController(journalService) {
        'use strict';

        var vm = this;
        vm.tagline = 'Current Listings';

        journalService.getAll().then(function (data) {
            vm.journals = data.items;
            console.log(vm.journals);
        }).catch(function (error) {
            console.log(error);
        });

        vm.remove = function (id) {
            journalService.remove(id).then(onDeleteSuccess).catch(onError);
        };

        function onDeleteSuccess(data) {
            var removeIndex = vm.journals.findIndex(function (element, index, journals) {
                return element._id === data.item._id;
            });
            vm.journals.splice(removeIndex, 1);
        }

        function onError(data) {
            console.log('Error: ' + data.errors);
        }
    }
})();
'use strict';

(function () {
    'use strict';

    angular.module('public.journal').controller('newJournalController', NewJournalController);

    NewJournalController.$inject = ['journalService'];

    function NewJournalController(journalService) {
        'use strict';

        var vm = this;
        vm.tagline = 'Current Listings';
        // var date = new Date();
        vm.date = new Date();

        vm.submit = function () {
            journalService.insert(vm.formData).then(_onSubmitSuccess).catch(_onError);
        };

        function _onSubmitSuccess(response) {
            console.log("success");
        }

        function _onError(error) {
            console.log(error);
        }
    }
})();
'use strict';

(function () {
    'use strict';

    angular.module('public.journal').controller('updateJournalController', UpdateJournalController);

    UpdateJournalController.$inject = ['journalService', 'journal', '$stateParams'];

    function UpdateJournalController(journalService, journal, $stateParams) {
        'use strict';

        var vm = this;
        vm.journal = journal;

        vm.update = function () {
            journalService.update(vm.journal).then(_onSubmitSuccess).catch(_onError);
        };

        function _onSubmitSuccess(response) {
            console.log("success");
        }

        function _onError(error) {
            console.log(error);
        }
    }
})();
'use strict';

(function () {
    'use strict';

    angular.module('public.listing-management').controller('listingsController', ListingsController);

    ListingsController.$inject = ['listingService'];

    function ListingsController(listingService) {
        'use strict';

        var vm = this;
        vm.tagline = 'Current Listings';
        // vm.listing = random;
        // vm.service = greenscapeService;
        listingService.getAll().then(function (data) {
            vm.listings = data.items;
            console.log(vm.listings);
        }).catch(function (error) {
            console.log(error);
        });

        // vm.listings = listings

    }
})();
"use strict";
'use strict';

(function () {
    'use strict';

    angular.module('public.journal').factory('journalService', JournalServiceFactory);

    JournalServiceFactory.$inject = ['$http', '$q'];

    function JournalServiceFactory($http, $q) {
        return {
            getAll: getAll,
            getById: getById,
            insert: insert,
            update: update,
            remove: remove
        };

        function getAll() {
            return $http.get('/api/journals').then(xhrSuccess).catch(onError);
        }

        function getById(id) {
            return $http.get('/api/journals/' + id).then(xhrSuccess).catch(onError);
        }

        function insert(journalData) {
            return $http.post('/api/journals', journalData).then(xhrSuccess).catch(onError);
        }

        function update(journalData) {
            return $http.put('/api/journals/' + journalData._id, journalData).then(xhrSuccess).catch(onError);
        }

        function remove(id) {
            return $http.delete('/api/journals/' + id).then(xhrSuccess).catch(onError);
        }

        function xhrSuccess(response) {
            return response.data;
        }

        function onError(error) {
            return $q.reject(error.data);
        }
    }
})();
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