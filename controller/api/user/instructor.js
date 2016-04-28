(function() {
    'use strict';

    var router = require('express').Router();
    var Instructor = rootRequire('model/instructor.model');
    var util = rootRequire('module/util');

    var URI = '/api/user/:_idUser/instructor';

    /**
     * Obtém todos os instrutores de uma auto escola.
     * Se for passado parâmetros de busca, será realizada
     * uma filtragem.
     */
    router.get(URI, function(request, response, next) {
        var cursor = Instructor.find({
            user: request.params._idUser
        });
        cursor = buscaInstrutor(request, cursor);

        cursor.exec(function(error, data) {
            util.generic_response_callback(response, next, error, data);
        });
    });

    function buscaInstrutor(request, cursor) {
        if (request.query !== undefined && request.query.name !== undefined) {
            cursor = Instructor.find({
                $and: {
                    name : {
                        '$regex': request.query.name
                    },
                    instructor: request.params._idUser
                }
            });
        }
        return cursor;
    }

    /**
     * Obtém um instrutor específico
     */
    router.get(URI + '/:_idInstructor', function(request, response, next) {
        var cursor = Instructor.findById(request.params._idInstructor);
        cursor.exec(function(error, data) {
            util.generic_response_callback(response, next, error, data);
        });
    });

    /**
     * Cadastra um novo instrutor.
     */
    router.post(URI, function(request, response, next) {
        var instructor = new Instructor(request.body);
        instructor.user = request.params._idUser;

        instructor.save(function(error, data) {
            util.generic_response_callback(response, next, error, data);
        });
    });

    /**
     * Atualiza um instrutor específico.
     */
    router.put(URI + '/:_idInstructor', function(request, response, next) {
        var cursor = Instructor.findByIdAndUpdate(request.params._idInstructor, {
            $set: request.body
        });
        cursor.exec(function(error, data) {
            util.generic_response_callback(response, next, error, data);
        });
    });

    /**
     * Remove um instrutor específico.
     */
    router.delete(URI + '/:_idInstructor', function(request, response, next) {
        Instructor.remove({
            _id: request.params._idInstructor
        }, function(error, data) {
            util.generic_response_callback(response, next, error, data);
        });
    });

    module.exports = router;
})();