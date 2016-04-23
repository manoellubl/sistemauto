(function() {
    'use strict';

    var router = require('express').Router();
    var Student = rootRequire('model/student.model');
    var util = rootRequire('module/util');

    router.get('/api/user/:_idUser/student', function(request, response, next) {
        console.log("entrou");
        if (request.query !== undefined && request.query.name !== undefined) {
            console.log('ok');
            var query = {
                $and: {
                    name : {
                        '$regex': request.query.name
                    },
                    user: request.params._idUser
                }
            };
            var cursor = Student.find(query);
            console.log('dados', query);
            cursor.exec(function(error, data) {
                if (error !== null) {
                    if(error.message != undefined) {
                        error.message = util.util.repare_message(error.message);
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
            var cursor = Student.find({
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

    router.get('/api/user/:_idUser/student/:_idStudent', function(request, response, next) {
        var query = Student.findById(request.params._idStudent);
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

    router.post('/api/user/:_idUser/student', function(request, response, next) {
        var student = new Student(request.body);
        student.user = request.params._idUser;

        student.save(function(error, data) {
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

    router.put('/api/user/:_idUser/student/:_idStudent', function(request, response, next) {
        var student = request.body;
        var idStudent = request.params._idStudent;
        delete request.body._id;

        var query =  Student.findByIdAndUpdate(idStudent, {$set: student});
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

    router.delete('/api/user/:_idUser/student/:_idStudent', function(request, response, next) {
        var id = request.params._idStudent;
        Student.remove({_id: id}, function(error, data) {
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