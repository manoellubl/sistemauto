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

        $scope.showForm = function() {
            $mdDialog.show({
                scope: $scope,
                templateUrl: '../view/newStudent.html',
                parent: angular.element(document.body)
            });
        };

        $scope.updateAddress = function(cep) {
            StudentService.getAddressByCep(cep).then(function(info) {
                $scope.student.city = info.data.localidade;
                $scope.student.address = info.data.logradouro + ', ' + info.data.bairro;
                $scope.student.state = info.data.uf;
                console.log(info);
            }, function(error) {
                console.log(error);
            });
        };
    }
})();