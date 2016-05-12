(function () {
    'use strict';

    var User = rootRequire('model/user.model');
    var Clazz = rootRequire('model/clazz.model');

    var notificacao = rootRequire('module/notification');

    module.exports.start = function() {
        var cursor = Clazz.find({});

        cursor.exec(function(error, data) {
            var agora = new Date();

            for (var index in data) {
                var inicio = new Date(data[index].start);
                  var cursorUser = User.findById(data[index].user);
                cursorUser.exec(function (error, user) {
                    if (user.pushToken) {
                        notificacao.sendPushNotification(user.pushToken, "Atenção você está próximo de ter uma aula " + data[index].type);
                    }
                });
                

                if (agora.getHours() === inicio.getHours() 
                    && agora.getDay() === inicio.getDay() 
                    && agora.getMonth() === inicio.getMonth() 
                    && agora.getYear() === inicio.getYear()) {

                var cursorUser = User.findById(data[index].user);
                cursorUser.exec(function (error, user) {
                    if (user.pushToken) {
                        notificacao.sendPushNotification(user.pushToken, "Atenção você está próximo de ter uma aula " + data[index].type);
                    }
                });
            }
        }
    });
    };
})();