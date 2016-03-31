(function() {
    'use strict';

    /**
     * Service responsável pela lógica com dados dos alunos
     */
    angular.module('app').service('InstructorService', [
        '$http',
        '$q',
        'ApiUrl',
        'UserService',
        InstructorService
    ]);

    function InstructorService($http, $q, ApiUrl, UserService) {
        var self = this;

        this.cache = {};

        this.getInstructors = function() {
            var deferred = $q.defer();
            if (Object.keys(self.cache).length > 0 && Object.keys(self.cache) === 'undefined') {
                deferred.resolve({
                    data: [self.cache]
                });
            } else {
                $http.get(ApiUrl.url + '/user/' + UserService.getId() + "/instructor").then(function(info) {
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
            if (self.cache.id !== undefined && self.cache.id == id) {
                deferred.resolve({
                    data: self.cache.id
                });
            } else {
                $http.get(ApiUrl.url + '/user/' + UserService.getId() + "/instructor/" + id).then(function(info) {
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
            $http.post(ApiUrl.url + '/user/' + UserService.getId() + "/instructor", data).then(function(info) {
                self.cache._id = info.data;
                deferred.resolve(info);
            }, function(error) {
                console.log(error);
                deferred.reject(error);
            });

            return deferred.promise;
        };

        this.updateInstructor = function(data) {
            var deferred = $q.defer();
            $http.put(ApiUrl.url + '/user/' + UserService.getId() + "/instructor/" + data._id, data).then(function(info) {
                self.cache._id = info.data;
                deferred.resolve(info);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };

        this.removeInstructor = function(id) {
            var deferred = $q.defer();
            $http.delete(ApiUrl.url + '/user/' + UserService.getId() + "/instructor/" + id).then(function(info) {
                delete self.cache._id;
                deferred.resolve(info);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };

        this.getAddressByCep = function(cep) {
            return $http.get("http://cep.correiocontrol.com.br/" + cep + ".json")
        };
    }
})();
