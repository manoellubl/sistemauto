(function() {

    'use strict';

    /**
     * Controller responsável pela view das aulas.
     */
    angular.module('app').controller('ClazzController', [
        '$scope',
        '$mdDialog',
        'UserService',
        'StudentService',
        'ClazzService',
        ClazzController
    ]);

    function ClazzController($scope, $mdDialog, UserService, StudentService, ClazzService) {
        StudentService.getStudents().then(function(info) {
            _.each(info.data, function(student) {
                console.log(student);
                ClazzService.query(student._id);
                ClazzService.post(student._id, {
                    data: new Date(),
                    user: UserService.getId(),
                    student: student._id,
                    type: 'Simulado',
                    ativo: false
                }).then(function(info) {
                    info.data.ativo = true;
                   ClazzService.put(student._id, info.data._id, info.data);
                }, function(error) {

                });
                ClazzService.all();
            });
        }, function(error) {

        });
    }
})();
