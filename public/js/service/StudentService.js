(function() {
    'use strict';

    /**
     * TODO lembrar de fazer um monta url
     *
     * Service responsável pela lógica com dados dos alunos
     */
    angular.module('app').service('StudentService', [
        '$http',
        '$q',
        'ApiUrl',
        'UserService',
        StudentService
    ]);

    function StudentService($http, $q, ApiUrl, UserService) {
        var self = this;

        this.cache = {};

        this.getStudents = function() {
            var deferred = $q.defer();
            if (Object.keys(self.cache).length  > 0 && Object.keys(self.cache) === "undefined") {
                deferred.resolve({
                    data: [self.cache]
                });
            } else {
                $http.get(ApiUrl.url + '/user/' + UserService.getId() + "/student").then(function(info) {
                    for (var student in info.data) {
                        self.cache[student._id] = student;
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
            if (self.cache.id != undefined && self.cache.id == id) {
                deferred.resolve({
                    data: self.cache.id
                });
            } else {
                $http.get(ApiUrl.url + '/user/' + UserService.getId() + "/student/" + id).then(function(info) {
                    self.cache.id = info.data;
                    deferred.resolve(info);
                }, function(error) {
                    deferred.reject(error);
                });
            }
            return deferred.promise;
        };

        this.postStudent = function(data) {
            var deferred = $q.defer();

            $http.post(ApiUrl.url + '/user/' + UserService.getId() + "/student", data).then(function(info) {
                self.cache._id = info.data;
                deferred.resolve(info);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };

        this.updateStudent = function(data) {
            var deferred = $q.defer();

            $http.put(ApiUrl.url + '/user/' + UserService.getId() + "/student/" + data._id, data).then(function(info) {
                self.cache._id = info.data;
                deferred.resolve(info);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };

        this.removeStudent = function(id) {
            var deferred = $q.defer();

            $http.delete(ApiUrl.url + '/user/' + UserService.getId() + "/student/" + id).then(function(info) {
                delete self.cache._id;
                deferred.resolve(info);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };

        this.getAddressByCep = function(cep) {
            return $http.get("http://cep.correiocontrol.com.br/" + cep + ".json");
        };
    }
})();