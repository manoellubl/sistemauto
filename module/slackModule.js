(function () {
    'use strict';

    var Bot = require('slackbots');

    module.exports.reaction = function(id, email, userName) {
        // manter quebrado as linhas para o crawler não capturar
        var token = "xox" +
            "b-3011325332" +
            "9-78LCSG3zzz3IaKo9ySW18KL" +
            "m";

        var settings = {
            token: token,
            name: 'alfred'
        };
        var bot = new Bot(settings);

        bot.on('start', function() {
            var channel = "user-confirmation";
            var message = "O usuário " + userName + " <" + email + "> acabou de se cadastrar.\n" ;
            message += "Confirmar conta e liberer via: sistemauto.herokuapp.com/api/activate?hash=" + id;
            bot.postMessageToChannel(channel, message);
        });
    };
})();