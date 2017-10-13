/* global angular */
(function () {
    'use strict';

    angular.module('public.listing-management', ['ui.router']).config(RouteConfig); //initialization step --needs the .config  - function passed to define .config

    RouteConfig.$inject = ['$stateProvider']; //has to match what ui-router gives 

    function RouteConfig($stateProvider) {
        $stateProvider
            .state('app.listings', {
                url: '/listings',
                views: {
                    'content@app': {
                        templateUrl: '/public/modules/listing-management/listings.html',
                        controller: 'listingsController as listCtrl',
                        resolve: {
                            blah: function() {
                                debugger;
                            },
                            random: function() {
                                debugger;
                            }
                        }
                    }
                }
            })
            .state('app.new-listing', { //indicates a child state - related to the above 
                url: '/new-listing',
                views: {
                    'content@app': {
                        templateUrl: '/public/modules/listing-management/new-listing.html',
                        controller: 'newListingController as newListCtrl',
                        // resolve: {
                        //     hackers: getAllHackers
                        // }
                    }
                },
                ncyBreadcrumb: {
                    label: 'LIST', // angular-breadcrumb's configuration
                    parent: 'app.home'
                }
            })




    }

    function getAllListings(listingService) {
        debugger;
        return listingService.getAll()
            .then(data => {
                return data.items;
            })
            .catch(error => {
                console.log(error);
            });
    }

})();