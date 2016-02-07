(function() {
    'use strict';

    module.exports = function (router) {
        var User = rootRequire('model/user.model');
		var encrypt = require('mongoose-encryption');

        /**
         * Realiza o GET de Collection do Endpoint user.
         *
         * GET /api/user
         */
        router.get('/', function(request, response) {
            var query = User.find();
            query.exec(function(error, data) {
                response.json(data);
            });
        });

        /**
         * Realiza o GET de Resource do Endpoint user.
         *
         * GET /api/user/:id
         */
        router.get('/:_id', function(request, response, next) {
            var id = request.params._id;
            var query = User.findById(id);
            query.exec(function(error, data) {
				if (error !== null) {
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
        router.post('/', function(request, response, next) {
            var user = new User(request.body);
			// remover e criptografar senha http://importjake.io/testing-express-routes-with-mocha-supertest-and-mock-goose/
            user.save(function(error, data) {
                if (error !== null) {
                    next(error);
                } else {
                    response.status(201).json(data);
                }
            });
        });

        /**
         * Realiza o PUT de Resource do Endpoint user.
         *
         * PUT /api/user/:id
         */
        router.put('/:_id', function(request, response, next) {
            var id = request.params._id;
            var query =  User.findByIdAndUpdate(id, {$set: request.body}, {new: true});
            query.exec(function(error, data) {	
                if (error !== null) {
                    next(error);
                } else {
                    response.json(data);
                }
            });
        });
    };
}());
