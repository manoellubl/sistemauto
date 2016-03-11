(function() {
    'use strict';

    /**
     * Service responsável pela lógica com dados dos alunos
     */
    angular.module('app').service('InstructorService', [
        '$http',
        '$q',
        'ApiUrl',
        InstructorService
    ]);

    function InstructorService($http, $q, ApiUrl) {
        var self = this;

        this.cache = {};

        this.getInstructors = function() {
            var deferred = $q.defer();
            if (Object.keys(self.cache).length  > 0 && Object.keys(self.cache) === 'undefined') {
                deferred.resolve({
                    data: [self.cache]
                });
            } else {
                $http.get(ApiUrl.url + '/instructor').then(function(info) {
                    for (var instructor in info.data) {
                        self.cache[instructor._id] = instructor;
                    }
                    deferred.resolve(info);
                }, function(error) {
                    deferred.reject(error);
                });
            }
            return deferred.promise;
        };

        this.getInstructor = function(id) {
            var deferred = $q.defer();
            if (self.self.cache.id !== undefined) {
                deferred.resolve({
                    data: self.cache.id
                });
            } else {
                $http.get(ApiUrl.url + '/instructor/' + id).then(function(info) {
                    self.cache.id = info.data;
                    deferred.resolve(info);
                }, function(error) {
                    deferred.reject(error);
                });
            }
            return deferred.promise;
        };

        this.postInstructor = function(data) {
            var deferred = $q.defer();

            $http.post(ApiUrl.url + '/instructor', data).then(function(info) {
                self.cache._id = info.data;
                deferred.resolve(info);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };

        this.updateInstructor = function(data) {
            var deferred = $q.defer();

            $http.put(ApiUrl.url + '/instructor/' + data._id, data).then(function(info) {
                self.cache._id = info.data;
                deferred.resolve(info);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };

        this.removeInstructor = function(id) {
        };

        this.getAddressByCep = function(cep) {
            return $http.get("http://cep.correiocontrol.com.br/" + cep + ".json")
        };
    }
})();