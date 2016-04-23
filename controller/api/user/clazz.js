(function() {
    'use strict';

    var router = require('express').Router();
    var Clazz = rootRequire('model/clazz.model');
    var util = rootRequire('module/util');

    router.get('/api/user/:id_user/clazz', function(request, response, next) {
        var cursor = Clazz.find({
            'user': request.params.id_user
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
    });

    router.get('/api/user/:id_user/student/:id_student/clazz', function(request, response, next) {
        var id_user = request.params.id_user;
        var id_student = request.params.id_student;

        var cursor = Clazz.find({
            'user': id_user,
            'student': id_student
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
    });

    router.post('/api/user/:id_user/student/:id_student/clazz', function(request, response, next) {
        var id_user = request.params.id_user;
        var id_student = request.params.id_student;

        var clazz = new Clazz(request.body);
        clazz.user = id_user;
        clazz.student = id_student;

        clazz.save(function(error, data) {
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

    router.get('/api/user/:id_user/student/:id_student/clazz/:id_clazz', function(request, response, next) {
        var cursor = Clazz.findById(request.params.id_clazz);
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
    });

    router.put('/api/user/:id_user/student/:id_student/clazz/:id_clazz', function(request, response, next) {
        var id_user = request.params.id_user;
        var id_student = request.params.id_student;
        var id_clazz = request.params.id_clazz;
        delete request.body._id;

        var cursor = Clazz.findByIdAndUpdate(id_clazz, {$set: request.body});
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
    });

    module.exports = router;
})();