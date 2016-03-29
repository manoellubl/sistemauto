(function() {
    'use strict';

    module.exports = function (router) {
        var Instructor = rootRequire('model/instructor.model');

        router.get('/', function(request, response) {
            if (request.query !== undefined && request.query.name !== undefined) {
                var cursor = Instructor.find({
                    name : {
                        '$regex': request.query.name
                    }
                });
                cursor.exec(function(error, data) {
                    response.json(data);
                });
            } else {
                var cursor = Instructor.find(request.query);
                cursor.exec(function(error, data) {
                    response.json(data);
                });
            }
        });

        router.get('/:_id', function(request, response, next) {
            var id = request.params._id;
            var query = Instructor.findById(id);
            query.exec(function(error, data) {
                if (error !== null) {
                    next(error);
                } else {
                    response.json(data);
                }
            });
        });

        router.post('/', function(request, response, next) {
            var student = new Instructor(request.body);
            student.save(function(error, data) {
                if (error !== null) {
                    next(error);
                } else {
                    response.status(201).json(data);
                }
            });
        });

        router.put('/:_id', function(request, response, next) {
            var id = request.params._id;
            var query =  Instructor.findByIdAndUpdate(id, {$set: request.body}, {new: true});
            query.exec(function(error, data) {
                if (error !== null) {
                    next(error);
                } else {
                    response.json(data);
                }
            });
        });

        router.delete('/:_id', function(request, response, next) {
            var id = request.params._id;
            Instructor.remove({_id: id}, function(error) {
                if (error != null) {
                    next(error);
                } else {
                    // TODO
                    response.json({});
                }
            });
        });
    };
}());
