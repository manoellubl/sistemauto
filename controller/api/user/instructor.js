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
                    if(error.message != undefined) {
                        error.message = repare_message(error.message);
                    }
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
                    if(error.message != undefined) {
                        error.message = repare_message(error.message);
                    }
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
                    if(error.message != undefined) {
                        error.message = repare_message(error.message);
                    }
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
