(function () {
    'use strict'

    angular.module('public.journal')
        .controller('newJournalController', NewJournalController)

    NewJournalController.$inject = ['journalService']

    function NewJournalController(journalService) {
        'use strict'
        var vm = this
        vm.tagline = 'Current Listings'
        // var date = new Date();
        vm.date = new Date()


        vm.submit = () => {
            journalService
                .insert(vm.formData)
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