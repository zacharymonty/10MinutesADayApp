(function() {
    'use strict'

    angular.module('public.services')
        .factory('listingService', ListingServiceFactory)

    ListingServiceFactory.$inject = ['$http', '$q']

    function ListingServiceFactory($http, $q) {
        return {
            getAll: getAll,
            getById: getById,
            insert: insert,
            update: update,
            remove: remove
        }

        function getAll() {
            return $http.get('/api/listings')
                .then(xhrSuccess)
                .catch(onError)
        }

        function getById(id) {
            return $http.get(`/api/listings/${id}`)
                .then(xhrSuccess)
                .catch(onError)
        }

        function insert(listingData) {
            return $http.post('/api/listings', listingData)
                .then(xhrSuccess)
                .catch(onError)
        }

        function update(listingData) {
            return $http.put(`/api/listings/${listingData._id}`, listingData)
                .then(xhrSuccess)
                .catch(onError)
        }

        function remove(id) {
            return $http.delete(`/api/listings/${id}`)
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
