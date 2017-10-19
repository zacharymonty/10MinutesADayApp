(function () {
    'use strict'

    angular.module('public.journal')
        .controller('journalDetailController', JournalDetailController)

    JournalDetailController.$inject = ['journal']

    function JournalDetailController(journal) {
        'use strict'
        var vm = this
        vm.journal = journal


    }
})()