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
        
        $scope.instructors = [];

        $scope.loadPage = function(){
            InstructorService.getInstructors().then(function(info) {
                $scope.instructors.splice(0, $scope.instructors.length);
                $scope.instructors.push.apply($scope.instructors, info.data);
                console.log($scope.instructors);
            });
        };

        $scope.loadPage();

        $scope.register = function() {
            InstructorService.postInstructor($scope.instructor).then(function(info) {
                $scope.closeForm();
                $scope.loadPage();
                delete $scope.instructor;
            }, function(error) {
                console.log(error);
            });
        };

        $scope.closeForm = function() {
            $mdDialog.hide();
        };

        $scope.showForm = function() {
            $mdDialog.show({
                clickOutsideToClose: true,
                preserveScope: true,
                scope: $scope,
                templateUrl: '../view/newInstructor.html',
                parent: angular.element(document.body)
            });
        };

        $scope.updateAddress = function(cep) {
            InstructorService.getAddressByCep(cep).then(function(info) {
                $scope.instructor.city = info.data.localidade;
                $scope.instructor.address = info.data.logradouro + ', ' + info.data.bairro;
                $scope.instructor.state = info.data.uf;
                console.log(info);
            }, function(error) {
                console.log(error);
            });
        };
    }
})();