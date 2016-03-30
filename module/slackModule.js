(function () {
    'use strict';

    var Bot = require('slackbots');

    module.exports.reaction = function(id, email, userName) {
        var settings = {
            token: 'xoxb-30113253329-Edaje0qNlgmSAAx2Owjze5A1',
            name: 'alfred'
        };
        var bot = new Bot(settings);

        bot.on('start', function() {
            var channel = "user-confirmation";
            var message = "O usuário " + userName + " <" + email + "> acabou de se cadastrar.\n" ;
            message += "Confirmar conta e liberer via: api/activate?hash=" + id;
            bot.postMessageToChannel(channel, message);
        });
    };
})();