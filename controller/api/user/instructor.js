(function() {
    'use strict';

    var router = require('express').Router();

    var Instructor = rootRequire('model/instructor.model');

    var util = rootRequire('module/util');

    router.get('/api/user/:_idUser/instructor', function(request, response, next) {
        console.log("entrou");
        if (request.query !== undefined && request.query.name !== undefined) {
            console.log('ok');
            var query = {
                $and: {
                    name : {
                        '$regex': request.query.name
                    },
                    instructor: request.params._idUser
                }
            };
            var cursor = Instructor.find(query);
            console.log('dados', query);
            cursor.exec(function(error, data) {
                if (error !== null) {
                    if(error.message != undefined) {
                        error.message = util.repare_message(error.message);
                    }
                    next(error)
                } else {
                    console.log(">>>>>>>>>>>>>>>>>");
                    console.log(data);
                    console.log(">>>>>>>>>>>>>>>>>");
                    response.json(data);
                }
            });
        } else {
            var cursor = Instructor.find({
                user: request.params._idUser
            });
            cursor.exec(function(error, data) {
                if (error !== null) {
                    if(error.message != undefined) {
                        error.message = util.repare_message(error.message);
                    }
                    next(error);
                } else {
                    response.json(data);
                }
            });
        }
    });

    router.get('/api/user/:_idUser/instructor/:_idInstructor', function(request, response, next) {
        var query = Instructor.findById(request.params._idInstructor);
        query.exec(function(error, data) {
            if (error !== null) {
                if(error.message != undefined) {
                    error.message = util.repare_message(error.message);
                }
                next(error);
            } else {
                response.json(data);
            }
        });
    });

    router.post('/api/user/:_idUser/instructor', function(request, response, next) {
        console.log("entrou no post");
        var instructor = new Instructor(request.body);
        instructor.user = request.params._idUser;

        instructor.save(function(error, data) {
            if (error !== null) {
                if(error.message != undefined) {
                    error.message = util.repare_message(error.message);
                }
                next(error);
            } else {
                response.status(201).json(data);
            }
        });
    });

    router.put('/api/user/:_idUser/instructor/:_idInstructor', function(request, response, next) {
        var instructor = request.body;
        var idInstructor = request.params._idInstructor;
        delete request.body._id;

        var query =  Instructor.findByIdAndUpdate(idInstructor, {$set: instructor});
        query.exec(function(error, data) {
            if (error !== null) {
                if(error.message != undefined) {
                    error.message = util.repare_message(error.message);
                }
                next(error);
            } else {
                response.json(data);
            }
        });
    });

    router.delete('/api/user/:_idUser/instructor/:_idInstructor', function(request, response, next) {
        var id = request.params._idInstructor;
        Instructor.remove({_id: id}, function(error, data) {
            if (error != null) {
                if(error.message != undefined) {
                    error.message = util.repare_message(error.message);
                }
                next(error);
            } else {
                // TODO
                response.json({});
            }
        });
    });

    module.exports = router;
})();