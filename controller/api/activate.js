(function () {

    'use strict';

    var router = require('express').Router();
    var User = rootRequire('model/user.model');
    var emailSender = require('../../module/emailModule');

    router.get('/api/activate', function (request, response, next) {
        var hash = request.query.hash;
        var cursor = User.findByIdAndUpdate(hash, {
            $set: {
                confirmado: true
            }
        }, {
            new: true
        });
        cursor.exec(function (error, data) {
            if (error !== null) {
                next(error);
            } else {
                var subject = 'Confirmação da conta';
                var content = 'Sua conta acaba de ser liberada. Parabéns!';
                emailSender.sendEmail(data.email, data.name, content, subject);
                response.json({
                    message: 'Conta liberada!'
                });
            }
        });
    });

    module.exports = router;
})();