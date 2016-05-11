(function() {
    'use strict';

    var router = require('express').Router();
    var Clazz = rootRequire('model/clazz.model');
    var util = rootRequire('module/util');

    var URI = '/api/user/:id_user/student/:id_student/clazz';

    /**
     * Obtém todas as aulas de uma auto escola
     */
    router.get('/api/user/:id_user/clazz', function(request, response, next) {
        var cursor = Clazz.find({
            'user': request.params.id_user
        });

        cursor.exec(function(error, data) {
            util.generic_response_callback(response, next, error, data);
        });
    });

    /**
     * Pega todas as aulas de um aluno
     */
    router.get(URI, function(request, response, next) {
        console.log("Get clazz student");
        var cursor = Clazz.find({
            'user': request.params.id_user,
            'student': request.params.id_student
        });

        cursor.exec(function(error, data) {
            console.log(data);
            util.generic_response_callback(response, next, error, data);
        });
    });

    /**
     * Cadastra um nova aula de um aluno
     */
    router.post(URI, function(request, response, next) {
        var clazz = new Clazz(request.body);
        clazz.user = request.params.id_user;
        clazz.student = request.params.id_student;

        clazz.save(function(error, data) {
            util.generic_response_callback(response, next, error, data);
        });
    });

    /**
     * Obtém uma aula específica de um aluno
     */
    router.get(URI + '/:id_clazz', function(request, response, next) {
        var cursor = Clazz.findById(request.params.id_clazz);
        cursor.exec(function(error, data) {
            util.generic_response_callback(response, next, error, data);
        });
    });

    /**
     * Atualiza uma aula específica
     */
    router.put(URI + '/:id_clazz', function(request, response, next) {
        console.log("cheguei");
        var cursor = Clazz.findByIdAndUpdate(request.params.id_clazz, {
            $set: request.body
        });
        cursor.exec(function(error, data) {
            util.generic_response_callback(response, next, error, data);
        });
    });

    router.delete(URI + '/:_id_clazz', function(request, response, next) {
        Clazz.remove({
            _id: request.params._id_clazz
        }, function(error, data) {
            util.generic_response_callback(response, next, error, data);
        });

    });

    module.exports = router;
})();