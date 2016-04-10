(function() {
    'use strict';

    module.exports = function (router) {
        var User = rootRequire('model/user.model');
        // TODO corrigir o workaround :D
        var Student = rootRequire('model/student.model');
        var Instructor = rootRequire('model/instructor.model');
        var Clazz = rootRequire('model/clazz.model');

        var emailModule = require('../../module/emailModule');
        var slackModule = require('../../module/slackModule');

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
                    if(error.message != undefined) {
                        error.message = repare_message(error.message);
                    }
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
                        if(error.message != undefined) {
                            error.message = repare_message(error.message);
                        }
                        next(error);
                    } else {
                        response.status(201).json(data);
                        emailModule.sendEmail(data.email, data.name, 'Confirmação do cadastro, seja bem-vindo');
                        slackModule.reaction(data._id, data.email, data.name);
                    }
                });
            } else {
                response.status(400).json({message:'CNPJ inválido'});
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
                        if(error.message != undefined) {
                            error.message = repare_message(error.message);
                        }
                        next(error);
                    } else {
                        response.json(data);
                    }
                });
            } else {
                response.status(400).json({message:'CNPJ inválido'});
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
                            error.message = repare_message(error.message);
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
                            error.message = repare_message(error.message);
                        }
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
                    if(error.message != undefined) {
                        error.message = repare_message(error.message);
                    }
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
                    if(error.message != undefined) {
                        error.message = repare_message(error.message);
                    }
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
                    if(error.message != undefined) {
                        error.message = repare_message(error.message);
                    }
                    next(error);
                } else {
                    response.json(data);
                }
            });
        });

        router.delete('/:_idUser/student/:_idStudent', function(request, response, next) {
            var id = request.params._idStudent;
            Student.remove({_id: id}, function(error, data) {
                if (error != null) {
                    if(error.message != undefined) {
                        error.message = repare_message(error.message);
                    }
                    next(error);
                } else {
                    // TODO
                    response.json({});
                }
            });
        });


        router.get('/:_idUser/instructor', function(request, response, next) {
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
                            error.message = repare_message(error.message);
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
                            error.message = repare_message(error.message);
                        }
                        next(error);
                    } else {
                        response.json(data);
                    }
                });
            }
        });

        router.get('/:_idUser/instructor/:_idInstructor', function(request, response, next) {
            var query = Instructor.findById(request.params._idInstructor);
            query.exec(function(error, data) {
                if (error !== null) {
                    if(error.message != undefined) {
                        error.message = repare_message(error.message);
                    }
                    next(error);
                } else {
                    response.json(data);
                }
            });
        });

        router.post('/:_idUser/instructor', function(request, response, next) {
            console.log("entrou no post");
            var instructor = new Instructor(request.body);
            instructor.user = request.params._idUser;

            instructor.save(function(error, data) {
                if (error !== null) {
                    if(error.message != undefined) {
                        error.message = repare_message(error.message);
                    }
                    next(error);
                } else {
                    response.status(201).json(data);
                }
            });
        });

        router.put('/:_idUser/instructor/:_idInstructor', function(request, response, next) {
            var instructor = request.body;
            var idInstructor = request.params._idInstructor;
            delete request.body._id;

            var query =  Instructor.findByIdAndUpdate(idInstructor, {$set: instructor});
            query.exec(function(error, data) {
                if (error !== null) {
                    if(error.message != undefined) {
                        error.message = repare_message(error.message);
                    }
                    next(error);
                } else {
                    response.json(data);
                }
            });
        });

        router.delete('/:_idUser/instructor/:_idInstructor', function(request, response, next) {
            var id = request.params._idInstructor;
            Instructor.remove({_id: id}, function(error, data) {
                if (error != null) {
                    if(error.message != undefined) {
                        error.message = repare_message(error.message);
                    }
                    next(error);
                } else {
                    // TODO
                    response.json({});
                }
            });
        });

        router.get('/:id_user/clazz', function(request, response, next) {
            var cursor = Clazz.find({
                'user': request.params.id_user
            });

            cursor.exec(function(error, data) {
                if (error !== null) {
                    if(error.message != undefined) {
                        error.message = repare_message(error.message);
                    }
                    next(error);
                } else {
                    response.json(data);
                }
            });
        });

        router.get('/:id_user/student/:id_student/clazz', function(request, response, next) {
            var id_user = request.params.id_user;
            var id_student = request.params.id_student;

            var cursor = Clazz.find({
                'user': id_user,
                'student': id_student
            });

            cursor.exec(function(error, data) {
                if (error !== null) {
                    if(error.message != undefined) {
                        error.message = repare_message(error.message);
                    }
                    next(error);
                } else {
                    response.json(data);
                }
            });
        });

        router.post('/:id_user/student/:id_student/clazz', function(request, response, next) {
            var id_user = request.params.id_user;
            var id_student = request.params.id_student;

            var clazz = new Clazz(request.body);
            clazz.user = id_user;
            clazz.student = id_student;

            clazz.save(function(error, data) {
                if (error !== null) {
                    if(error.message != undefined) {
                        error.message = repare_message(error.message);
                    }
                    next(error);
                } else {
                    response.status(201).json(data);
                }
            });
        });

        router.get('/:id_user/student/:id_student/clazz/:id_clazz', function(request, response, next) {
            var cursor = Clazz.findById(request.params.id_clazz);
            cursor.exec(function(error, data) {
                if (error !== null) {
                    if(error.message != undefined) {
                        error.message = repare_message(error.message);
                    }
                    next(error);
                } else {
                    response.json(data);
                }
            });
        });

        router.put('/:id_user/student/:id_student/clazz/:id_clazz', function(request, response, next) {
            var id_user = request.params.id_user;
            var id_student = request.params.id_student;
            var id_clazz = request.params.id_clazz;
            delete request.body._id;

            var cursor = Clazz.findByIdAndUpdate(id_clazz, {$set: request.body});
            cursor.exec(function(error, data) {
                if (error !== null) {
                    if(error.message != undefined) {
                        error.message = repare_message(error.message);
                    }
                    next(error);
                } else {
                    response.json(data);
                }
            });
        });

        function repare_message(message) {
            var dupkey = 'E11000';
            
            if(message.indexOf(dupkey) > -1) {
                console.log("DUPKEY FOUND");
                if(message.indexOf('cpf_1') > -1) {
                    return "CPF já cadastrado";
                }
                if(message.indexOf('rg_1') > -1) {
                    return "RG já cadastrado";
                }
                if(message.indexOf('email_1') > -1) {
                    return "Email já cadastrado";
                }
                if(message.indexOf('cnpj_1') > -1) {
                    return "CNPJ já cadastrado";
                }
            }

            return message;
        }

    };

}());
