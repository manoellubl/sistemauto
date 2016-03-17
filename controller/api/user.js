(function() {
    'use strict';

    module.exports = function (router) {
        var User = rootRequire('model/user.model');
        // TODO corrigir o workaround :D
        var Student = rootRequire('model/student.model');


        /**
         * Realiza o GET de Collection do Endpoint user.
         *
         * GET /api/user
         */
        router.get('/', function(request, response) {
            if (request.query !== undefined && request.query.name !== undefined) {
                var cursor = User.find({ 
                    name : {
                        '$regex': request.query.name
                    }
                });
                cursor.exec(function(error, data) {
                    response.json(data);
                });
            } else {
                var cursor = User.find(request.query);
                cursor.exec(function(error, data) {
                    response.json(data);
                });
            }
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
            if (validate_cnpj(user)) {
                user.save(function(error, data) {
                    if (error !== null) {
                        next(error);
                    } else {
                        response.status(201).json(data);
                    }
                });
            } else {
                response.status(400).json('CNPJ inválido');
            }
        });

        /**
         * Realiza o PUT de Resource do Endpoint user.
         *
         * PUT /api/user/:id
         */
        router.put('/:_id', function(request, response, next) {
            var id = request.params._id;
            if (validate_cnpj(request.body)) {
                var query =  User.findByIdAndUpdate(id, {$set: request.body}, {new: true});
                query.exec(function(error, data) {  
                    if (error !== null) {
                        next(error);
                    } else {
                        response.json(data);
                    }
                });
            } else {
                response.status(400).json('Erro de validação');
            }
        });

        // TODO MOVER
        function    validate_cnpj(user) {
            if (user.cnpj.length != 14) {
                return false;
            }
            
            for (var k = 0; k < 2; k++) {
                var factor = 2;
                var sum = 0;
                for (var i = 11 + k; i >= 0; i--) {
                    var d = parseInt(user.cnpj.charAt(i));
                    
                    if (isNaN(d)) {
                        return false;
                    }

                    sum += d * factor;
                    factor = (factor == 9 ? 2 : (factor + 1));
                }

                sum %= 11;
                
                if ((sum < 2 ? 0 : 11 - sum) != user.cnpj.charAt(12 + k)) {
                    return false;
                }
            }

            return true;
        }

        router.get('/:_idUser/student', function(request, response, next) {
            if (request.query !== undefined && request.query.name !== undefined) {
                var cursor = Student.find({
                    name : {
                        '$regex': request.query.name
                    },
                    user: request.params._idUser
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

        router.get('/:_idUser/student/:_idStudent', function(request, response, next) {
            var query = Student.findById(request.params._idStudent);
            query.exec(function(error, data) {
                if (error !== null) {
                    next(error);
                } else {
                    response.json(data);
                }
            });
        });

        router.post('/:_idUser/student', function(request, response, next) {
            var student = new Student(request.body);
            student.user = request.params._idUser;

            student.save(function(error, data) {
                if (error !== null) {
                    next(error);
                } else {
                    response.status(201).json(data);
                }
            });
        });

        router.put('/:_idUser/student/:_idStudent', function(request, response, next) {
            var student = request.body;
            var idStudent = request.params._idStudent;
            delete request.body._id;

            var query =  Student.findByIdAndUpdate(idStudent, {$set: student});
            query.exec(function(error, data) {
                if (error !== null) {
                    next(error);
                } else {
                    response.json(data);
                }
            });
        });

        router.delete('/:_idUser/student/:_idStudent', function(request, response, next) {
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
