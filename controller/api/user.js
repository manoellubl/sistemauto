(function () {
    'use strict';

    var router = require('express').Router();
    var User = rootRequire('model/user.model');
    var emailModule = require('../../module/emailModule');
    var slackModule = require('../../module/slackModule');
    var util = rootRequire('module/util');

    /**
     * Realiza o GET de Collection do Endpoint user.
     *
     * GET /api/user
     */
    router.get('/api/user', function (request, response) {
        if (request.query !== undefined && request.query.name !== undefined) {
            var cursor = User.find({
                name: {
                    '$regex': request.query.name
                }
            });
            cursor.exec(function (error, data) {
                response.json(data);
            });
        } else {
            var cursor = User.find(request.query);
            cursor.exec(function (error, data) {
                response.json(data);
            });
        }
    });

    /**
     * Realiza o GET de Resource do Endpoint user.
     *
     * GET /api/user/:id
     */
    router.get('/api/user/:_id', function (request, response, next) {
        var id = request.params._id;
        var query = User.findById(id);
        query.exec(function (error, data) {
            if (error !== null) {
                if (error.message != undefined) {
                    error.message = util.repare_message(error.message);
                }
                next(error);
            } else {
                response.json(data);
            }
        });
    });

    /**
     * Realiza o POST de Resource do Endpoint user.
     *
     * POST /api/user
     */
    router.post('/api/user', function (request, response, next) {
        var user = new User(request.body);
        // remover e criptografar senha http://importjake.io/testing-express-routes-with-mocha-supertest-and-mock-goose/
        if (util.validate_cnpj(user.cnpj)) {
            user.save(function (error, data) {
                if (error !== null) {
                    if (error.message != undefined) {
                        error.message = util.repare_message(error.message);
                    }
                    next(error);
                } else {
                    response.status(201).json(data);
                    emailModule.sendEmail(data.email, data.name, 'Confirmação do cadastro, seja bem-vindo');
                    slackModule.reaction(data._id, data.email, data.name);
                }
            });
        } else {
            response.status(400).json({message: 'CNPJ inválido'});
        }
    });

    /**
     * Realiza o PUT de Resource do Endpoint user.
     *
     * PUT /api/user/:id
     */
    router.put('/api/user/:_id', function (request, response, next) {
        var id = request.params._id;

        if (util.validate_cnpj(request.body.cnpj)) {
            console.log('request.body', request.body);
            var cursor = User.findByIdAndUpdate(id, {
                    $set: request.body
                }, {
                    new: true
                });
            cursor.exec(function (error, data) {
                if (error !== null) {
                    if (error.message != undefined) {
                        console.log('error', error);
                        error.message = util.repare_message(error.message);
                    }
                    next(error);
                } else {
                    response.json(data);
                }
            });
        } else {
            response.status(400).json({message: 'CNPJ inválido'});
        }
    });

    router.use(require('./user/student'));
    router.use(require('./user/instructor'));
    router.use(require('./user/clazz'));

    module.exports = router;
}());
