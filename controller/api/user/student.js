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
                        if(error.message.data != undefined) {
                            error.message.data = repare_message(error.message.data);
                        }
                        next(error)
                    } else {
                        response.json(data);
                    }
                });
            } else {
                var cursor = Student.find(request.query);
                cursor.exec(function(error, data) {
                    if (error !== null) {
                        if(error.message.data != undefined) {
                            error.message.data = repare_message(error.message.data);
                        }
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
                    if(error.message.data != undefined) {
                        error.message.data = repare_message(error.message.data);
                    }
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
                    if(error.message.data != undefined) {
                        error.message.data = repare_message(error.message.data);
                    }
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
                    if(error.message.data != undefined) {
                        error.message.data = repare_message(error.message.data);
                    }
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
                    if(error.message.data != undefined) {
                        error.message.data = repare_message(error.message.data);
                    }
                    next(error);
                } else {
                    // TODO
                    response.json({});
                }
            });
        });

        function repare_message(message) {
            var dupkey = 'E11000';
            
            if(message.indexOf(dupkey) > -1) {
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
