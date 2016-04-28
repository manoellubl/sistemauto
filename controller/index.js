(function() {
    'use strict';

    var router = require('express').Router();

    var jwt = require('jsonwebtoken');
    var config = rootRequire('config/env.config.json')[process.env.NODE_ENV || 'development'];

    router.use(function(request, response, next) {
        var token = request.body.token || request.query.token || request.headers['x-access-token'];

        var hasToken = token !== null && token !== undefined;
        var isAuthentication = request.originalUrl === '/api/authenticate/login' || request.originalUrl === '/api/authenticate/loginEstudante';
        var isCreatingUser = request.url === '/api/user' && request.method === 'POST';
        var isGetUsers = request.originalUrl.indexOf('/api/user') !== -1 && request.method === 'GET';
        var isActivate = request.originalUrl.indexOf('/api/activate') !== -1 && request.method === 'GET';
        var isLogout = request.originalUrl.indexOf('/api/authenticate/logout') !== -1 && request.method === 'POST';

        if (isAuthentication || isCreatingUser || request.url === '/' || isGetUsers || isActivate || isLogout) {
            next();
        } else if (hasToken) {
            jwt.verify(token, config.secret, function(err, decoded) {
                if (err) {
                    return response.status(403).json({message: 'Failed to authenticate token.'});
                } else {
                    var usuario = decoded._doc;
                    request.body.user = usuario._id;
                    request.body.userName = usuario.name;
                    request.body.userEmail = usuario.email;
                    next();
                }
            });
        } else {
            return response.status(403).json({message: 'Token not provided.'});
        }
    });

    /* GET home page. */
    router.get('/', function(request, response) {
        response.render('index');
    });

    // recurso de autenticacao
    router.use(require('./api/authenticate'));

    // recurso de ativação de auto escolas
    router.use(require('./api/activate'));

    // recurso de auto escolas
    router.use(require('./api/user'));

    module.exports = router;
}());
