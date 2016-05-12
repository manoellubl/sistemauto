(function () {
    'use strict';

    var Student = rootRequire('model/user.model');
    var Clazz = rootRequire('model/clazz.model');

    var notificacao = rootRequire('module/notification');

    module.exports.start = function() {
        var cursor = Clazz.find({});

        cursor.exec(function(error, data) {
            var agora = new Date();

            var cursorStudent = Student.findById(data[index].student);
                cursorStudent.exec(function (error, student) {
                    if (student.pushToken) {
                        notificacao.sendPushNotification(student.pushToken, "Atenção você está próximo de ter uma aula " + data[index].type);
                    }
                });

            for (var index in data) {
                var inicio = new Date(data[index].start);

                if (agora.getHours() === inicio.getHours() 
                    && agora.getDay() === inicio.getDay() 
                    && agora.getMonth() === inicio.getMonth() 
                    && agora.getYear() === inicio.getYear()) {

                var cursorStudent = Student.findById(data[index].student);
                cursorStudent.exec(function (error, student) {
                    if (student.pushToken) {
                        notificacao.sendPushNotification(student.pushToken, "Atenção você está próximo de ter uma aula " + data[index].type);
                    }
                });
            }
        }
    });
    };
})();