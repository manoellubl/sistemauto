(function() {
    'use strict';

    module.exports = function (router) {
        var jwt = require('jsonwebtoken');
        var User = rootRequire('model/user.model');
        var config = rootRequire('config/env.config.json')[process.env.NODE_ENV || 'development'];

        /**
         * Realiza o POST de Resource do Endpoint user.
         *
         * POST /api/login
         */
        router.post('/login', function(request, response) {
            var email = request.body.email;
            
            var query = User.findOne({
                email: email
            }).select('+password');

            query.exec(function(error, data) {
                if (data === null) {
                    response.status(403).json({
                        message: 'Authentication failed'
                    });
                } else if (data.password !== request.body.password) {    
                    response.status(403).json({
                        message: 'Wrong password'
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

        router.post('/logout', function(request, response) {
            // TODO avaliar como fazer isto corretamente
            // a lib nao tem como invalidar o token
            response.json({message: 'Logout done'});
        });
    };
}());
