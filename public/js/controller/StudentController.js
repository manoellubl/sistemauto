(function() {

    'use strict';

    /**
     * Controller responsável pela view dos alunos.
     */
    angular.module('app').controller('StudentController', [
        '$scope',
        '$mdDialog',
        'StudentService',
        StudentController
    ]);

    function StudentController($scope, $mdDialog, StudentService) {

        $scope.students = [];

        StudentService.getStudents().then(function(info) {
            $scope.students = info.data;
        });

        $scope.showForm = function() {
            $mdDialog.show({
                scope: $scope,
                templateUrl: '../view/newStudent.html',
                parent: angular.element(document.body)
            });
        };
    }
})();