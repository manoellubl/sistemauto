(function() {

    'use strict';

    /**
     * Controller responsável pela view dos alunos.
     */
    angular.module('app').controller('StudentController', [
        '$scope',
        '$mdDialog',
        '$mdMedia',
        'StudentService',
        'MensagemService',
        StudentController
    ]);

    function StudentController($scope, $mdDialog, $mdMedia, StudentService, MensagemService) {
        $scope.cnhtypes = [
            {type: "A"},
            {type: "B"},
            {type: "AB"},
            {type: "C"},
            {type: "D"},
            {type: "E"}
        ];
        
        $scope.updateList = function() {
            StudentService.getStudents().then(function(info) {
                $scope.students.splice(0, $scope.students.length);
                $scope.students.push.apply($scope.students, info.data);
            });
        };

        $scope.students = [];
        $scope.updateList();
        
        /**
        * Faz a requisição para registrar ou atualizar um aluno
        */
        $scope.register = function() {
            $scope.student.birthDateTimestamp = $scope.student.birthDate.getTime();
            
            if ($scope.student._id === undefined) {
                StudentService.postStudent($scope.student).then(function(info) {
                    $scope.closeForm();
                    $scope.updateList();
                    MensagemService.msg("Aluno cadastrado com sucesso!");
                }, function(error) {
                    if (error.data.message != undefined) {
                        MensagemService.msg(error.data.message);
                    }
                });
            } else {
                StudentService.updateStudent($scope.student).then(function(info) {
                    $scope.closeForm();
                    $scope.updateList();
                    MensagemService.msg("Aluno atualizado com sucesso!");
                }, function(error) {
                    if (error.data.message != undefined) {
                        MensagemService.msg(error.data.message);
                    }
                });
            }
        };

        $scope.update = function(id) {
            StudentService.getStudent(id).then(function(info) {
                $scope.student = info.data;
                $scope.student.birthDate = new Date($scope.student.birthDateTimestamp);
                
                $scope.showForm();
            }, function(error) {
                if (error.data.message != undefined) {
                    MensagemService.msg(error.data.message);
                }
            });
        };

        $scope.closeForm = function() {
            $mdDialog.hide();
            $scope.student = {};
        };

        /**
        * Adiciona um aluno
        */
        $scope.addStudent = function() {
            $scope.student = {};
            $scope.showForm();
        };

        /**
        * Remove um aluno
        */
        $scope.removerStudent = function(id, ev) {
            ev.stopPropagation();

            StudentService.removeStudent(id).then(function(info) {
                $scope.updateList();
                MensagemService.msg("Aluno removido com sucesso!");
            }, function(error) {
                if (error.data.message != undefined) {
                    MensagemService.msg(error.data.message);
                }
            });
        };

        /**
        * Modal para inserir um novo aluno
        */
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
                console.log("info sucesso", info);
            }, function(error) {
                if(error.data.message != undefined) {
                    MensagemService.msg(error.data.message);
                }
            });
        };


        $scope.updateDatas = function(id) {
            StudentService.getStudent(id).then(function(info) {
                $scope.student = info.data;                
            }, function(error) {
                if (error.data.message != undefined) {
                    MensagemService.msg(error.data.message);
                }
            });
        };

        /**
        * Modal que adiciona datas nos exames do aluno
        */
        $scope.adicionarProvas = function(id, ev) {
            ev.stopPropagation();
            $scope.updateDatas(id);
            $mdDialog.show({
                scope: $scope,
                clickOutsideToClose: true,
                preserveScope: true, 
                templateUrl: '../view/dataExames.html',
                parent: angular.element(document.body),
            });
        };

        $scope.salvarDatasExames = function(id){
            StudentService.updateStudent($scope.student).then(function(info) {
                MensagemService.msg("Exames cadastrados com sucesso!");
                $mdDialog.hide();
            }, function(error) {
                if (error.data.message != undefined) {
                    MensagemService.msg(error.data.message);
                }
            });
        };
    }
})();