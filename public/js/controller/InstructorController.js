(function() {

    'use strict';

    /**
     * Controller responsável pela view dos instrutores.
     */
    angular.module('app').controller('InstructorController', [
        '$scope',
        InstructorController
    ]);

    function InstructorController($scope) {

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