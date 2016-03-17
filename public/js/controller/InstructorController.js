(function() {

    'use strict';

    /**
     * Controller responsável pela view dos instrutores.
     */
    angular.module('app').controller('InstructorController', [
        '$scope',
        '$mdDialog',
        'InstructorService',
        InstructorController
    ]);

    function InstructorController($scope, $mdDialog, InstructorService) {

        $scope.cnhtypes = [
            {type: "A"},
            {type: "B"},
            {type: "AB"},
            {type: "C"},
            {type: "D"},
            {type: "E"}
        ];

        $scope.updateList = function() {

            InstructorService.getInstructors().then(function(info) {
                $scope.instructors.splice(0, $scope.instructors.length);
                $scope.instructors.push.apply($scope.instructors, info.data);
                console.log($scope.instructors);
            });
        }

        $scope.instructors = [];
        $scope.updateList();

        $scope.register = function() {
            if ($scope.instructor._id === undefined) {
                InstructorService.postInstructor($scope.instructor).then(function(info) {
                    $scope.closeForm();
                    $scope.updateList();
                }, function(error) {
                    console.log(error);
                });
            } else {
                InstructorService.updateInstructor($scope.instructor).then(function(info) {
                    $scope.closeForm();
                    $scope.updateList();
                }, function(error) {
                    console.log(error);
                });
            }



        };

        $scope.closeForm = function() {
            $mdDialog.hide();
            $scope.instructor = {};
        };

        $scope.removeInstructor = function(id) {
            InstructorService.removeInstructor(id).then(function(info) {
                $scope.updateList();
            }, function(error) {

            });
        };

        $scope.update = function(id) {
            InstructorService.getInstructor(id).then(function(info) {
                $scope.instructor = info.data;
                $scope.showForm();
            }, function(error) {

            });
        };

        $scope.showForm = function() {
            $mdDialog.show({
                scope: $scope,
                clickOutsideToClose: true,
                preserveScope: true,
                templateUrl: '../view/newInstructor.html',
                parent: angular.element(document.body)
            });
        };

        $scope.updateAddress = function(cep) {
            InstructorService.getAddressByCep(cep).then(function(info) {
                $scope.instructor.address = info.data.logradouro;
                $scope.instructor.neighborhood = info.data.bairro;
                $scope.instructor.city = info.data.localidade;
                $scope.instructor.state = info.data.uf;
            }, function(error) {
                console.log(error);
            });
        };
    }
})();
