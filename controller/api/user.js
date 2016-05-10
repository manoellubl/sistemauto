(function () {
    'use strict';

    var router = require('express').Router();
    var User = rootRequire('model/user.model');
    var emailModule = require('../../module/emailModule');
    var slackModule = require('../../module/slackModule');
    var util = rootRequire('module/util');

    var URI = '/api/user';

    /**
     * Realiza o GET de Collection do Endpoint user.
     *
     * GET /api/user
     */
    router.get(URI, function (request, response, next) {
        var cursor = User.find(request.query);
        if (request.query !== undefined && request.query.name !== undefined) {
            cursor = User.find({
                name: {
                    '$regex': request.query.name
                }
            });
        }
        cursor.exec(function (error, data) {
            util.generic_response_callback(response, next, error, data);
        });
    });

    /**
     * Realiza o GET de Resource do Endpoint user.
     *
     * GET /api/user/:id
     */
    router.get(URI + '/:_id', function (request, response, next) {
        var cursor = User.findById(request.params._id);
        cursor.exec(function (error, data) {
            util.generic_response_callback(response, next, error, data);
        });
    });

    /**
     * Realiza o POST de Resource do Endpoint user.
     *
     * POST /api/user
     */
    router.post(URI, function (request, response, next) {
        var user = new User(request.body);
        if (util.validate_cnpj(user.cnpj)) {
            user.save(function (error, data) {
                if (error !== null) {
                    if (error.message != undefined) {
                        error.message = util.repare_message(error.message);
                    }
                    next(error);
                } else {
                    var subject = 'Confirmação da conta';
                    var content = 'Confirmação do cadastro, seja bem-vindo! Aguarde liberação da conta para acessar.';
                    response.status(201).json(data);
                    emailModule.sendEmail(data.email, data.name, content, subject);
                    slackModule.reaction(data._id, data.email, data.name);
                }
            });
        } else {
            response.status(400).json({
                message: 'CNPJ inválido'
            });
        }
    });

    /**
     * Realiza o PUT de Resource do Endpoint user.
     *
     * PUT /api/user/:id
     */
    router.put(URI + '/:_id', function (request, response, next) {
        if (util.validate_cnpj(request.body.cnpj)) {
            var cursor = User.findByIdAndUpdate(request.params._id, {
                    $set: request.body
                }, {
                    new: true
                });
            cursor.exec(function (error, data) {
                util.generic_response_callback(response, next, error, data);
            });
        } else {
            response.status(400).json({
                message: 'CNPJ inválido'
            });
        }
    });

    // subrecurso de estudantes de uma auto escola
    router.use(require('./user/student'));

    // subrecurso de instrutores de uma auto escola
    router.use(require('./user/instructor'));

    // subrecurso de aulas de auto escola + estudantes
    router.use(require('./user/clazz'));

    module.exports = router;
}());
