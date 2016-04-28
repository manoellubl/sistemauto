(function() {
    'use strict';

    /**
     * TODO lembrar de fazer um monta url
     *
     * Service responsável pela lógica com dados de aulas
     */
    angular.module('app').service('ClazzService', [
        '$http',
        '$q',
        'ApiUrl',
        'UserService',
        ClazzService
    ]);

    function ClazzService($http, $q, ApiUrl, UserService) {

        this.all = function() {
            var deferred = $q.defer();
            var url = ApiUrl.url + '/user/' + UserService.getId() + '/clazz';
            $http.get(url).then(function(info) {
                deferred.resolve(info);
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        this.query = function(idStudent) {
            var deferred = $q.defer();
            var url = ApiUrl.url + '/user/' + UserService.getId() + "/student/" + idStudent + '/clazz';
            $http.get(url).then(function(info) {
                deferred.resolve(info);
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        this.get = function(idStudent, id) {
            var deferred = $q.defer();
            var url = ApiUrl.url + '/user/' + UserService.getId() + "/student/" + idStudent + '/clazz/' + id;
            $http.get(url).then(function(info) {
                deferred.resolve(info);
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        this.post = function(idStudent, data) {
            console.log(idStudent);
            var deferred = $q.defer();
            var url = ApiUrl.url + '/user/' + UserService.getId() + "/student/" + idStudent + '/clazz';
            $http.post(url, data).then(function(info) {
                deferred.resolve(info);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };

        this.put = function(idStudent, id, data) {
            var deferred = $q.defer();
            var url = ApiUrl.url + '/user/' + UserService.getId() + "/student/" + idStudent + '/clazz/' + id;

            $http.put(url, data).then(function(info) {
                deferred.resolve(info);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };

        this.remove = function(asd, id) {
            var deferred = $q.defer();
            var url = ApiUrl.url + '/user/' + UserService.getId() + "/student/" + asd + '/clazz/' + id;

            $http.delete(url).then(function(info) {
                console.log("clazz serviceeee");
                deferred.resolve(info);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };
    }
})();