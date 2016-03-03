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
            $scope.students.splice(0, $scope.students.length);
            $scope.students.push.apply($scope.students, info.data);
        });

        $scope.register = function() {
            StudentService.postStudent($scope.student).then(function(info) {
            }, function(error) {
                console.log(error);
            });
        };
        $scope.update = function(id) {
            console.log(id);
            StudentService.putStudent($scope.student).then(function(info) {
            }, function(error) {
                console.log(error);
            });
        };

        $scope.closeForm = function() {
            $mdDialog.hide();
        };

        $scope.showForm = function() {
            $mdDialog.show({
                scope: $scope,
                clickOutsideToClose: true,
                preserveScope: true, 
                templateUrl: '../view/newStudent.html',
                parent: angular.element(document.body)
            });
        };
    }
})();