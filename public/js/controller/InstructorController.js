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

        InstructorService.getInstructors().then(function(info) {
            $scope.instructors.splice(0, $scope.instructors.length);
            $scope.instructors.push.apply($scope.instructors, info.data);
        });

        $scope.register = function() {
            InstructorService.postInstructor($scope.instructor).then(function(info) {
            }, function(error) {
                console.log(error);
            });
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

    }
})();