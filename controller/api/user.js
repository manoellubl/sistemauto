(function() {
    'use strict';

    module.exports = function (router) {
        var User = rootRequire('model/user.model');

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
        router.get('/:_id', function(request, response) {
            var id = request.params._id;
            var query = User.findById(id);
            query.exec(function(error, data) {
                response.json(data);
            });
        });

        /**
         * Realiza o POST de Resource do Endpoint user.
         *
         * POST /api/user
         */
        router.post('/', function(request, response, next) {
            var user = new User(request.body);

            user.save(function(error, data) {
                if (error !== null) {
                    next(error);
                } else {
                    response.json(data);
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
