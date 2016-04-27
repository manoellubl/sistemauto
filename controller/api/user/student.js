(function () {
    'use strict';

    var router = require('express').Router();
    var Student = rootRequire('model/student.model');
    var util = rootRequire('module/util');
    var emailModule = require('../../../module/emailModule');

    var URI = '/api/user/:_idUser/student';

    /**
     * Obtém todos os estudantes de uma auto escola
     */
    router.get(URI, function (request, response, next) {
        var cursor = Student.find({
            user: request.params._idUser
        });
        cursor = buscaStudent(request, cursor);
        cursor.exec(function (error, data) {
            util.generic_response_callback(response, next, error, data);
        });
    });

    function buscaStudent(request, cursor) {
        if (request.query !== undefined && request.query.name !== undefined) {
            cursor = Student.find({
                $and: {
                    name: {
                        '$regex': request.query.name
                    },
                    user: request.params._idUser
                }
            });
        }
        return cursor;
    }

    /**
     * Obtém um estudante específico de uma auto escola
     */
    router.get(URI + '/:_idStudent', function (request, response, next) {
        var cursor = Student.findById(request.params._idStudent);
        cursor.exec(function (error, data) {
            util.generic_response_callback(response, next, error, data);
        });
    });

    /**
     * Cadastra um novo estudante em uma auto escola
     */
    router.post(URI, function (request, response, next) {
        var student = new Student(request.body);
        student.user = request.params._idUser;
        student.password = (request.params._idUser).slice(0,8);

        student.save(function (error, data) {
            if (error !== null) {
                if (error.message !== undefined) {
                    error.message = util.repare_message(error.message);
                }
                next(error);
            } else {
                var subject = 'Autorização de login no aplicativo Sistemauto';
                var content = 'Você acaba de ser cadastrado no nosso sistema pela sua auto escola, seja bem-vindo(a)! ' +
                                'Sua chave de acesso é: ' + data.password + '.' 
                response.status(201).json(data);
                emailModule.sendEmail(data.email, data.name, content, subject);
            }
        });
    });

    /**
     * Atualiza um estudante específico de uma auto escola
     */
    router.put(URI + '/:_idStudent', function (request, response, next) {
        var cursor = Student.findByIdAndUpdate(request.params._idStudent, {
            $set: request.body
        });
        cursor.exec(function (error, data) {
            util.generic_response_callback(response, next, error, data);
        });
    });

    /**
     * Remove um estudante específico de uma auto escola
     */
    router.delete(URI + '/:_idStudent', function (request, response, next) {
        Student.remove({
            _id: request.params._idStudent
        }, function (error, data) {
            util.generic_response_callback(response, next, error, data);
        });
    });

    module.exports = router;
})();