(function () {
    'use strict';

    var router = require('express').Router();

    var jwt = require('jsonwebtoken');
    var User = rootRequire('model/user.model');
    var Student = rootRequire('model/student.model');
    var config = rootRequire('config/env.config.json')[process.env.NODE_ENV || 'development'];

    /**
     * Realiza o POST de Resource do Endpoint user.
     *
     * POST /api/login
     */
    router.post('/api/authenticate/login', function (request, response) {
        var email = request.body.email;
        
        console.log("Login");
        console.log(request.body);

        var query = User.findOne({
            email: email
        }).select('+password');

        query.exec(function (error, data) {
            if (data === null) {
                response.status(403).json({
                    message: 'Email ou senha incorretos'
                });
            } else if (data.password !== request.body.password) {
                response.status(403).json({
                    message: 'Email ou senha incorretos'
                });
            } else if (!data.confirmado) {
                response.status(403).json({
                    message: 'Sua conta ainda não foi liberada. Aguarde nosso contato! :)'
                });
            } else {
               setToken(data, response);
            }
        });
    });

    /**
     * Realiza o POST de Resource do Endpoint student
     *
     * POST /api/loginEstudante
     */
    router.post('/api/authenticate/loginEstudante', function (request, response) {
        var cpf = request.body.cpf;
        
        console.log("Login Estudante");
        console.log(request.body);

        var query = Student.findOne({
            cpf: cpf
        }).select('+password');

        query.exec(function (error, data) {
            console.log("---req----")
            console.log(data);
            if (data === null) {
                response.status(403).json({
                    message: 'Você não foi cadastrado ainda pela auto escola. Por favor entre em contato com a mesma.'
                });
            } else if (data.password !== request.body.password) {
                response.status(403).json({
                    message: 'Senha incorreta'
                });
            } else {
                setToken(data, response);
            }
        });
    });

    router.post('/api/authenticate/logout', function (request, response) {
        // lembrar de invalidar o token
        response.json({message: 'Logout done'});
    });

    /**
    * Função que seta o token e o id quando a requisição der certo.
    */
    function setToken(data, response){
        var token = jwt.sign(data, config.secret, {
            expiresIn: 144000 // 24 hours
        });
        response.json({
            token: token,
            id: data._id
        });
    };

    module.exports = router;
}());
