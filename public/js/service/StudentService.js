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

    }
})();