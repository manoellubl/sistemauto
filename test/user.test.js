var app = require('../app');
var should = require('should');
var request = require('supertest')(app);

describe('Na requisição GET /user', function() {
   it('deveria retornar uma lista de users', function(done) {
       var user = {
           name: 'xpto-test',
           email: 'xpto@gmail.com',
           password: 'xpto'
       };
       
       request.post('/api/user').send(user).end(function(error, response) {
           done();
       });
   });
});