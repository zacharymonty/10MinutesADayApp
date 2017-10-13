(function () {
    'use strict'

    angular.module('public.listing-management')
        .controller('listingsController', ListingsController)

    ListingsController.$inject = []

    function ListingsController() {
        'use strict'
        var vm = this
        vm.tagline = 'Current Listings'
        // vm.listing = random;
        // vm.service = greenscapeService;

    }
})()