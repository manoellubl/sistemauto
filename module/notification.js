(function () {
    'use strict';

    var request = require('request');

    module.exports.sendPushNotification = function(token, message) {

        if (token !== undefined) {
            var data = {
                "tokens": [token],
                "profile": "push",
                "notification": {
                    "message": message || "Hello World!"
                }
            };

            var options = {
                method: 'POST',
                url: "https://api.ionic.io/push/notifications",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ZDdkNGMzOS0wYmYxLTRkZmUtOWUwNS04MGIzMjczOGYzZjQifQ.oZNOZAxzyGjt0lOL78ZXqcMRqNcHtCNjiTNuM7GYQww"
                }, 
                json: data
            };

            request(options);
        }
    };
})();