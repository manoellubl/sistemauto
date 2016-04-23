(function () {
    'use strict';

    var router = require('express').Router();

    var jwt = require('jsonwebtoken');
    var User = rootRequire('model/user.model');
    var config = rootRequire('config/env.config.json')[process.env.NODE_ENV || 'development'];

    /**
     * Realiza o POST de Resource do Endpoint user.
     *
     * POST /api/login
     */
    router.post('/api/authenticate/login', function (request, response) {
        var email = request.body.email;
        var type = request.body.type;
        if (type != undefined && type == "student") {
            var query = User.findOne({
                cpf: request.body.cpf
            });
        } else {
            var query = User.findOne({
                email: email
            }).select('+password');
        }


        query.exec(function (error, data) {
            if (data === null) {
                response.status(403).json({
                    //message: 'Authentication failed'
                    message: 'Email ou senha incorretos'
                });
            } else if (type === undefined && data.password !== request.body.password) {
                response.status(403).json({
                    //message: 'Wrong password'
                    message: 'Email ou senha incorretos'
                });
            } else if (!data.confirmado) {
                response.status(403).json({
                    message: 'Sua conta ainda não foi liberada. Aguarde nosso contato! :)'
                });
            } else {
                var token = jwt.sign(data, config.secret, {
                    expiresIn: 144000 // 24 hours
                });
                response.json({
                    token: token,
                    id: data._id
                });
            }
        });
    });

    router.post('/api/authenticate/logout', function (request, response) {
        // TODO avaliar como fazer isto corretamente
        // a lib nao tem como invalidar o token
        response.json({message: 'Logout done'});
    });

    module.exports = router;
}());
