(function() {
    'use strict'

    angular.module('public.journal')
        .factory('journalService', JournalServiceFactory)

    JournalServiceFactory.$inject = ['$http', '$q']

    function JournalServiceFactory($http, $q) {
        return {
            getAll: getAll,
            getById: getById,
            insert: insert,
            update: update,
            remove: remove
        }

        function getAll() {
            return $http.get('/api/journals')
                .then(xhrSuccess)
                .catch(onError)
        }

        function getById(id) {
            return $http.get(`/api/journals/${id}`)
                .then(xhrSuccess)
                .catch(onError)
        }

        function insert(journalData) {
            return $http.post('/api/journals', journalData)
                .then(xhrSuccess)
                .catch(onError)
        }

        function update(journalData) {
            return $http.put(`/api/journals/${journalData._id}`, journalData)
                .then(xhrSuccess)
                .catch(onError)
        }

        function remove(id) {
            return $http.delete(`/api/journals/${id}`)
                .then(xhrSuccess)
                .catch(onError)
        }

        function xhrSuccess(response) {
            return response.data
        }

        function onError(error) {
            return $q.reject(error.data)
        }
    }
})()
