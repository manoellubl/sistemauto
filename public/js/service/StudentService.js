(function() {
    'use strict';

    /**
     * Service responsável pela lógica com dados dos alunos
     */
    angular.module('app').service('StudentService', [
        '$http',
        '$q',
        'ApiUrl',
        StudentService
    ]);

    function StudentService($http, $q, ApiUrl) {
        var self = this;

        var cache = {};

        this.getStudents = function() {
            var deferred = $q.defer();
            if (self.cache.length !== 0) {
                deferred.resolve({
                    data: [cache]
                });
            } else {
                $http.get(ApiUrl.url + '/student').then(function(info) {
                    for (var student in info.data) {
                        cache[student._id] = student;
                    }
                    deferred.resolve(info);
                }, function(error) {
                    deferred.reject(error);
                });
            }
            return deferred.promise;
        };

        this.getStudent = function(id) {
            var deferred = $q.defer();
            if (self.cache.id !== undefined) {
                deferred.resolve({
                    data: cache.id
                });
            } else {
                $http.get(ApiUrl.url + '/student/' + id).then(function(info) {
                    cache.id = info.data;
                    deferred.resolve(info);
                }, function(error) {
                    deferred.reject(error);
                });
            }
            return deferred.promise;
        };

        this.postStudent = function() {
            var deferred = $q.defer();

            $http.post(ApiUrl.url + '/student', data).then(function(info) {
                cache._id = info.data;
                deferred.resolve(info);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };

        this.updateStudent = function(data) {
            var deferred = $q.defer();

            $http.put(ApiUrl.url + '/student/' + data._id, data).then(function(info) {
                cache._id = info.data;
                deferred.resolve(info);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };

        this.removeStudent = function(id) {

        };
    }
})();