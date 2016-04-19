(function() {
    'use strict';

    module.exports = function (router) {
        var jwt = require('jsonwebtoken');
        var Student = rootRequire('model/student.model');
        var config = rootRequire('config/env.config.json')[process.env.NODE_ENV || 'development'];

        /**
         * Realiza o POST de Resource do Endpoint student.
         *
         * POST /api/login
         */
        router.post('/login', function(request, response) {
            var email = request.body.email;
            var query = Student.findOne({
                email: email
            });

            query.exec(function(error, data) {
                console.log(error);
                console.log(data);
                if (data === null) {
                    response.status(403).json({
                        message: 'Email ou senha incorretos3'
                    });
                } else {
                    var token = jwt.sign(data, config.secret, {
                        expiresIn: 144000 // 24 hours
                    });
                    response.json(data);
                }
            });
        });

        router.post('/logout', function(request, response) {
            // TODO avaliar como fazer isto corretamente
            // a lib nao tem como invalidar o token
            response.json({message: 'Logout done'});
        });
    };
}());
