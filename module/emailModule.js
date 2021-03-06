(function () {
    'use strict';

    var nodemailer = require("nodemailer");

    module.exports.sendEmail = function(email, userName, content, subjectText) {
        var transporter = nodemailer.createTransport('smtps://sistemautosender%40gmail.com:sudoadmin@smtp.gmail.com');

        var mailOptions = {
            from: '"Sistemauto" <sistemauto.com>', // sender address
            to: userName + " <" + email + ">" , // list of receivers
            subject: subjectText, // Subject line
            text: content, // plaintext body
            html: '<b>' + content + '</b>' // html body
        };

        transporter.sendMail(mailOptions, function(error, response) {
            if (error) {
                console.log(error);
                //res.end("error");
            } else {
                console.log("Message sent: " + response.status);
                //res.end("sent");
            }
        });
    };
})();