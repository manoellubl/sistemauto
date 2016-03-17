(function() {
    'use strict';

    module.exports = function (router) {
        var Student = rootRequire('model/student.model');

        router.get(':_id/', function(request, response, next) {
            if (request.query !== undefined && request.query.name !== undefined) {
                var cursor = Student.find({
                    name : {
                        '$regex': request.query.name
                    }
                });
                cursor.exec(function(error, data) {
                    if (error !== null) {
                        next(error)
                    } else {
                        response.json(data);
                    }
                });
            } else {
                var cursor = Student.find(request.query);
                cursor.exec(function(error, data) {
                    if (error !== null) {
                        next(error);
                    } else {
                        response.json(data);
                    }
                });
            }
        });

        router.get('/:_id', function(request, response, next) {
            var id = request.params._id;
            var query = Student.findById(id);
            query.exec(function(error, data) {
                if (error !== null) {
                    next(error);
                } else {
                    response.json(data);
                }
            });
        });

        router.post('/', function(request, response, next) {
            var student = new Student(request.body);
            student.save(function(error, data) {
                console.log("aqui");
                console.log(error);
                if (error !== null) {
                    next(error);
                } else {
                    response.status(201).json(data);
                }
            });
        });

        router.put('/:_id', function(request, response, next) {
            var id = request.params._id;
            var query =  Student.findByIdAndUpdate(id, {$set: request.body}, {new: true});
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
            Student.remove({_id: id}, function() {
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
