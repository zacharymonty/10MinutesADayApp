/* global angular */
(function () {
    'use strict';

    angular.module('public.journal', ['ui.router']).config(RouteConfig); //initialization step --needs the .config  - function passed to define .config

    RouteConfig.$inject = ['$stateProvider']; //has to match what ui-router gives 

    function RouteConfig($stateProvider) {
        $stateProvider
            .state('app.new-journal', {
                url: '/new-journal',
                views: {
                    'content@app': {
                        templateUrl: '/public/modules/journals/new-journal.html',
                        controller: 'newJournalController as journalCtrl',
                        // resolve: {
                        //     listings: getAllListings
                        // }
                    }
                }
            })
            .state('app.journal-list', {
                url: '/journal-list',
                views: {
                    'content@app': {
                        templateUrl: '/public/modules/journals/journal-list.html',
                        controller: 'journalListController as journalListCtrl',
                        // resolve: {
                        //     listings: getAllListings
                        // }
                    }
                }
            })
            .state('app.journal-detail', {
                url: '/journal-detail/:id',
                views: {
                    'content@app': {
                        templateUrl: '/public/modules/journals/journal-detail.html',
                        controller: 'journalDetailController as journalDetailCtrl',
                        // resolve: {
                        //     listings: getAllListings
                        // }
                    }
                },
                resolve: {
                    journal: getJournalById
                }

            })
            .state('app.update-journal', {
                url: '/update-journal/:id',
                views: {
                    'content@app': {
                        templateUrl: '/public/modules/journals/update-journal.html',
                        controller: 'updateJournalController as updateJournalCtrl',
                        // resolve: {
                        //     listings: getAllListings
                        // }
                    }
                },
                resolve: {
                    journal: getJournalById
                }

            })


    }

    function getAllJournals(journalService) {
        debugger;
        return journalService.getAll()
            .then(data => {
                return data;
            })
            .catch(error => {
                console.log(error);
            });
    }

    function getJournalById(journalService, $stateParams) {
        return journalService
            .getById($stateParams.id)
            .then(data => {
                return data.item;
            })
            .catch(error => {
                console.log(error)
            })
    }

})();