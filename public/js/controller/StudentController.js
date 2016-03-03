(function() {

    'use strict';

    /**
     * Controller responsável pela view dos alunos.
     */
    angular.module('app').controller('StudentController', [
        '$scope',
        '$mdDialog',
        StudentController
    ]);

    function StudentController($scope, $mdDialog) {
        $scope.showForm = function() {
            $mdDialog.show({
                controller: novoAlunoController,
                templateUrl: '../view/newStudent.html',
                parent: angular.element(document.body)
            });
        };

        /**
         * Controller para o modal de cadastro de aluno
         */
        function novoAlunoController($scope) {
        };
    }
})();