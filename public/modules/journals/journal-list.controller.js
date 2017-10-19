(function () {
    'use strict'

    angular.module('public.journal')
        .controller('journalListController', JournalListController)

    JournalListController.$inject = ['journalService']

    function JournalListController(journalService) {
        'use strict'
        var vm = this
        vm.tagline = 'Current Listings'

        journalService.getAll() 
        .then(data => {
            vm.journals = data.items;
            console.log(vm.journals)
        })
        .catch(error => {
            console.log(error);
        });

        vm.remove = (id) => {
            journalService.remove(id)
                .then(onDeleteSuccess)
                .catch(onError)
        }


        function onDeleteSuccess(data) {
            let removeIndex = vm.journals.findIndex((element, index, journals) => {
                return element._id === data.item._id
            })
            vm.journals.splice(removeIndex, 1)
        }

        function onError(data) {
            console.log(`Error: ${data.errors}`)
        }



    }
})()