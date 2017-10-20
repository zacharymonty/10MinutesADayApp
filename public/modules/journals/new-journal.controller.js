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

        vm.startTyping = vm.formData


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

        

        function startCountdown() {
            // set the date we're counting down to
            var target_date = new Date();
            target_date.setMinutes(target_date.getMinutes() + 1);

            // variables for time units
            var minutes, seconds;

            // get tag element
            var countdown = document.getElementById("countdown");

            // update the tag with id "countdown" every 1 second
            setInterval(function () {

                // find the amount of "seconds" between now and target
                var current_date = new Date().getTime();
                var seconds_left = (target_date - current_date) / 1000;

                // do some time calculations
                minutes = parseInt(seconds_left / 60);
                seconds = parseInt(seconds_left % 60);

                // format countdown string + set tag value
                countdown.innerHTML = minutes + " minutes " + seconds + " seconds";

            }, 1000);

            if (minutes == 0 && seconds == 0) {
                alert("times up!");
            }
        }
        // vm.isDirty = vm.journalEntry.$dirty;
        // if (vm.isDirty){
        //     startCountdown()
        // }





    }
})()