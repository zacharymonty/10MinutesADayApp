(function () {
    'use strict'

    angular.module('public.journal')
        .controller('updateJournalController', UpdateJournalController)

    UpdateJournalController.$inject = ['journalService', 'journal', '$stateParams']

    function UpdateJournalController(journalService, journal, $stateParams) {
        'use strict'
        var vm = this
        vm.journal = journal
        
        vm.update = () => {
            journalService
                .update(vm.journal)
                .then(_onSubmitSuccess)
                .catch(_onError);
        }

        function _onSubmitSuccess(response) {
            console.log("success");
        }

        function _onError(error) {
            console.log(error);
        }



    }
})()