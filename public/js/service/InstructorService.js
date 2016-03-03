(function() {
    'use strict';

    /**
     * Service responsável pela lógica com dados dos instrutores
     */
    angular.module('app').service('InstructorService', [
        '$http',
        '$q',
        'ApiUrl',
        InstructorService
    ]);

    function InstructorService($http, $q, ApiUrl) {
        var self = this;

    }

})();