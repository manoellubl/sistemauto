(function() {
    'use strict';
    
    var q = require('q');
    
    module.exports = {
        createUser: function(request) {
            var deferred = q.defer();
            
            var user = {
                name: 'xpto-test',
                email: 'xpto@gmail.com',
                password: 'xpto'
            };

            request.post('/api/user').send(user).end(function(error, response) {
                console.log('chamando');
                if (error !== null) {
                    console.log('rejeitando');
                    deferred.reject(error);
                } else {
                    console.log('resolved');
                    deferred.resolve(response.body);
                }
            });
            
            return deferred.promise;
        }
    };
}());