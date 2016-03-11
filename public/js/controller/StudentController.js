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
                $scope.closeForm();
                $scope.updateList();
            }, function(error) {
                console.log(error);
            });
        };
        $scope.update = function(id) {
            /*StudentService.updateStudent($scope.student).then(function(info) {
            }, function(error) {
                console.log(error);
            });*/
        };

        $scope.updateList = function() {
            StudentService.getStudents().then(function(info) {
                $scope.students.splice(0, $scope.students.length);
                $scope.students.push.apply($scope.students, info.data);
            });
        };

        $scope.closeForm = function() {
            $mdDialog.hide();
            $scope.student = {};
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

        $scope.updateAddress = function(cep) {
            StudentService.getAddressByCep(cep).then(function(info) {
                $scope.student.address = info.data.logradouro;
                $scope.student.neighborhood = info.data.bairro;
                $scope.student.city = info.data.localidade;
                $scope.student.state = info.data.uf;
                console.log(info);
            }, function(error) {
                console.log(error);
            });
        };
    }
})();