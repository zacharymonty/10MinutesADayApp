(function () {
    'use strict'

    angular.module('public.listing-management')
        .controller('listingsController', ListingsController)

    ListingsController.$inject = ['listingService']

    function ListingsController(listingService) {
        'use strict'
        var vm = this
        vm.tagline = 'Current Listings'
        // vm.listing = random;
        // vm.service = greenscapeService;
        listingService.getAll() 
        .then(data => {
            vm.listings = data.items;
            console.log(vm.listings)
        })
        .catch(error => {
            console.log(error);
        });

        // vm.listings = listings
        

    }
})()