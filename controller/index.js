(function() {
    'use strict';

    module.exports = function(router) {
        var jwt = require('jsonwebtoken');
        var config = rootRequire('config/env.config.json')[process.env.NODE_ENV || 'development'];

        router.use(function(request, response, next) {
            var token = request.body.token || request.query.token || request.headers['x-access-token'];

            var hasToken = token !== null && token !== undefined;
            var isAuthentication = request.originalUrl === "/api/authenticate/login";
            var isCreatingUser = request.url === "/api/user" && request.method === "POST";
            var isGetUsers = request.originalUrl.indexOf("/api/user") !== -1 && request.method === "GET";
            var isActivate = request.originalUrl.indexOf("/api/activate") !== -1 && request.method === "GET";
            
            if (isAuthentication || isCreatingUser || request.url == "/" || isGetUsers || isActivate) {
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
    };
}());
