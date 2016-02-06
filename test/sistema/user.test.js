var app = require('../../app');
var setup = require('../setup');
var request = require('supertest')(app);

describe('Na requisição GET /user', function() {
    
    var token = undefined;
    var user = undefined;
    
    before(function(done) {
       var promise = setup.createUser(request);
       promise.then(function(error, response) {
          user = response.body;
          console.log('usuario', user);
          console.log('>>>>>>>>>>>>>>>>>>.');
          done(); 
       });
    }); 
    
    it('deveria retornar uma lista de users', function(done) {
      done();
   });
});